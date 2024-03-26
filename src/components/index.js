import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import SvgIcon from './SvgIcon/SvgIcon.vue'
import WangEditor from './WangEditor/WangEditor.vue'
import StepGuide from './StepGuide/StepGuide.vue'

const components = {
	SvgIcon,
	WangEditor,
	StepGuide,
}
export default {
	install(app) {
		for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
			app.component(key, component)
		}
		Object.keys(components).forEach(key => {
			app.component(key, components[key])
		})
	}
}