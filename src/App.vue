<script setup>
import { ref, watch } from 'vue'
import transformManager from '@/transform/manager.js'
import { TransformChain } from '@/transform/transform_chain.js'
import { Codemirror } from 'vue-codemirror'

const inputData = ref('{"key":"value"}');
const outputData = ref('');
const outputBuffer = ref(null);

const suggestions = ref([]);
const transformChain = new TransformChain();
const transformChainError = ref('');

const decoder = new TextDecoder();

function applyTransformChain() {
  const result = transformChain.apply(inputData.value);

  if (result.error) {
    transformChainError.value = result.error;
    outputData.value = '';
    outputBuffer.value = null;
    return;
  }

  outputData.value = decoder.decode(result.buffer.data);
  transformChainError.value = '';

  // update the suggestions
  let suggestionList = [];
  for (let i = 0; i < result.suggestions.length; i++) {
    suggestionList.push(transformManager.get(result.suggestions[i]));
  }
  suggestions.value = suggestionList;
  console.log(suggestionList);
}

function appendTransform(transform) {
  suggestions.value = [];
  transformChain.append(transform);
  applyTransformChain();
}

const code = ref('{"key":"value"}');


</script>

<template>
  <main>
    <div class="container">
      <div class="section">
        <h2>Encoded</h2>

        <codemirror
          v-model="code"
          placeholder="Encoded data goes here..."
          options
          :style="{ width: '600px',height: '300px' }"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="2"
          />
      </div>

      <div class="section">
        <h2>Transform</h2>
      </div>

      <div class="section">
        <h2>Decoded</h2>

        <codemirror
          v-model="code"
          options
          :style="{ width: '600px', height: '300px' }"
          :autofocus="false"
          :indent-with-tab="true"
          :tab-size="2"
        />
      </div>
    </div>

  </main>

</template>

<style scoped>

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.section {
  margin: 0.5em;
  padding: 0.5em;
  border: 1px solid #ccc;
}

</style>
