<script setup>
// 监听resize事件，网页刷新
window.addEventListener('resize', () => {
  window.location.reload()
})
</script>

<template>
  <RouterView />
</template>
