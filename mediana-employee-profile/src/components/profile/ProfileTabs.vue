<script setup lang="ts">
import {inject, computed} from 'vue'
import FormGroup from './FormGroup.vue'

const formData = inject('formData') as any

const renderableGroups = computed(() => {
  if (!formData?.data.value?.groups) return {}

  const groups: Record<string, any> = {}

  Object.entries(formData.data.value.groups).forEach(([key, group]) => {
    if (
      group &&
      typeof group === 'object' &&
      !Array.isArray(group) &&
      'title' in group
    ) {
      groups[key] = group
    }
  })

  return groups
})

const getTabTitle = (groupKey: string, group: any) => {
  if (group.title) return group.title

  return groupKey
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>

<template>
  <div v-if="Object.keys(renderableGroups).length > 0">
    <b-card no-body>
      <b-tabs card>
        <b-tab
          v-for="(group, groupKey) in renderableGroups"
          :key="groupKey"
          :title="getTabTitle(groupKey, group)"
          :active="groupKey === 'personal'"
        >
          <b-card-body>
            <FormGroup :group="group" />
          </b-card-body>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
