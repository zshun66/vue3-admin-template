import SvgIcon from './SvgIcon/SvgIcon.vue'

const components = {
	SvgIcon
}
export default {
	install(app) {
		Object.keys(components).forEach(key => {
			app.component(key, components[key])
		})
	}
}