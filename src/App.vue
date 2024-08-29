<script setup>
import { ref, watch } from 'vue'
import transformManager from '@/transform/manager.js'
import { TransformChain } from '@/transform/transform_chain.js'
import { Codemirror } from 'vue-codemirror'

const inputData = ref('{"key":"value"}');
const outputData = ref('');
const outputBuffer = ref(null);

const transforms = ref([]);
const suggestions = ref([]);

const transformChain = new TransformChain();
const transformChainError = ref('');

const decoder = new TextDecoder();

function applyTransformChain() {
  console.log(inputData.value);
  const result = transformChain.apply(inputData.value);
  console.log(result);

  if (result.error) {
    console.log("Error: " + result.error);
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
  transformChain.append(transform);
  suggestions.value = [];
  transforms.value = transformChain.transforms;
  applyTransformChain();
}

function removeTransform(index) {
  console.log("Removing transform at index: " + index);
  transformChain.removeByIndex(index);
  transforms.value = [];
  transforms.value = transformChain.transforms;
  console.log(transformChain.transforms);
}

function inputDataChanged() {
  applyTransformChain();
}

applyTransformChain();

</script>

<template>
  <main>
    <div class="container">
      <div class="section">
        <h2>Encoded</h2>

        <codemirror
          v-model="inputData"
          placeholder="Encoded data goes here..."
          options
          :style="{ width: '600px',height: '300px' }"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="2"
          @on-change="inputDataChanged"
          />
      </div>

      <div class="section">
        <h2>Transforms</h2>
        <ul>
          <li v-for="(transform, index) in transforms" @click="removeTransform(index)">
            {{ transform.title }}
          </li>
        </ul>
        <div v-if="suggestions.length > 0">
          <h3>Suggestions</h3>
          <ul>
            <li v-for="suggestion in suggestions" @click="appendTransform(suggestion)">
              {{ suggestion.title }}
            </li>
          </ul>
        </div>
      </div>

      <div class="section">
        <h2>Decoded</h2>

        <codemirror
          v-model="outputData"
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
