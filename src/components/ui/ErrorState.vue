<script setup lang="ts">
interface Props {
  title?: string
  message: string
  retryText?: string
}

interface Emits {
  retry: []
}

withDefaults(defineProps<Props>(), {
  title: 'Ошибка загрузки данных',
  retryText: 'Попробовать снова'
})

defineEmits<Emits>()
</script>

<template>
  <div class="alert alert-danger" role="alert">
    <h4 class="alert-heading">{{ title }}</h4>
    <p>{{ message }}</p>
    <hr />
    <div class="d-flex gap-2">
      <button class="btn btn-outline-danger" @click="$emit('retry')">
        {{ retryText }}
      </button>
    </div>
  </div>
</template>