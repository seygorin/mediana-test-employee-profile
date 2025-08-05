<script setup lang="ts">
import { computed } from 'vue'
import type {
  Field,
  InputField,
  SelectField,
  RadioField,
  CheckboxField,
  DateField,
} from '@/types'

import InputFieldComponent from './fields/InputField.vue'
import SelectFieldComponent from './fields/SelectField.vue'
import RadioFieldComponent from './fields/RadioField.vue'
import CheckboxFieldComponent from './fields/CheckboxField.vue'
import DateFieldComponent from './fields/DateField.vue'

interface Props {
  field: Field
  modelValue?: Field['value']
}

interface Emits {
  'update:modelValue': [value: Field['value']]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const stringValue = computed({
  get: () => {
    const val = props.modelValue ?? props.field.value
    return Array.isArray(val) ? val.join(', ') : String(val)
  },
  set: (newVal: string) => emit('update:modelValue', newVal),
})

const arrayValue = computed({
  get: () => {
    const val = props.modelValue ?? props.field.value
    return Array.isArray(val) ? val : []
  },
  set: (newVal: string[]) => emit('update:modelValue', newVal),
})
</script>

<template>
  <InputFieldComponent
    v-if="field.type === 'input'"
    :field="field as InputField"
    v-model="stringValue"
  />

  <SelectFieldComponent
    v-else-if="field.type === 'select'"
    :field="field as SelectField"
    v-model="stringValue"
  />

  <RadioFieldComponent
    v-else-if="field.type === 'radio'"
    :field="field as RadioField"
    v-model="stringValue"
  />

  <CheckboxFieldComponent
    v-else-if="field.type === 'checkboxlist'"
    :field="field as CheckboxField"
    v-model="arrayValue"
  />

  <DateFieldComponent
    v-else-if="field.type === 'date'"
    :field="field as DateField"
    v-model="stringValue"
  />
</template>