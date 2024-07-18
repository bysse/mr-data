<script setup>
import Step from '@/components/Step.vue'
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">

        <div class="mb-3">
          <label for="input-data" class="form-label">Input:</label>
          <textarea id="input-data" class="form-control"></textarea>
        </div>

        <Step transform="base64 encode" :error=false />

      </div>
    </div>
  </div>

</template>

<style scoped>
</style>
