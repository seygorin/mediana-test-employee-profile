import {computed, type Ref} from 'vue'
import type {Field} from '@/types'

export function useValidation(field: Ref<Field>) {
  const isRequired = computed(() => field.value.required)

  const isValid = computed(() => {
    const value = field.value.value

    const hasValue = Array.isArray(value)
      ? value.length > 0
      : value !== null && value !== undefined && String(value).trim() !== ''

    if (isRequired.value && !hasValue) {
      return false
    }

    if (!hasValue) {
      return true
    }

    return validateByType(field.value)
  })

  const errorMessage = computed(() => {
    const value = field.value.value
    const hasValue = Array.isArray(value)
      ? value.length > 0
      : value !== null && value !== undefined && String(value).trim() !== ''

    if (isRequired.value && !hasValue) {
      return `Поле "${field.value.label}" обязательно для заполнения`
    }

    if (hasValue) {
      return getValidationError(field.value)
    }

    return null
  })

  return {
    isValid,
    errorMessage,
    isRequired,
  }
}

function validateByType(field: Field): boolean {
  switch (field.type) {
    case 'input':
      return validateInputField(field)
    case 'select':
      return validateSelectField(field)
    case 'checkboxlist':
      return validateCheckboxField(field)
    case 'date':
      return validateDateField(field)
    case 'radio':
      return validateRadioField(field)
    default:
      return true
  }
}

function getValidationError(field: Field): string | null {
  switch (field.type) {
    case 'input':
      return getInputValidationError(field)
    case 'select':
      return getSelectValidationError(field)
    case 'checkboxlist':
      return getCheckboxValidationError(field)
    case 'date':
      return getDateValidationError(field)
    case 'radio':
      return getRadioValidationError(field)
    default:
      return null
  }
}

function validateInputField(field: Field & {type: 'input'}): boolean {
  const value = String(field.value)
  const label = field.label.toLowerCase()

  if (label.includes('email') || label.includes('почта')) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }

  if (label.includes('телефон') || label.includes('phone')) {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/
    return phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10
  }

  return true
}

function validateSelectField(field: Field & {type: 'select'}): boolean {
  return String(field.value).trim() !== ''
}

function validateCheckboxField(field: Field & {type: 'checkboxlist'}): boolean {
  return Array.isArray(field.value) && field.value.length > 0
}

function validateDateField(field: Field & {type: 'date'}): boolean {
  const value = String(field.value)
  if (!value) return true

  const date = new Date(value)
  return !isNaN(date.getTime())
}

function validateRadioField(field: Field & {type: 'radio'}): boolean {
  return String(field.value).trim() !== ''
}

function getInputValidationError(
  field: Field & {type: 'input'}
): string | null {
  const value = String(field.value)
  const label = field.label.toLowerCase()

  if (label.includes('email') || label.includes('почта')) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Введите корректный email адрес'
    }
  }

  if (label.includes('телефон') || label.includes('phone')) {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/
    if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
      return 'Введите корректный номер телефона'
    }
  }

  return null
}

function getSelectValidationError(
  field: Field & {type: 'select'}
): string | null {
  return String(field.value).trim() === ''
    ? `Выберите значение для поля "${field.label}"`
    : null
}

function getCheckboxValidationError(
  field: Field & {type: 'checkboxlist'}
): string | null {
  return !Array.isArray(field.value) || field.value.length === 0
    ? `Выберите хотя бы один вариант для поля "${field.label}"`
    : null
}

function getDateValidationError(field: Field & {type: 'date'}): string | null {
  const value = String(field.value)
  if (!value) return null

  const date = new Date(value)
  return isNaN(date.getTime()) ? 'Введите корректную дату' : null
}

function getRadioValidationError(
  field: Field & {type: 'radio'}
): string | null {
  return String(field.value).trim() === ''
    ? `Выберите значение для поля "${field.label}"`
    : null
}
