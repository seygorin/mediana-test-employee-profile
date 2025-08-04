import {computed, Ref} from 'vue'
import {FormGroup} from '@/types'

export function useFormGroup(group: Ref<FormGroup>) {
  const orderedBlocks = computed(() => {
    return Object.values(group.value.blocks).sort((a, b) => {
      return a.id.localeCompare(b.id)
    })
  })

  const hasSpecialFields = computed(() => {
    return (
      group.value.specialFields &&
      Object.keys(group.value.specialFields).length > 0
    )
  })

  const specialFieldsArray = computed(() => {
    if (!group.value.specialFields) return []
    return Object.entries(group.value.specialFields).map(([key, field]) => ({
      key,
      field,
    }))
  })

  return {
    orderedBlocks,
    hasSpecialFields,
    specialFieldsArray,
  }
}
