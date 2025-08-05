import {computed, ref, type Ref} from 'vue'
import type {FormData, Field} from '@/types'

export function useFormValidation(formData: Ref<FormData | null>) {
  const fieldValidations = ref<
    Record<string, {isValid: boolean; errorMessage: string | null}>
  >({})

  const registerField = (
    fieldKey: string,
    isValid: boolean,
    errorMessage: string | null
  ) => {
    fieldValidations.value[fieldKey] = {isValid, errorMessage}
  }

  const unregisterField = (fieldKey: string) => {
    delete fieldValidations.value[fieldKey]
  }

  const isFormValid = computed(() => {
    if (!formData.value) return false

    const validations = Object.values(fieldValidations.value)
    if (validations.length === 0) return false

    return validations.every((validation) => validation.isValid)
  })

  const formErrors = computed(() => {
    return Object.entries(fieldValidations.value)
      .filter(
        ([, validation]) => !validation.isValid && validation.errorMessage
      )
      .map(([fieldKey, validation]) => ({
        fieldKey,
        message: validation.errorMessage!,
      }))
  })

  const invalidFieldsCount = computed(() => {
    return Object.values(fieldValidations.value).filter(
      (validation) => !validation.isValid
    ).length
  })

  const getRequiredFields = (): Field[] => {
    if (!formData.value) return []

    const fields: Field[] = []

    Object.values(formData.value.groups).forEach((group) => {
      if (typeof group === 'object' && 'blocks' in group) {
        Object.values(group.blocks).forEach((block) => {
          if (Array.isArray(block)) {
            return
          }

          Object.values(block).forEach((field) => {
            if (
              typeof field === 'object' &&
              'required' in field &&
              field.required
            ) {
              fields.push(field as Field)
            }
          })
        })
      }
    })

    return fields
  }

  const areRequiredFieldsFilled = computed(() => {
    const requiredFields = getRequiredFields()

    return requiredFields.every((field) => {
      const value = field.value

      if (Array.isArray(value)) {
        return value.length > 0
      }

      return (
        value !== null && value !== undefined && String(value).trim() !== ''
      )
    })
  })

  const resetValidation = () => {
    fieldValidations.value = {}
  }

  return {
    registerField,
    unregisterField,
    isFormValid,
    formErrors,
    invalidFieldsCount,
    areRequiredFieldsFilled,
    resetValidation,
  }
}
