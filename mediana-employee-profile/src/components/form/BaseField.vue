<script setup lang="ts" generic="T extends Field">
import {computed, ref, watch, inject, onMounted, onUnmounted} from 'vue'
import type {Field} from '@/types'
import {useValidation} from '@/composables/form/useValidation'

interface Props {
  field: T
  modelValue?: T['value']
  showValidation?: boolean
}

interface Emits {
  'update:modelValue': [value: T['value']]
}

const props = withDefaults(defineProps<Props>(), {
  showValidation: true,
})

const emit = defineEmits<Emits>()

const formValidation = inject('formValidation') as any

const internalValue = ref(props.modelValue ?? props.field.value)

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== undefined) {
      internalValue.value = newValue
    }
  },
  {immediate: true}
)

const value = computed({
  get: () => internalValue.value,
  set: (newValue) => {
    internalValue.value = newValue
    emit('update:modelValue', newValue)
  },
})

const fieldId = computed(
  () => `field-${props.field.label.replace(/\s+/g, '-').toLowerCase()}`
)

const fieldKey = computed(() => `${props.field.type}-${props.field.label}`)

const reactiveField = computed(() => ({
  ...props.field,
  value: internalValue.value,
}))

const {isValid, errorMessage, isRequired} = useValidation(reactiveField)

watch(
  [isValid, errorMessage],
  ([valid, error]) => {
    if (formValidation?.registerField) {
      formValidation.registerField(fieldKey.value, valid, error)
    }
  },
  {immediate: true}
)

onMounted(() => {
  if (formValidation?.registerField) {
    formValidation.registerField(
      fieldKey.value,
      isValid.value,
      errorMessage.value
    )
  }
})

onUnmounted(() => {
  if (formValidation?.unregisterField) {
    formValidation.unregisterField(fieldKey.value)
  }
})
</script>

<template>
  <div
    class="form-field mb-3"
    :class="{'has-error': showValidation && !isValid}"
  >
    <label :for="fieldId" class="form-label">
      {{ field.label }}
      <span v-if="field.required" class="text-danger">*</span>
    </label>

    <slot
      :field="field"
      :value="value"
      :fieldId="fieldId"
      :isValid="isValid"
      :errorMessage="errorMessage"
      :isRequired="isRequired"
    />

    <div v-if="showValidation && errorMessage" class="invalid-feedback d-block">
      {{ errorMessage }}
    </div>
  </div>
</template>
