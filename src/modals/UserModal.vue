<!-- ========================================
     UserModal Component - modals/UserModal.vue
     إضافة/تعديل مستخدم
     ======================================== -->
<template>
  <BaseModal
    :is-open="isOpen"
    :title="modalTitle"
    :description="modalDescription"
    size="lg"
    @close="handleClose"
  >
    <form @submit.prevent="handleSubmit(onSubmit)" class="space-y-5">
      <!-- Email -->
      <FormInput
        v-model="formData.email"
        type="email"
        label="البريد الإلكتروني"
        placeholder="admin@example.com"
        :error="getFieldError('email') as string"
        :disabled="mode === 'edit'"
        required
        @blur="handleBlur('email')"
      />

      <!-- Password (Create Mode Only) -->
      <FormInput
        v-if="mode === 'create'"
        v-model="formData.password"
        type="password"
        label="كلمة المرور"
        placeholder="••••••••"
        :error="getFieldError('password') as string"
        required
        @blur="handleBlur('password')"
      />

      <!-- Full Name -->
      <FormInput
        v-model="formData.fullName"
        type="text"
        label="الاسم الكامل"
        placeholder="أحمد محمد"
        :error="getFieldError('fullName') as string"
        required
        @blur="handleBlur('fullName')"
      />

      <!-- Role -->
      <FormSelect
        v-model="formData.roleId"
        :options="roleOptions"
        label="الدور"
        placeholder="اختر الدور"
        :error="getFieldError('roleId') as string"
        required
      />

      <!-- Active Status -->
      <FormCheckbox
        v-model="formData.isActive"
        label="نشط"
        description="السماح للمستخدم بتسجيل الدخول"
      />

      <!-- Actions -->
      <div class="flex items-center gap-3 pt-4 lg:justify-end">
        <button
          @click="handleClose"
          type="button"
          class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
        >
          إلغاء
        </button>
        <button
          type="submit"
          :disabled="isSubmitting || !isValid"
          class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          <span v-if="isSubmitting">جاري الحفظ...</span>
          <span v-else>{{ mode === 'create' ? 'إضافة' : 'حفظ التغييرات' }}</span>
        </button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useForm, validators } from '@/composables/useForm';
import { useUsersStore } from '@/stores/users.store';
import { useRolesStore } from '@/stores/roles.store';
import { useAppToast } from '@/composables/useToast';
import BaseModal from '@/components/BaseModal.vue';
import FormInput from '@/components/forms/FormElements/FormInput.vue';
import FormSelect from '@/components/forms/FormElements/FormSelect.vue';
import FormCheckbox from '@/components/forms/FormElements/FormCheckbox.vue';
import type { AdminUser } from '@/types/identity.types';

interface Props {
  isOpen: boolean;
  mode: 'create' | 'edit';
  user?: AdminUser | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  'close': [];
  'success': [];
}>();

const usersStore = useUsersStore();
const rolesStore = useRolesStore();
const toast = useAppToast();

// Form Setup
const initialFormData = computed(() => {
  if (props.mode === 'edit' && props.user) {
    return {
      email: props.user.email,
      password: '',
      fullName: props.user.fullName,
      roleId: props.user.roleId,
      isActive: props.user.isActive
    };
  }
  return {
    email: '',
    password: '',
    fullName: '',
    roleId: '',
    isActive: true
  };
});

const validationRules = computed(() => {
  const rules: Record<string, ReturnType<typeof validators.required>[]> = {
    email: [
      validators.required('البريد الإلكتروني مطلوب'),
      validators.email() as ReturnType<typeof validators.required>
    ],
    fullName: [
      validators.required('الاسم الكامل مطلوب'),
      validators.minLength(3, 'الاسم يجب أن يكون 3 أحرف على الأقل') as ReturnType<typeof validators.required>
    ],
    roleId: [
      validators.required('الدور مطلوب')
    ]
  };

  if (props.mode === 'create') {
    rules.password = [
      validators.required('كلمة المرور مطلوبة'),
      validators.password() as ReturnType<typeof validators.required>
    ];
  }

  return rules;
});

const {
  formData,
  isSubmitting,
  isValid,
  handleSubmit,
  handleBlur,
  getFieldError,
  reset,
  setData
} = useForm(initialFormData.value, validationRules.value);

// Role Options
const roleOptions = computed(() => {
  return rolesStore.roles.map(role => ({
    label: role.name,
    value: role.id
  }));
});

// Modal Title & Description
const modalTitle = computed(() => {
  return props.mode === 'create' ? 'إضافة مستخدم جديد' : 'تعديل المستخدم';
});

const modalDescription = computed(() => {
  return props.mode === 'create'
    ? 'أدخل بيانات المستخدم الجديد'
    : 'قم بتحديث بيانات المستخدم';
});

// Watch for user changes (edit mode)
watch(
  () => props.user,
  (newUser) => {
    if (newUser && props.mode === 'edit') {
      setData({
        email: newUser.email,
        password: '',
        fullName: newUser.fullName,
        roleId: newUser.roleId,
        isActive: newUser.isActive
      });
    }
  },
  { immediate: true }
);

// Submit Handler
const onSubmit = async (data: typeof formData) => {
  try {
    if (props.mode === 'create') {
      await usersStore.createUser({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        roleId: data.roleId,
        isActive: data.isActive
      });
      toast.userCreated();
    } else if (props.user) {
      await usersStore.updateUser(props.user.id, {
        fullName: data.fullName,
        roleId: data.roleId,
        isActive: data.isActive
      });
      toast.userUpdated();
    }

    emit('success');
    handleClose();
  } catch (error) {
    toast.userError();
    console.error('Error saving user:', error);
  }
};

const handleClose = () => {
  reset();
  emit('close');
};
</script>
