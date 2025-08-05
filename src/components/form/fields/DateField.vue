<script setup lang="ts">
import {computed} from 'vue'
import type {DateField as DateFieldType} from '@/types'
import BaseField from '../BaseField.vue'

interface Props {
  field: DateFieldType
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
      <input
        :id="fieldId"
        v-model="value"
        type="date"
        :required="field.required"
        class="form-control"
        :class="{'is-invalid': !isValid}"
      />
    </template>
  </BaseField>
</template>
