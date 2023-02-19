<script setup lang="ts">
const app = useAppStore()
const loading = computed(() => app.loading)
</script>

<template>
  <Suspense>
    <a-spin :loading="loading" :tip="app.tips">
      <main px-50px py2>
        <RouterView />
      </main>
    </a-spin>
  </Suspense>
</template>
