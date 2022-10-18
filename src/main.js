import { createApp, provide} from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/font/iconfont.css'
import App from './App.vue'
import router from './router'
import store from './store'
import VueScroller from 'vue-scroller'
// createApp(App).use(ElementPlus).mount('#app')
const app = createApp(App);
for (const name in ElementPlusIconsVue) {
    app.component(name, ElementPlusIconsVue[name]);
  }
app.use(ElementPlus);
app.use(router)
app.use(VueScroller)
app.provide('store', store)
app.mount("#app");
