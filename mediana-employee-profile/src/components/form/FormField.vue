<script setup lang="ts">
import {computed} from 'vue'
import type {Field} from '@/types'
import InputField from './fields/InputField.vue'
import SelectField from './fields/SelectField.vue'
import RadioField from './fields/RadioField.vue'
import CheckboxField from './fields/CheckboxField.vue'
import DateField from './fields/DateField.vue'

interface Props {
  field: Field
  modelValue?: Field['value']
}

interface Emits {
  'update:modelValue': [value: Field['value']]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const componentMap = {
  input: InputField,
  select: SelectField,
  radio: RadioField,
  checkboxlist: CheckboxField,
  date: DateField,
} as const

const FieldComponent = computed(() => componentMap[props.field.type])

const value = computed({
  get: () => props.modelValue ?? props.field.value,
  set: (newValue) => emit('update:modelValue', newValue),
})
</script>

<template>
  <component :is="FieldComponent" :field="field" v-model="value" />
</template>

