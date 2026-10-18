<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { ComboboxAnchor, ComboboxInput, useForwardPropsEmits } from 'reka-ui'
import type { ComboboxInputEmits, ComboboxInputProps } from 'reka-ui'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { cn } from '@/utils/cn'
import ComboboxClear from './ComboboxClear.vue'
import ComboboxTrigger from './ComboboxTrigger.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<
    ComboboxInputProps & {
      class?: HTMLAttributes['class']
      showTrigger?: boolean
      showClear?: boolean
    }
  >(),
  {
    showTrigger: true,
    showClear: false,
  },
)
const emits = defineEmits<ComboboxInputEmits>()

const delegated = computed(() => {
  const { class: _class, showTrigger: _showTrigger, showClear: _showClear, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <ComboboxAnchor as-child>
    <InputGroup :class="cn('w-full', props.class)">
      <ComboboxInput v-bind="forwarded" as-child>
        <InputGroupInput v-bind="$attrs" :disabled="props.disabled" />
      </ComboboxInput>
      <InputGroupAddon align="inline-end">
        <ComboboxTrigger
          v-if="showTrigger"
          data-slot="input-group-button"
          class="group/combobox-trigger group-has-data-[slot=combobox-clear]/input-group:hidden"
        />
        <ComboboxClear v-if="showClear" />
      </InputGroupAddon>
      <slot />
    </InputGroup>
  </ComboboxAnchor>
</template>
