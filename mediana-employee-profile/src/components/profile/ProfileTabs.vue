<script setup lang="ts">
import { computed, inject } from 'vue'
import FormGroup from './FormGroup.vue'

const formData = inject('formData') as any

const renderableGroups = computed(() => {
  if (!formData?.data.value?.groups) return {}
  
  const groups = formData.data.value.groups
  const result: Record<string, any> = {}
  
  Object.entries(groups)
    .sort(([, a]: [string, any], [, b]: [string, any]) => a.order - b.order)
    .forEach(([key, group]) => {
      result[key] = group
    })
  
  return result
})
</script>

<template>
  <div class="card">
    <b-tabs card>
      <b-tab
        v-for="(group, key) in renderableGroups"
        :key="key"
        :title="group.title"
        :active="key === 'personal'"
      >
        <div class="card-body">
          <FormGroup :group="group" />
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>