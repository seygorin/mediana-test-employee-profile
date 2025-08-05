import type {
  ApiFormData,
  ApiGroup,
  ApiField,
  FormData,
  FormGroup,
  Field,
  FormBlock,
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
        items: (apiField.items as string[]) || [],
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
      return {
        ...baseField,
        type: 'input' as const,
        value: String(apiField.value),
      }
  }
}

export function transformApiGroup(apiGroup: ApiGroup): FormGroup {
  const blocks: Record<string, FormBlock> = {}

  Object.entries(apiGroup.blocks).forEach(([blockId, block]) => {
    if (!Array.isArray(block)) {
      const transformedBlock: FormBlock = {}
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

  Object.entries(apiGroup).forEach(([key, value]) => {
    if (
      key !== 'title' &&
      key !== 'blocks' &&
      value &&
      typeof value === 'object' &&
      'type' in value
    ) {
      result[key] = transformApiField(value as ApiField)
    }
  })

  return result
}

export function transformApiFormData(apiData: ApiFormData): FormData {
  const groups: Record<string, FormGroup | Field[]> = {}

  Object.entries(apiData.groups).forEach(([groupKey, groupData]) => {
    if (Array.isArray(groupData)) {
      groups[groupKey] = groupData.map((field) => transformApiField(field))
    } else {
      groups[groupKey] = transformApiGroup(groupData)
    }
  })

  return {groups}
}
