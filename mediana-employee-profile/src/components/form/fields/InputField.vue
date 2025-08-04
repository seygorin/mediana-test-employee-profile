<script setup lang="ts">
import {computed} from 'vue'
import type {InputField as InputFieldType} from '@/types'
import BaseField from '../BaseField.vue'

interface Props {
  field: InputFieldType
  modelValue?: string
}

interface Emits {
  'update:modelValue': [value: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const value = computed({
  get: () => props.modelValue ?? props.field.value,
  set: (newValue: string) => emit('update:modelValue', newValue),
})

const inputType = computed(() => {
  const label = props.field.label.toLowerCase()
  if (label.includes('email') || label.includes('почта')) return 'email'
  if (label.includes('телефон') || label.includes('phone')) return 'tel'
  return 'text'
})
</script>

<template>
  <BaseField :field="field" v-model="value">
    <template #default="{fieldId, isValid, errorMessage, isRequired}">
      <input
        :id="fieldId"
        v-model="value"
        :type="inputType"
        :placeholder="field.placeholder"
        :required="field.required"
        class="form-control"
        :class="{'is-invalid': !isValid}"
      />
    </template>
  </BaseField>
</template>
