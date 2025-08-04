export const FIELD_TYPES = {
  INPUT: 'input',
  SELECT: 'select',
  RADIO: 'radio',
  CHECKBOX: 'checkboxlist',
  DATE: 'date',
} as const

export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]+$/,
  REQUIRED_MIN_LENGTH: 2,
} as const

export const FORM_MESSAGES = {
  LOADING: 'Загрузка данных...',
  SAVE_SUCCESS: 'Профиль успешно сохранен',
  SAVE_ERROR: 'Ошибка при сохранении профиля',
  REQUIRED_FIELD: 'Это поле обязательно для заполнения',
} as const 