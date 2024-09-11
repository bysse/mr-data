<script setup lang="ts">
import { ref, watch } from 'vue'
import { Transform } from './transform/transform'
import transformRegistry from './transform/transform_registry'
import { TransformChain } from './transform/transform_chain'
import TextEdit from './components/TextEdit.vue'
import QueryString from './query'
import { TransformManager } from './transform/transform_manager'

const transforms = ref([])
const suggestions = ref<Transform[]>([])

const queryString = new QueryString()
const manager = new TransformManager('aGVsbG8=')

function applyTransformChain() {
  const result = manager.applyTransforms()

  if (result.error) {
    console.log('Error: ' + result.error)
    return
  }

  // update the suggestions
  let suggestionList = []
  for (let i = 0; i < result.suggestions.length; i++) {
    const transform = transformRegistry.get(result.suggestions[i][0])
    suggestionList.push(transform)
  }
  suggestions.value = suggestionList
  console.log(suggestionList)
}

function updateQueryString() {
  if (transformChain.isEmpty()) {
    queryString.remove('chain')
  } else {
    queryString.set(
      'chain',
      transformChain
        .all()
        .map((transform) => transform.id)
        .join('|')
    )
  }
  queryString.apply()
}

function appendTransform(transform) {
  transformChain.append(transform)
  suggestions.value = []
  transforms.value = transformChain.transforms

  updateQueryString()
  applyTransformChain()
}

function removeTransform(index) {
  console.log('Removing transform at index: ' + index)
  transformChain.removeByIndex(index)
  transforms.value = []
  transforms.value = transformChain.transforms

  updateQueryString()
  applyTransformChain()
}

function inputDataChanged() {
  console.log('CHANGED')
  applyTransformChain()
}

// read the query string
const chain = queryString.get('chain')
if (chain) {
  const transformIds = chain.split('|')
  for (let i = 0; i < transformIds.length; i++) {
    const transform = transformRegistry.get(transformIds[i])
    if (transform) {
      transformChain.append(transform)
    }
  }
  transforms.value = transformChain.all()
}

applyTransformChain()
</script>

<template>
  <main>
    <div class="container">
      <div class="section">
        <h2>Encoded</h2>

        <TextEdit v-model="inputData" @on-change="inputDataChanged" />
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

        <TextEdit v-model="outputData" :tab-size="2" />
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
  min-width: 250px;
}
</style>
