<script setup>
import Step from '@/components/Step.vue'
import { ref, watch } from 'vue'
import transformManager from '@/transform/manager.js'

const inputData = ref('{\n   "key": "value"\n}');

function detectInputDataFormat(value) {
  console.log('inputData changed:', value);

  const encoder = new TextEncoder();
  const uint8Array = encoder.encode(value);
  const array = new Uint8ClampedArray(uint8Array);

  const scores = transformManager.detect(array);
  console.log('scores:', scores);

  if (scores.length > 0) {
    const transform = transformManager.get(scores[0]);
    const data = transform.apply(array);
    console.log(data);
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

        <Step transform="base64 encode" :error=false />

      </div>
    </div>
  </div>

</template>

<style scoped>
</style>
