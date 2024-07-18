<script setup>
import TransformSelect from '@/components/TransformSelect.vue'

defineProps({
  transform: {
    type: String,
    required: true
  },
  error: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['remove'])

</script>

<template>
  <div class="mb-3">
    <TransformSelect :selected="transform" />
    <textarea id="input-data" class="form-control"></textarea>
  </div>
</template>

<style scoped>
</style>
