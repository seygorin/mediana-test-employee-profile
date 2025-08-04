<script setup lang="ts">
import {inject} from 'vue'
import LoadingState from '../ui/LoadingState.vue'
import ErrorState from '../ui/ErrorState.vue'
import ProfileTabs from './ProfileTabs.vue'
import ProfileActions from './ProfileActions.vue'

const formData = inject('formData') as any
</script>

<template>
  <LoadingState v-if="formData?.isLoading.value" />

  <ErrorState
    v-else-if="formData?.error.value"
    :message="formData.error.value"
    @retry="formData?.retry()"
  />

  <div v-else-if="formData?.hasData.value">
    <ProfileTabs />
    <ProfileActions />
  </div>

  <div v-else class="text-center py-5">
    <p class="text-muted">Нет данных для отображения</p>
    <button class="btn btn-primary" @click="formData?.fetchData()">
      Загрузить данные
    </button>
  </div>
</template>
