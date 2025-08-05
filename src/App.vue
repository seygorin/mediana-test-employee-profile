<script setup lang="ts">
import {onMounted, provide, ref} from 'vue'
import {useFormData} from './composables/api/useFormData'
import {ProfileLayout} from './components/layout'
import {ProfileForm} from './components/profile'
import {apiClient} from './api'

const formDataComposable = useFormData()

const useMockData = ref(apiClient.getUseMockData())

provide('formData', formDataComposable)

const toggleDataSource = async () => {
  useMockData.value = !useMockData.value
  apiClient.setUseMockData(useMockData.value)

  await formDataComposable.fetchData()
}

onMounted(() => {
  useMockData.value = apiClient.getUseMockData()
  formDataComposable.fetchData()
})
</script>

<template>
  <ProfileLayout>
    <div class="position-fixed top-0 end-0 m-3" style="z-index: 1030">
      <div class="card shadow-sm">
        <div class="card-body p-2">
          <div class="d-flex align-items-center">
            <small class="text-muted me-2">Данные:</small>
            <button
              class="btn btn-sm"
              :class="useMockData ? 'btn-success' : 'btn-primary'"
              @click="toggleDataSource"
              :disabled="formDataComposable.isLoading.value"
            >
              <span
                v-if="formDataComposable.isLoading.value"
                class="spinner-border spinner-border-sm me-1"
              ></span>
              <i
                v-else
                :class="
                  useMockData ? 'bi bi-database-fill' : 'bi bi-cloud-fill'
                "
                class="me-1"
              ></i>
              {{ useMockData ? 'MOCK' : 'API' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <ProfileForm />
  </ProfileLayout>
</template>
