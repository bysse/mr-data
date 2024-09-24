<script setup lang="ts">
import { toHex } from '../transforms/util'

const props = defineProps({
  data: { type: Uint8ClampedArray, required: true }
})

const width = 8
const data = props.data
const lines: [string, string][] = []

for (let i = 0; i < data.length; i += width) {
  let line = []
  let addr = toHex(i, 4)

  for (let j = 0; j < width; j++) {
    line.push(toHex(data[i + j], 2))
  }
  lines.push([addr, line.join(' ')])
}
</script>

<template>
  <div class="output">
    <table>
      <tr v-for="(info, index) in lines" :key="index">
        <td class="addr">{{ info[0] }}</td>
        <td>{{ info[1] }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.output {
  font-family: monospace;
}

.output table {
  padding: 2px;
}

.addr {
  padding-right: 15px;
  font-size: 0.9em;
}
</style>
