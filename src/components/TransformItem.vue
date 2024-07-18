<script setup>
import IconClose from '@/components/icons/IconClose.vue'

defineProps({
  title: {
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
  <div class="ms-2 me-auto">
    <div class="fw-bold">{{ title }}</div>
  </div>
  <span v-if="error" class="badge bg-danger rounded-pill">fail</span>
  <IconClose @click="emit('remove')"/>
</template>

<style scoped>
</style>
