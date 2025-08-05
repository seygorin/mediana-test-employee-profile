declare module '*.css' {
  const content: string
  export default content
}

declare module 'bootstrap-vue-3' {
  import type {App} from 'vue'

  interface BootstrapVue3 {
    install(app: App): void
  }

  const BootstrapVue3: BootstrapVue3
  export default BootstrapVue3
}

declare module 'bootstrap/dist/css/bootstrap.css'
declare module 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
