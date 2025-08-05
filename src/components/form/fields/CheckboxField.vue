<script setup lang="ts">
import {computed} from 'vue'
import type {CheckboxField as CheckboxFieldType} from '@/types'
import BaseField from '../BaseField.vue'

interface Props {
  field: CheckboxFieldType
  modelValue?: string[]
}

interface Emits {
  'update:modelValue': [value: string[]]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const value = computed({
  get: () => props.modelValue ?? props.field.value,
  set: (newValue: string[]) => emit('update:modelValue', newValue),
})
</script>

<template>
  <BaseField :field="field" v-model="value">
    <template #default="{fieldId}">
      <div class="form-check-group">
        <div
          v-for="(label, checkboxValue) in field.items"
          :key="checkboxValue"
          class="form-check"
        >
          <input
            :id="`${fieldId}-${checkboxValue}`"
            v-model="value"
            :value="checkboxValue"
            type="checkbox"
            :required="field.required && value.length === 0"
            class="form-check-input"
          />
          <label :for="`${fieldId}-${checkboxValue}`" class="form-check-label">
            {{ label }}
          </label>
        </div>
      </div>
    </template>
  </BaseField>
</template>
