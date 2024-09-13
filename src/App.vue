<script setup lang="ts">
import { ref } from 'vue'
import { Transform } from './transform/transform'
import transformRegistry from './transform/transform_registry'
import TextEdit from './components/TextEdit.vue'
import { TransformManager } from './transform/transform_manager'

const transforms = ref([])
const suggestions = ref<Transform[]>([])

const manager = new TransformManager('aGVsbG8=')

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

function appendTransform(transformId: string) {
  if (manager.appendTransform(transformId)) {
    apply()
  }
}

function removeTransform(index: number) {
  console.log('Removing transform at index: ' + index)
  if (manager.removeTransform(index)) {
    apply()
  }
}

apply()
</script>

<template>
  <main>
    <div class="container">
      <div class="section">
        <h2>Encoded</h2>

        <TextEdit v-model="manager.input" @on-change="apply" />
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
            <li v-for="suggestion in suggestions" @click="appendTransform(suggestion)">
              {{ suggestion.title }}
            </li>
          </ul>
        </div>
      </div>

      <div class="section">
        <h2>Decoded</h2>

        <TextEdit v-model="manager.output" :tab-size="2" />
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
