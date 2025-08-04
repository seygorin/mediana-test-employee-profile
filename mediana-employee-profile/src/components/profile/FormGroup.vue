<script setup lang="ts">
import {ref} from 'vue'
import FormBlock from '../form/FormBlock.vue'
import FormField from '../form/FormField.vue'
import type {FormGroup as FormGroupType} from '@/types'

interface Props {
  group: FormGroupType
}

const props = defineProps<Props>()

const formValues = ref<Record<string, any>>({})

const updateBlockValue = (
  blockKey: string,
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
</script>

<template>
  <div>
    <h3 class="mb-4 text-primary">{{ group.title }}</h3>

    <div v-for="(block, blockKey) in group.blocks" :key="blockKey" class="mb-4">
      <FormBlock
        :block="block"
        :model-value="formValues"
        @update:model-value="updateBlockValue(blockKey, $event)"
      />
    </div>

    <div v-if="group.experience" class="mb-4">
      <FormField
        :field="group.experience"
        :model-value="formValues['experience']"
        @update:model-value="updateFieldValue('experience', $event)"
      />
    </div>

    <div v-if="group.subjects" class="mb-4">
      <FormField
        :field="group.subjects"
        :model-value="formValues['subjects']"
        @update:model-value="updateFieldValue('subjects', $event)"
      />
    </div>
  </div>
</template>
