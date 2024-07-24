<script setup>
import { ref, watch } from 'vue'
import transformManager from '@/transform/manager.js'
import TransformSelect from '@/components/TransformSelect.vue'

const inputData = ref('{"key":"value"}');
const transformId = ref('');

function detectInputDataFormat(value) {
  console.log('inputData changed:', value);

  const encoder = new TextEncoder();
  const uint8Array = encoder.encode(value);
  const array = new Uint8ClampedArray(uint8Array);

  const scores = transformManager.detect(array);
  console.log('scores:', scores);

  if (scores.length > 0) {
    transformId.value = scores[0].id;
    //const transform = transformManager.get(scores[0]);
    //const data = transform.apply(array);
    //console.log(data);
  } else {
    transformId.value = '';
  }

}

watch(inputData, (value) => {
  detectInputDataFormat(value);
});

detectInputDataFormat(inputData.value);

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">

        <div class="mb-3">
          <label for="input-data" class="form-label">Input:</label>
          <textarea id="input-data" class="form-control" v-model="inputData"></textarea>
        </div>

        <div class="hstack">
          <TransformSelect :selected="transformId" />
          <button type="button" class="btn btn-primary">Apply</button>
        </div>

      </div>
    </div>
  </div>

</template>

<style scoped>

#input-data {
  font-family: monospace;
  font-size: 1rem;
  height: 200px;
}

</style>
