<script setup lang="ts">
import {ref, computed} from 'vue'
import FormBlock from '../form/FormBlock.vue'
import FormField from '../form/FormField.vue'
import type {FormGroup as FormGroupType, Field} from '@/types'

interface Props {
  group: FormGroupType
}

const props = defineProps<Props>()

const formValues = ref<Record<string, any>>({})

const regularBlocks = computed(() => {
  return Object.entries(props.group.blocks).filter(
    ([, block]) => !Array.isArray(block)
  )
})

const specialFields = computed(() => {
  const fields: Array<{key: string; field: Field}> = []

  Object.entries(props.group).forEach(([key, value]) => {
    if (key === 'title' || key === 'blocks') return

    if (value && typeof value === 'object' && 'type' in value) {
      fields.push({
        key,
        field: value as Field,
      })
    }
  })

  return fields
})

const updateBlockValue = (
  blockValue: Record<string, any>
) => {
  formValues.value = {
    ...formValues.value,
    ...blockValue,
  }
}

const updateFieldValue = (fieldKey: string, value: any) => {
  formValues.value = {
    ...formValues.value,
    [fieldKey]: value,
  }
}

const groupedSpecialFields = computed(() => {
  const groups: Array<Array<{key: string; field: Field}>> = []
  const fields = specialFields.value

  for (let i = 0; i < fields.length; i += 2) {
    groups.push(fields.slice(i, i + 2))
  }

  return groups
})
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h3 class="mb-4 text-primary d-flex align-items-center">
          <i class="bi bi-folder2-open me-2"></i>
          {{ group.title }}
        </h3>
      </div>
    </div>

    <div
      v-for="([blockKey, block]) in regularBlocks"
      :key="blockKey"
      class="row mb-4"
    >
      <div class="col-12">
        <div v-if="!Array.isArray(block)" class="card">
          <div class="card-body">
            <FormBlock
              :block="block"
              :model-value="formValues"
              @update:model-value="updateBlockValue($event)"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="specialFields.length > 0" class="row mb-4">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div
              v-for="(fieldGroup, groupIndex) in groupedSpecialFields"
              :key="groupIndex"
              class="row mb-3"
            >
              <div
                v-for="{key, field} in fieldGroup"
                :key="key"
                :class="
                  field.type === 'checkboxlist' ? 'col-12' : 'col-12 col-md-6'
                "
              >
                <FormField
                  :field="field"
                  :model-value="formValues[key]"
                  @update:model-value="updateFieldValue(key, $event)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
