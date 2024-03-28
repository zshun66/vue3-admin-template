/**
 * 下载文件Hook
 */
const useDownload = async (callback, params, fileName) => {
  if (!callback || typeof callback !== 'function') return
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
  const blobUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.style.display = 'none'
  link.download = fileName
  link.href = blobUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(blobUrl)
}

export default useDownload