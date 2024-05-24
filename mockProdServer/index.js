import { createProdMockServer } from 'vite-plugin-mock/client'

const modules = import.meta.glob('../mock/*.js', {
  import: 'default',
  eager: true,
})
const mockModules = []
Object.keys(modules).forEach(async (key) => {
  mockModules.push(...(modules[key]))
})
export function setupProdMockServer() {
  createProdMockServer(mockModules)
}