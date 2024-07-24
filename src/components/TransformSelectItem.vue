<script setup>

import { ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
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

const emit = defineEmits(['onSelect'])
const selectClass = props.selected ? 'selected' : ''

function emitEvent() {
  if (!props.selected) {
    emit('onSelect', props.id);
  }
}

</script>

<template>
  <a class="dropdown-item" :class=selectClass href="#" @click.prevent="emitEvent">{{ title }}</a>
</template>

<style scoped>
  .selected {
    font-weight: bolder;
  }
</style>
