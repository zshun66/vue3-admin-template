/**
 * 字典Hook
 */
import useDictStore from '@/pinia/modules/dict.js'
import { reqDictDataListAll } from '@/api/system/dict.js'

const dictStore = useDictStore()

const useDict = (dictTypes) => {
  const dicts = ref({})
  if (!dictTypes || !(dictTypes instanceof Array)) return dicts
  dictTypes.forEach(dictType => {
    const dictData = dictStore.getDict(dictType)
    if (dictData) {
      dicts.value[dictType] = dictData
    } else {
      reqDictDataListAll(dictType).then(({ result, error }) => {
        if (!result) return
        dicts.value[dictType] = result.data || []
        dictStore.setDict(dictType, dicts.value[dictType])
      })
    }
  })
  return dicts
}

export default useDict