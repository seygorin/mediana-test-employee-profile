<script setup lang="ts">
import {computed} from 'vue'
import type {SelectField as SelectFieldType} from '@/types'
import BaseField from '../BaseField.vue'

interface Props {
  field: SelectFieldType
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
</script>

<template>
  <BaseField :field="field" v-model="value">
    <template #default="{fieldId, isValid}">
      <select
        :id="fieldId"
        v-model="value"
        :required="field.required"
        class="form-select"
        :class="{'is-invalid': !isValid}"
      >
        <option value="">{{ field.placeholder }}</option>
        <option
          v-for="(label, optionValue) in field.items"
          :key="optionValue"
          :value="optionValue"
        >
          {{ label }}
        </option>
      </select>
    </template>
  </BaseField>
</template>
