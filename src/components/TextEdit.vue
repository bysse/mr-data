<script setup lang="ts">
const model = defineModel({ required: true })

function autoResize(event: any) {
  const textarea = event.target
  textarea.style.height = 'auto'
  textarea.style.height = `${textarea.scrollHeight}px`
}
</script>

<template>
  <div class="text-edit-container">
    <textarea
      class="text-edit"
      rows="1"
      @input="autoResize"
      @change="autoResize"
      :v-model="model"
    />
  </div>
</template>

<style>
.text-edit-container {
  border: 1px solid #ccc;
}

.text-edit {
  width: 100%;
  height: 100%;
  min-height: 150px;
  overflow: hidden;
  resize: none;
  box-sizing: border-box;
  border: none;
}
</style>
