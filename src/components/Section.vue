<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import { Buffer } from '../transform/buffer'
import { DataType } from '../transform/type'
import HexView from './HexView.vue'

const props = defineProps({
  index: { type: Number, required: true },
  buffer: { type: Buffer<any>, required: true }
})

const buffer = props.buffer
const title = buffer.annotation
const textarea = useTemplateRef('text')

const stringValue = ref('')
if (buffer.type === DataType.VALUE) {
  stringValue.value = buffer.toString()
}
if (buffer.type === DataType.JSON) {
  const obj = JSON.parse(buffer.toString())
  stringValue.value = JSON.stringify(obj, null, 3)
}

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
    <div class="header">{{ props.index }}: {{ title }}</div>
    <div v-if="buffer.type === DataType.BINARY">
      <HexView :data="buffer.data" />
    </div>
    <div v-else>
      <textarea ref="text" class="text-view" rows="1" v-model="stringValue" />
    </div>
  </div>
</template>

<style scoped>
.text-view-container {
  border: 1px solid #ccc;
}

.header {
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
