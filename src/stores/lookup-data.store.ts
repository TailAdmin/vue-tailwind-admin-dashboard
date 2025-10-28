// stores/lookup-data.store.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { offerTypesService } from '@/services/offer-types.service';
import { unitTypesService } from '@/services/unit-types.service';
import { timeUnitsService } from '@/services/time-units.service';
import { offerFeaturesService } from '@/services/offer-features.service';
import { floorsService } from '@/services/floors.service';
import { propertyTypesService } from '@/services/property-types.service';
import type {
  OfferType,
  UnitType,
  TimeUnit,
  OfferFeature,
  Floor,
  PropertyType
} from '@/types/offers.types';

export const useLookupDataStore = defineStore('lookupData', () => {
  // ========================================
  // State
  // ========================================
  
  // Offer Types
  const offerTypes = ref<OfferType[]>([]);
  const isLoadingOfferTypes = ref(false);
  const offerTypesError = ref<string | null>(null);

  // Unit Types
  const unitTypes = ref<UnitType[]>([]);
  const isLoadingUnitTypes = ref(false);
  const unitTypesError = ref<string | null>(null);

  // Time Units
  const timeUnits = ref<TimeUnit[]>([]);
  const isLoadingTimeUnits = ref(false);
  const timeUnitsError = ref<string | null>(null);

  // Offer Features
  const offerFeatures = ref<OfferFeature[]>([]);
  const isLoadingOfferFeatures = ref(false);
  const offerFeaturesError = ref<string | null>(null);

  // Floors
  const floors = ref<Floor[]>([]);
  const isLoadingFloors = ref(false);
  const floorsError = ref<string | null>(null);

  // Property Types
  const propertyTypes = ref<PropertyType[]>([]);
  const isLoadingPropertyTypes = ref(false);
  const propertyTypesError = ref<string | null>(null);

  // ========================================
  // Getters
  // ========================================
  const isLoading = computed(() => 
    isLoadingOfferTypes.value ||
    isLoadingUnitTypes.value ||
    isLoadingTimeUnits.value ||
    isLoadingOfferFeatures.value ||
    isLoadingFloors.value ||
    isLoadingPropertyTypes.value
  );

  const hasError = computed(() => 
    !!offerTypesError.value ||
    !!unitTypesError.value ||
    !!timeUnitsError.value ||
    !!offerFeaturesError.value ||
    !!floorsError.value ||
    !!propertyTypesError.value
  );

  // ========================================
  // Offer Types Actions
  // ========================================
  async function loadOfferTypes(): Promise<void> {
    isLoadingOfferTypes.value = true;
    offerTypesError.value = null;

    try {
      offerTypes.value = await offerTypesService.getAll();
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      offerTypesError.value = apiError.response?.data?.message || 'فشل تحميل أنواع العروض';
      throw err;
    } finally {
      isLoadingOfferTypes.value = false;
    }
  }

  async function createOfferType(name: string): Promise<void> {
    isLoadingOfferTypes.value = true;
    offerTypesError.value = null;

    try {
      const newOfferType = await offerTypesService.create({ name });
      offerTypes.value.push(newOfferType);
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      offerTypesError.value = apiError.response?.data?.message || 'فشل إنشاء نوع العرض';
      throw err;
    } finally {
      isLoadingOfferTypes.value = false;
    }
  }

  async function updateOfferType(id: string, name: string): Promise<void> {
    isLoadingOfferTypes.value = true;
    offerTypesError.value = null;

    try {
      await offerTypesService.update(id, { name });
      const index = offerTypes.value.findIndex(ot => ot.id === id);
      if (index !== -1) {
        offerTypes.value[index].name = name;
      }
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      offerTypesError.value = apiError.response?.data?.message || 'فشل تحديث نوع العرض';
      throw err;
    } finally {
      isLoadingOfferTypes.value = false;
    }
  }

  async function deleteOfferType(id: string): Promise<void> {
    isLoadingOfferTypes.value = true;
    offerTypesError.value = null;

    try {
      await offerTypesService.delete(id);
      offerTypes.value = offerTypes.value.filter(ot => ot.id !== id);
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      offerTypesError.value = apiError.response?.data?.message || 'فشل حذف نوع العرض';
      throw err;
    } finally {
      isLoadingOfferTypes.value = false;
    }
  }

  // ========================================
  // Unit Types Actions
  // ========================================
  async function loadUnitTypes(): Promise<void> {
    isLoadingUnitTypes.value = true;
    unitTypesError.value = null;

    try {
      unitTypes.value = await unitTypesService.getAll();
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      unitTypesError.value = apiError.response?.data?.message || 'فشل تحميل أنواع الوحدات';
      throw err;
    } finally {
      isLoadingUnitTypes.value = false;
    }
  }

  async function createUnitType(name: string): Promise<void> {
    isLoadingUnitTypes.value = true;
    unitTypesError.value = null;

    try {
      const newUnitType = await unitTypesService.create({ name });
      unitTypes.value.push(newUnitType);
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      unitTypesError.value = apiError.response?.data?.message || 'فشل إنشاء نوع الوحدة';
      throw err;
    } finally {
      isLoadingUnitTypes.value = false;
    }
  }

  async function updateUnitType(id: string, name: string): Promise<void> {
    isLoadingUnitTypes.value = true;
    unitTypesError.value = null;

    try {
      await unitTypesService.update(id, { name });
      const index = unitTypes.value.findIndex(ut => ut.id === id);
      if (index !== -1) {
        unitTypes.value[index].name = name;
      }
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      unitTypesError.value = apiError.response?.data?.message || 'فشل تحديث نوع الوحدة';
      throw err;
    } finally {
      isLoadingUnitTypes.value = false;
    }
  }

  async function deleteUnitType(id: string): Promise<void> {
    isLoadingUnitTypes.value = true;
    unitTypesError.value = null;

    try {
      await unitTypesService.delete(id);
      unitTypes.value = unitTypes.value.filter(ut => ut.id !== id);
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      unitTypesError.value = apiError.response?.data?.message || 'فشل حذف نوع الوحدة';
      throw err;
    } finally {
      isLoadingUnitTypes.value = false;
    }
  }

  // ========================================
  // Time Units Actions
  // ========================================
  async function loadTimeUnits(): Promise<void> {
    isLoadingTimeUnits.value = true;
    timeUnitsError.value = null;

    try {
      timeUnits.value = await timeUnitsService.getAll();
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      timeUnitsError.value = apiError.response?.data?.message || 'فشل تحميل الوحدات الزمنية';
      throw err;
    } finally {
      isLoadingTimeUnits.value = false;
    }
  }

  async function createTimeUnit(name: string): Promise<void> {
    isLoadingTimeUnits.value = true;
    timeUnitsError.value = null;

    try {
      const newTimeUnit = await timeUnitsService.create({ name });
      timeUnits.value.push(newTimeUnit);
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      timeUnitsError.value = apiError.response?.data?.message || 'فشل إنشاء الوحدة الزمنية';
      throw err;
    } finally {
      isLoadingTimeUnits.value = false;
    }
  }

  async function updateTimeUnit(id: string, name: string): Promise<void> {
    isLoadingTimeUnits.value = true;
    timeUnitsError.value = null;

    try {
      await timeUnitsService.update(id, { name });
      const index = timeUnits.value.findIndex(tu => tu.id === id);
      if (index !== -1) {
        timeUnits.value[index].name = name;
      }
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      timeUnitsError.value = apiError.response?.data?.message || 'فشل تحديث الوحدة الزمنية';
      throw err;
    } finally {
      isLoadingTimeUnits.value = false;
    }
  }

  async function deleteTimeUnit(id: string): Promise<void> {
    isLoadingTimeUnits.value = true;
    timeUnitsError.value = null;

    try {
      await timeUnitsService.delete(id);
      timeUnits.value = timeUnits.value.filter(tu => tu.id !== id);
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      timeUnitsError.value = apiError.response?.data?.message || 'فشل حذف الوحدة الزمنية';
      throw err;
    } finally {
      isLoadingTimeUnits.value = false;
    }
  }

  // ========================================
  // Offer Features Actions
  // ========================================
  async function loadOfferFeatures(): Promise<void> {
    isLoadingOfferFeatures.value = true;
    offerFeaturesError.value = null;

    try {
      offerFeatures.value = await offerFeaturesService.getAll();
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      offerFeaturesError.value = apiError.response?.data?.message || 'فشل تحميل مميزات العروض';
      throw err;
    } finally {
      isLoadingOfferFeatures.value = false;
    }
  }

  async function createOfferFeature(name: string): Promise<void> {
    isLoadingOfferFeatures.value = true;
    offerFeaturesError.value = null;

    try {
      const newOfferFeature = await offerFeaturesService.create({ name });
      offerFeatures.value.push(newOfferFeature);
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      offerFeaturesError.value = apiError.response?.data?.message || 'فشل إنشاء ميزة العرض';
      throw err;
    } finally {
      isLoadingOfferFeatures.value = false;
    }
  }

  async function updateOfferFeature(id: string, name: string): Promise<void> {
    isLoadingOfferFeatures.value = true;
    offerFeaturesError.value = null;

    try {
      await offerFeaturesService.update(id, { name });
      const index = offerFeatures.value.findIndex(of => of.id === id);
      if (index !== -1) {
        offerFeatures.value[index].name = name;
      }
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      offerFeaturesError.value = apiError.response?.data?.message || 'فشل تحديث ميزة العرض';
      throw err;
    } finally {
      isLoadingOfferFeatures.value = false;
    }
  }

  async function deleteOfferFeature(id: string): Promise<void> {
    isLoadingOfferFeatures.value = true;
    offerFeaturesError.value = null;

    try {
      await offerFeaturesService.delete(id);
      offerFeatures.value = offerFeatures.value.filter(of => of.id !== id);
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      offerFeaturesError.value = apiError.response?.data?.message || 'فشل حذف ميزة العرض';
      throw err;
    } finally {
      isLoadingOfferFeatures.value = false;
    }
  }

  // ========================================
  // Floors Actions
  // ========================================
  async function loadFloors(): Promise<void> {
    isLoadingFloors.value = true;
    floorsError.value = null;

    try {
      floors.value = await floorsService.getAll();
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      floorsError.value = apiError.response?.data?.message || 'فشل تحميل الأدوار';
      throw err;
    } finally {
      isLoadingFloors.value = false;
    }
  }

  async function createFloor(name: string): Promise<void> {
    isLoadingFloors.value = true;
    floorsError.value = null;

    try {
      const newFloor = await floorsService.create({ name });
      floors.value.push(newFloor);
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      floorsError.value = apiError.response?.data?.message || 'فشل إنشاء الدور';
      throw err;
    } finally {
      isLoadingFloors.value = false;
    }
  }

  async function updateFloor(id: string, name: string): Promise<void> {
    isLoadingFloors.value = true;
    floorsError.value = null;

    try {
      await floorsService.update(id, { name });
      const index = floors.value.findIndex(f => f.id === id);
      if (index !== -1) {
        floors.value[index].name = name;
      }
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      floorsError.value = apiError.response?.data?.message || 'فشل تحديث الدور';
      throw err;
    } finally {
      isLoadingFloors.value = false;
    }
  }

  async function deleteFloor(id: string): Promise<void> {
    isLoadingFloors.value = true;
    floorsError.value = null;

    try {
      await floorsService.delete(id);
      floors.value = floors.value.filter(f => f.id !== id);
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      floorsError.value = apiError.response?.data?.message || 'فشل حذف الدور';
      throw err;
    } finally {
      isLoadingFloors.value = false;
    }
  }

  // ========================================
  // Property Types Actions
  // ========================================
  async function loadPropertyTypes(): Promise<void> {
    isLoadingPropertyTypes.value = true;
    propertyTypesError.value = null;

    try {
      propertyTypes.value = await propertyTypesService.getAll();
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      propertyTypesError.value = apiError.response?.data?.message || 'فشل تحميل أنواع العقارات';
      throw err;
    } finally {
      isLoadingPropertyTypes.value = false;
    }
  }

  async function createPropertyType(name: string): Promise<void> {
    isLoadingPropertyTypes.value = true;
    propertyTypesError.value = null;

    try {
      const newPropertyType = await propertyTypesService.create({ name });
      propertyTypes.value.push(newPropertyType);
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      propertyTypesError.value = apiError.response?.data?.message || 'فشل إنشاء نوع العقار';
      throw err;
    } finally {
      isLoadingPropertyTypes.value = false;
    }
  }

  async function updatePropertyType(id: string, name: string): Promise<void> {
    isLoadingPropertyTypes.value = true;
    propertyTypesError.value = null;

    try {
      await propertyTypesService.update(id, { name });
      const index = propertyTypes.value.findIndex(pt => pt.id === id);
      if (index !== -1) {
        propertyTypes.value[index].name = name;
      }
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      propertyTypesError.value = apiError.response?.data?.message || 'فشل تحديث نوع العقار';
      throw err;
    } finally {
      isLoadingPropertyTypes.value = false;
    }
  }

  async function deletePropertyType(id: string): Promise<void> {
    isLoadingPropertyTypes.value = true;
    propertyTypesError.value = null;

    try {
      await propertyTypesService.delete(id);
      propertyTypes.value = propertyTypes.value.filter(pt => pt.id !== id);
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      propertyTypesError.value = apiError.response?.data?.message || 'فشل حذف نوع العقار';
      throw err;
    } finally {
      isLoadingPropertyTypes.value = false;
    }
  }

  // ========================================
  // Load All
  // ========================================
  async function loadAll(): Promise<void> {
    await Promise.all([
      loadOfferTypes(),
      loadUnitTypes(),
      loadTimeUnits(),
      loadOfferFeatures(),
      loadFloors(),
      loadPropertyTypes()
    ]);
  }

  // ========================================
  // Clear Errors
  // ========================================
  function clearErrors(): void {
    offerTypesError.value = null;
    unitTypesError.value = null;
    timeUnitsError.value = null;
    offerFeaturesError.value = null;
    floorsError.value = null;
    propertyTypesError.value = null;
  }

  // ========================================
  // Reset
  // ========================================
  function reset(): void {
    offerTypes.value = [];
    unitTypes.value = [];
    timeUnits.value = [];
    offerFeatures.value = [];
    floors.value = [];
    propertyTypes.value = [];
    clearErrors();
  }

  return {
    // State
    offerTypes,
    isLoadingOfferTypes,
    offerTypesError,
    unitTypes,
    isLoadingUnitTypes,
    unitTypesError,
    timeUnits,
    isLoadingTimeUnits,
    timeUnitsError,
    offerFeatures,
    isLoadingOfferFeatures,
    offerFeaturesError,
    floors,
    isLoadingFloors,
    floorsError,
    propertyTypes,
    isLoadingPropertyTypes,
    propertyTypesError,

    // Getters
    isLoading,
    hasError,

    // Actions
    loadOfferTypes,
    createOfferType,
    updateOfferType,
    deleteOfferType,
    loadUnitTypes,
    createUnitType,
    updateUnitType,
    deleteUnitType,
    loadTimeUnits,
    createTimeUnit,
    updateTimeUnit,
    deleteTimeUnit,
    loadOfferFeatures,
    createOfferFeature,
    updateOfferFeature,
    deleteOfferFeature,
    loadFloors,
    createFloor,
    updateFloor,
    deleteFloor,
    loadPropertyTypes,
    createPropertyType,
    updatePropertyType,
    deletePropertyType,
    loadAll,
    clearErrors,
    reset
  };
});