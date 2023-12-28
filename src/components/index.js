import SvgIcon from './SvgIcon/SvgIcon.vue'
import WangEditor from './WangEditor/WangEditor.vue'

const components = {
	SvgIcon,
	WangEditor
}
export default {
	install(app) {
		Object.keys(components).forEach(key => {
			app.component(key, components[key])
		})
	}
}