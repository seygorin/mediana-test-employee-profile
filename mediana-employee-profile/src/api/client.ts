import type {ApiResponse, ApiFormData} from '@/types'
import {MOCK_DATA} from './mock-data'

class ApiClient {
  private baseURL: string
  private useMockData: boolean

  constructor(baseURL: string = '', useMockData: boolean = true) {
    this.baseURL = baseURL
    this.useMockData = useMockData
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return {data, error: null}
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  async getFormData(): Promise<ApiResponse<ApiFormData>> {
    if (this.useMockData) {
      console.log('Mock data...')
      await new Promise((resolve) => setTimeout(resolve, 500))

      return {
        data: MOCK_DATA,
        error: null,
      }
    }

    console.log('API data...')
    return this.request<ApiFormData>('/api/')
  }

  setUseMockData(useMock: boolean) {
    this.useMockData = useMock
  }

  getUseMockData(): boolean {
    return this.useMockData
  }
}

export const apiClient = new ApiClient()
