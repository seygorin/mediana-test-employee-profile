<script setup lang="ts">
import {computed} from 'vue'
import FormField from './FormField.vue'
import type {FormBlock as FormBlockType, Field} from '@/types'

interface Props {
  block: FormBlockType | Field[]
  modelValue?: Record<string, any>
}

interface Emits {
  'update:modelValue': [value: Record<string, any>]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const fieldsArray = computed(() => {
  if (Array.isArray(props.block)) {
    return []
  }
  return Object.entries(props.block)
})

const updateFieldValue = (fieldKey: string, value: any) => {
  const newValue = {...props.modelValue}
  newValue[fieldKey] = value
  emit('update:modelValue', newValue)
}

const getFieldValue = (fieldKey: string, field: Field) => {
  const value = props.modelValue?.[fieldKey] ?? field.value
  return value
}
</script>

<template>
  <div class="form-block">
    <div class="row">
      <div
        v-for="[fieldKey, field] in fieldsArray"
        :key="fieldKey"
        class="col-12 col-md-6"
      >
        <FormField
          :field="field"
          :model-value="getFieldValue(fieldKey, field)"
          @update:model-value="updateFieldValue(fieldKey, $event)"
        />
      </div>
    </div>
  </div>
</template>
