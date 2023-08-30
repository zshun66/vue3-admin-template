import { getStorage, setStorage } from './storage'

const config = {
  /**
   * 默认主题
   */
  theme: 'dark',
}

const CONFIG_KEY = 'Admin_Config'
const configStorageObj = getStorage(CONFIG_KEY)
for (let key in configStorageObj) {
  config[key] = configStorageObj[key]
}

export const saveConfig = (key, value) => {
  config[key] = value
  setStorage(CONFIG_KEY, config)
}

export default config