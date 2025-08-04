<script setup lang="ts">
import {inject} from 'vue'

const formData = inject('formData') as any
</script>

<template>
  <div class="d-flex justify-content-center mt-4 gap-3">
    <button
      class="btn btn-outline-secondary"
      @click="formData?.retry()"
      :disabled="formData?.isLoading.value"
    >
      Перезагрузить данные
    </button>
    <button
      class="btn btn-primary btn-lg"
      @click="formData?.saveData()"
      :disabled="formData?.isLoading.value"
    >
      <span
        v-if="formData?.isLoading.value"
        class="spinner-border spinner-border-sm me-2"
      />
      Сохранить профиль
    </button>
  </div>
</template>
