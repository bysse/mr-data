<script setup lang="ts">
import { Buffer } from '../transform/buffer'
import Section from './Section.vue'

const props = defineProps({
  buffer: { type: Buffer<any>, required: true }
})
</script>

<template>
  <div class="output-section-container">
    <div v-for="(section, index) in props.buffer.sections()" :key="index + section[1]">
      <Section :index="index" :title="section[1]" :value="section[0]" />
    </div>
  </div>
</template>

<style>
.output-section-container {
}
</style>
