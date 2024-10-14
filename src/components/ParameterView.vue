<script setup lang="ts">
import { Parameter, ParameterType } from '../transform/parameter'

const props = defineProps({
  parameter: { type: Parameter, required: true },
  maxIndex: { type: Number, required: true }
})

const emit = defineEmits<{
  updated: [value: string]
}>()

function updateValue(event: Event) {
  const element = <HTMLTextAreaElement>event.target
  emit('updated', element.value)
}
</script>

<template>
  <div v-if="props.parameter.type === ParameterType.Index">
    <form class="form-floating">
      <input
        type="number"
        class="form-control"
        :value="props.parameter.value"
        @input="updateValue"
        min="0"
        :max="maxIndex"
      />
      <label>{{ props.parameter.name }}</label>
      <small>{{ props.parameter.description }}</small>
    </form>
  </div>
</template>

<style scoped></style>
