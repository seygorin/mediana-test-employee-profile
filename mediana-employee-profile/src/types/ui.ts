export interface LoadingState {
  isLoading: boolean
  message?: string
}

export interface ErrorState {
  hasError: boolean
  message: string
  code?: string | number
}

