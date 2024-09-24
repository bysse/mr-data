<script setup lang="ts">
import { Buffer } from '../transform/buffer'
import Section from './Section.vue'

const props = defineProps({
  buffer: { type: Buffer<any>, required: true }
})
</script>

<template>
  <div>
    <div v-for="(section, index) in props.buffer.sections()" :key="index + section.annotation">
      <Section :index="index" :buffer="section" />
    </div>
  </div>
</template>
