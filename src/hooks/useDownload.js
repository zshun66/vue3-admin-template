/**
 * 下载文件Hook
 */
const useDownload = async (callback, params, fileName) => {
  const loading = ElLoading.service({
    lock: true,
    text: '文件下载中...',
    background: 'rgba(255, 255, 255, 0.7)',
  })
  const { result } = await callback(params)
  loading.close()
  if (!result) return
  const blob = new Blob([result])
  // 兼容 edge 不支持 createObjectURL 方法
  if ('msSaveOrOpenBlob' in navigator) {
    return navigator.msSaveOrOpenBlob(blob, fileName)
  }
}

export default useDownload