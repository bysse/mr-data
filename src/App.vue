<script setup>
import { ref, watch } from 'vue'
import transformManager from '@/transform/manager.js'

const inputData = ref('{"key":"value"}');
const transformId = ref('');
const suggestions = ref([]);
const transformChain = ref([]);
const outputData = ref('');

function detectInputDataFormat(value) {
  console.log('inputData changed:', value);

  const encoder = new TextEncoder();
  const uint8Array = encoder.encode(value);
  const array = new Uint8ClampedArray(uint8Array);

  const scores = transformManager.detect(array);
  console.log('scores:', scores);

  transformId.value = '';

  if (scores.length > 0) {
    let suggestionList = [];
    for (let i = 0; i < scores.length; i++) {
      suggestionList.push(transformManager.get(scores[i]));
    }
    suggestions.value = suggestionList;
    console.log(suggestionList);
  }
}

function applyTransformChain() {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  console.log('applyTransformChain:', transformChain.value);
  let encodedData = encoder.encode(inputData.value);
  let data = new Uint8ClampedArray(encodedData);

  for (let i = 0; i < transformChain.value.length; i++) {
    data = transformChain.value[i].apply(data);
  }
  let output = decoder.decode(data);
  console.log('applyTransformChain:', output);
  outputData.value = output;
}

function applyTransform(transform) {
  console.log('applyTransform:', transform);
  transformChain.value.push(transform);

  suggestions.value = [];
  applyTransformChain();
}

watch(inputData, (value) => {
  applyTransformChain();
  detectInputDataFormat(value);
});

detectInputDataFormat(inputData.value);

</script>

<template>
  <main class="d-flex">
    <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" style="max-width: 300px;">
      <a href="/" class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
        <svg class="bi me-2" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
        <span class="fs-5 fw-semibold">Transforms</span>
      </a>

      <div class="list-group list-group-flush border-bottom scrollarea" v-for="transform in transformChain">
        <a href="#" class="list-group-item list-group-item-action active py-3 lh-tight">
          <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">{{ transform.title }}</strong>
            <small>Wed</small>
          </div>
          <div class="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
        </a>
      </div>
    </div>

    <div class="d-flex flex-column align-items-stretch flex-grow-0 bg-white">
      <textarea class="flex-row flex-fill form-control" id="input-data" cols="100" v-model="inputData"></textarea>
      <div class="flex-row">

        <span v-for="suggestion in suggestions">
          <a href="#" @click.prevent="applyTransform(suggestion)">
            <span class="badge bg-success">{{ suggestion.title }}</span>
          </a>
        </span>
      </div>
      <div class="flex-row">
        <div class="alert alert-danger" role="alert">
          errors
        </div>
      </div>

      <div class="flex-row">
        <textarea class="flex-row flex-fill form-control" id="output-data" cols="100" v-model="outputData"></textarea>
      </div>
    </div>
  </main>

</template>

<style scoped>

#input-data {
  font-family: monospace;
  font-size: 1rem;
  width: 100%;
}

</style>
