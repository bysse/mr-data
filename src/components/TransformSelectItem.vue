<script setup>

import { ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    reuired: true
  },
  title: {
    type: String,
    required: true
  },
  selected: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['changed'])


const selectClass = props.selected === props.id ? 'selected' : ''

</script>

<template>
  <a class="dropdown-item" :class=selectClass href="#">{{ title }}</a>
</template>

<style scoped>
  .selected {
    font-weight: bolder;
  }
</style>
