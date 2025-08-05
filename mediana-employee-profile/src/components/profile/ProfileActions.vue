<script setup lang="ts">
import {inject, computed} from 'vue'

interface Props {
  formValidation?: any
}

const props = defineProps<Props>()
const formData = inject('formData') as any

const canSave = computed(() => {
  return props.formValidation?.isFormValid.value && !formData?.isLoading.value
})
const handleSave = async () => {
  if (!canSave.value) return

  try {
    await formData?.saveData()
    alert('Профиль успешно сохранен! (см. console.log())')
  } catch (error) {
    console.error('Ошибка сохранения:', error)
  }
}
</script>

<template>
  <div class="mt-4">
    <div class="d-flex justify-content-center gap-3">
      <button
        class="btn btn-outline-secondary"
        @click="formData?.retry()"
        :disabled="formData?.isLoading.value"
      >
        <i class="bi bi-arrow-clockwise me-2"></i>
        Перезагрузить данные
      </button>

      <button
        class="btn btn-primary btn-lg"
        @click="handleSave"
        :disabled="!canSave"
        :class="{'btn-success': canSave}"
      >
        <span
          v-if="formData?.isLoading.value"
          class="spinner-border spinner-border-sm me-2"
        />
        <i v-else-if="canSave" class="bi bi-check-circle me-2"></i>
        <i v-else class="bi bi-exclamation-circle me-2"></i>

        {{ formData?.isLoading.value ? 'Сохранение...' : 'Сохранить профиль' }}
      </button>
    </div>
  </div>
</template>
