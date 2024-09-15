import { computed, type Ref } from 'vue'

export function proxy<T>(model: Ref<T, T>): Ref<T, T> {
  return computed({
    get() {
      return model.value
    },
    set(newValue: T) {
      model.value = newValue
    }
  })
}
