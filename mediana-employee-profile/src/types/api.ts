export interface ApiResponse<T> {
  data: T | null
  error: string | null
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
  [key: string]: any
}

export interface ApiFormData {
  groups: Record<string, ApiGroup | ApiField[]>
}
