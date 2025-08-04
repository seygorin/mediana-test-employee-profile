import {ref, computed, readonly} from 'vue'
import {apiClient, transformApiFormData} from '../../api'
import type {FormData} from '@/types'

export interface ApiError {
  message: string
  code?: string | number
  details?: unknown
}

export interface ApiField {
  type: string
  label: string
  placeholder: string
  value: string | string[]
  required: number
  items?: Record<string, string> | string[]
}

export interface ApiBlock {
  [key: string]: ApiField
}

export interface ApiGroup {
  title: string
  blocks: Record<string, ApiBlock | ApiField[]>
  experience?: ApiField
  subjects?: ApiField
}

export interface ApiFormData {
  groups: {
    personal: ApiGroup
    contact: ApiGroup
    experience: ApiGroup
    research: ApiField[]
  }
}

export function useFormData() {
  const data = ref<FormData | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const hasData = computed(() => data.value !== null)

  const fetchData = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await apiClient.getFormData()

      if (response.error) {
        error.value = response.error
      } else if (response.data) {
        data.value = transformApiFormData(response.data)
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Неизвестная ошибка'
    } finally {
      isLoading.value = false
    }
  }

  const saveData = async () => {
    if (!data.value) {
      throw new Error('Нет данных для сохранения')
    }

    isLoading.value = true
    error.value = null

    try {
      console.log('Сохранение данных:', data.value)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка сохранения'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const retry = () => fetchData()
  const clearError = () => {
    error.value = null
  }

  return {
    data: readonly(data),
    isLoading: readonly(isLoading),
    error: readonly(error),
    hasData,
    fetchData,
    saveData,
    retry,
    clearError,
  }
}
