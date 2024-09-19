<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  value: { type: String, required: true }
})

const model = ref<string>(props.value)
const textarea = useTemplateRef('text')

onMounted(() => {
  const tf = textarea.value
  if (tf != null) {
    tf.style.height = 'auto'
    tf.style.height = `${tf.scrollHeight}px`
  }
})
</script>

<template>
  <div class="text-view-container">
    <div>{{ props.title }}</div>
    <textarea ref="text" class="text-view" rows="1" v-model="model" />
  </div>
</template>

<style>
.text-view-container {
  border: 1px solid #ccc;
}

.text-view-container div {
  padding: 4px;
  font-weight: 600;
  background-color: #eee;
  border-bottom: 1px solid #ccc;
}

.text-view {
  width: 100%;
  height: 100%;
  min-height: 40px;
  overflow: hidden;
  resize: none;
  box-sizing: border-box;
  border: none;
}
</style>
