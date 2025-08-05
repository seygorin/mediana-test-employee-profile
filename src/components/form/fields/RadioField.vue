<script setup lang="ts">
import {computed} from 'vue'
import type {RadioField as RadioFieldType} from '@/types'
import BaseField from '../BaseField.vue'

interface Props {
  field: RadioFieldType
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
      <div class="form-check-group">
        <div
          v-for="(item, index) in field.items"
          :key="index"
          class="form-check"
        >
          <input
            :id="`${fieldId}-${index}`"
            v-model="value"
            :value="index.toString()"
            type="radio"
            :name="fieldId"
            :required="field.required"
            class="form-check-input"
            :class="{'is-invalid': !isValid}"
          />
          <label :for="`${fieldId}-${index}`" class="form-check-label">
            {{ item }}
          </label>
        </div>
      </div>
    </template>
  </BaseField>
</template>
