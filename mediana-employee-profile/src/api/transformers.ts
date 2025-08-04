import type {
  ApiFormData,
  ApiField,
  ApiGroup,
  FormData,
  FormGroup,
  Field,
} from '@/types'

export function transformApiField(apiField: ApiField): Field {
  const baseField = {
    label: apiField.label,
    placeholder: apiField.placeholder,
    required: Boolean(apiField.required),
  }

  switch (apiField.type) {
    case 'input':
      return {
        ...baseField,
        type: 'input' as const,
        value: String(apiField.value),
      }
    case 'select':
      return {
        ...baseField,
        type: 'select' as const,
        value: String(apiField.value),
        items: (apiField.items as Record<string, string>) || {},
      }
    case 'radio':
      return {
        ...baseField,
        type: 'radio' as const,
        value: String(apiField.value),
        items: Array.isArray(apiField.items) ? apiField.items : [],
      }
    case 'checkboxlist':
      return {
        ...baseField,
        type: 'checkboxlist' as const,
        value: Array.isArray(apiField.value) ? apiField.value : [],
        items: (apiField.items as Record<string, string>) || {},
      }
    case 'date':
      return {
        ...baseField,
        type: 'date' as const,
        value: String(apiField.value),
      }
    default:
      throw new Error(`Unknown field type: ${apiField.type}`)
  }
}

export function transformApiGroup(apiGroup: ApiGroup): FormGroup {
  const blocks: Record<string, any> = {}

  Object.entries(apiGroup.blocks).forEach(([blockId, block]) => {
    if (Array.isArray(block)) {
      blocks[blockId] = block
    } else {
      const transformedBlock: Record<string, Field> = {}
      Object.entries(block).forEach(([fieldId, field]) => {
        transformedBlock[fieldId] = transformApiField(field)
      })
      blocks[blockId] = transformedBlock
    }
  })

  const result: FormGroup = {
    title: apiGroup.title,
    blocks,
  }

  if (apiGroup.experience) {
    result.experience = transformApiField(apiGroup.experience)
  }
  if (apiGroup.subjects) {
    result.subjects = transformApiField(apiGroup.subjects)
  }

  return result
}

export function transformApiFormData(apiData: ApiFormData): FormData {
  return {
    groups: {
      personal: transformApiGroup(apiData.groups.personal),
      contact: transformApiGroup(apiData.groups.contact),
      experience: transformApiGroup(apiData.groups.experience),
      research: apiData.groups.research || [],
    },
  }
}