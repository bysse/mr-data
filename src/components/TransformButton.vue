<script setup>

import { ref } from 'vue'
import TransformSelectItem from '@/components/TransformSelectItem.vue'
import transformManager from '@/transform/manager.ts'

const props = defineProps({
  selected: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['apply'])

const selected = ref(props.selected)

</script>

<template>
  <div class="nav mb-3">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button">{{ selected }}</a>
      <ul class="dropdown-menu">
        <li v-for="transform in transformManager.all()">
          <TransformSelectItem :id="transform.id" :title="transform.title" :selected="selected" />
        </li>
      </ul>
    </li>
  </div>
</template>

<style scoped>
</style>
