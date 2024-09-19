<script setup lang="ts">
import { ref, watch } from 'vue'
import { Transform } from './transform/transform'
import transformRegistry from './transform/transform_registry'
import TextEdit from './components/TextEdit.vue'
import { TransformManager } from './transform/transform_manager'
import OutputSections from './components/OutputSections.vue'

const suggestions = ref<Transform[]>([])

const data =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
//const data = 'aGVsbG8='
const manager = new TransformManager(data)

const input = manager.getInput()
const output = manager.getOutput()
const transforms = ref<Transform[]>([])

// load initial transform
transforms.value = manager.transformChain.all()

function apply() {
  const result = manager.applyTransforms()

  if (result.error) {
    console.log('Error: ' + result.error)
    return
  }

  // update the suggestions
  let suggestionList = []
  for (let i = 0; i < result.suggestions.length; i++) {
    const transform = transformRegistry.get(result.suggestions[i][0])
    if (transform === undefined) continue
    suggestionList.push(transform)
  }
  suggestions.value = suggestionList
  console.log(suggestionList)
}

function appendTransform(transform: Transform) {
  if (manager.appendTransform(transform)) {
    transforms.value = manager.transformChain.all()
    apply()
  }
}

function removeTransform(index: number) {
  console.log('Removing transform at index: ' + index)
  if (manager.removeTransform(index)) {
    transforms.value = manager.transformChain.all()
    apply()
  }
}

watch(input, () => apply())

apply()
</script>

<template>
  <main>
    <div class="container">
      <div class="section">
        <h2>Encoded</h2>

        <TextEdit v-model="input" @on-change="apply" />
      </div>

      <div class="section">
        <h2>Transforms</h2>
        <ul>
          <li v-for="(transform, index) in transforms" :key="index" @click="removeTransform(index)">
            {{ transform.title }}
          </li>
        </ul>
        <div v-if="suggestions.length > 0">
          <h3>Suggestions</h3>
          <ul>
            <li
              v-for="(suggestion, index) in suggestions"
              :key="index"
              @click="appendTransform(suggestion)"
            >
              {{ suggestion.title }}
            </li>
          </ul>
        </div>
      </div>

      <div class="section">
        <h2>Output</h2>

        <OutputSections :buffer="output" />
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
