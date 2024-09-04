<script setup>

import { ref, watch } from 'vue'
import TransformSelectItem from '@/components/TransformSelectItem.vue'
import transformManager from '@/transform/manager.ts'

const props = defineProps({
  selected: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['changed'])

const selected = ref(props.selected)
const label = ref('Select a transform')

function setLabel(transformId) {
  const transform = transformManager.get(value)
  if (transform) {
    label.value = transform.title
  } else {
    label.value = 'Select a transform'
  }
}

function selectTransform(id) {
  return () => {
    selected.value = id;
    setLabel(id);
    emit('changed', id);
  }
}

watch(selected, (transformId) => {
  setLabel(transformId);
});

</script>

<template>
  <div class="nav mb-3">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button">{{ label }}</a>
      <ul class="dropdown-menu">
        <li v-for="transform in transformManager.all()">
          <TransformSelectItem
            :id="transform.id"
            :title="transform.title"
            :selected="transform.id === selected"
            @on-select="selectTransform(transform.id)"
          />
        </li>
      </ul>
    </li>
  </div>
</template>

<style scoped>
</style>
