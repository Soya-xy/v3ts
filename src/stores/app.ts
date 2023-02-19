export const useAppStore = defineStore('app', () => {
  /**
   * Current name of the user.
   */
  const loading = ref(false)
  const tips = ref('加载中...')

  const setLoading = (value: boolean, tip = '加载中...') => {
    loading.value = value
    tips.value = tip
  }

  return {
    loading,
    tips,
    setLoading,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
