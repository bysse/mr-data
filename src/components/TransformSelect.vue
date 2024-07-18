<script setup>

import { ref } from 'vue'
import TransformSelectItem from '@/components/TransformSelectItem.vue'

const props = defineProps({
  selected: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['changed'])

const selected = ref(props.selected)

</script>

<template>
  <div class="nav mb-3">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button">{{ selected }}</a>
      <ul class="dropdown-menu">
        <TransformSelectItem id="json.format" title="Hej" selected="json.format" />
        <li><a class="dropdown-item" href="#">JSON format</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Separated link</a></li>
      </ul>
    </li>
  </div>
</template>

<style scoped>
</style>
