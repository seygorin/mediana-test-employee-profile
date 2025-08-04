<script setup lang="ts">
import {onMounted, provide} from 'vue'
import {useFormData} from './composables/api/useFormData'
import {ProfileLayout} from './components/layout'
import {ProfileForm} from './components/profile'

const formDataComposable = useFormData()

provide('formData', formDataComposable)

onMounted(() => {
  formDataComposable.fetchData()
})
</script>

<template>
  <ProfileLayout>
    <ProfileForm />
  </ProfileLayout>
</template>
