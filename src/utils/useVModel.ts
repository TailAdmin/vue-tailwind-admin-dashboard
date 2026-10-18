import { computed, ref, watch } from 'vue'
import type { Ref } from 'vue'

/** Minimal v-model helper (works whether or not the parent passes the prop). */
export function useVModel<P extends Record<string, any>, K extends keyof P & string>(
  props: P,
  key: K,
  emit: (event: any, value: any) => void,
  options: { passive?: boolean; defaultValue?: P[K] } = {},
): Ref<P[K]> {
  const local = ref(props[key] ?? options.defaultValue) as Ref<P[K]>
  watch(
    () => props[key],
    (value) => {
      local.value = value
    },
  )
  return computed({
    get: () => (props[key] !== undefined ? props[key] : local.value),
    set: (value: P[K]) => {
      local.value = value
      emit(`update:${key}`, value)
    },
  })
}
