import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import SvgIcon from './SvgIcon/SvgIcon.vue'
import IconSelect from './IconSelect/IconSelect.vue'
import WangEditor from './WangEditor/WangEditor.vue'
import StepGuide from './StepGuide/StepGuide.vue'

const components = {
	...ElementPlusIconsVue,
	SvgIcon,
	IconSelect,
	WangEditor,
	StepGuide,
}
export default {
	install(app) {
		Object.keys(components).forEach(key => {
			app.component(key, components[key])
		})
	}
}