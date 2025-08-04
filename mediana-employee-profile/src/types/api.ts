export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

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
