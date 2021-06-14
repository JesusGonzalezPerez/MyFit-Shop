// Vue
import Vue from 'vue'
import App from './App.vue'

import Vuex from 'vuex'
Vue.use(Vuex)

// Bootstrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Popper
import 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';

// Componente de ventana de confirmación
import VueConfirmDialog from 'vue-confirm-dialog'
Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

// Notificaciones
import Notifications from 'vue-notification'
Vue.use(Notifications)

// Vuefire
import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)

// Vue router
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// Componente inicio
import Home from './components/Home/Home.vue'
Vue.component(Home)

// Componente inicio de sesión
import Login from './components/Login/Login.vue'
Vue.component(Login)

// Componente registro de usuario
import Registrar from './components/Registrar/Registrar.vue'
Vue.component(Registrar)

// Componente carrito 
import Carrito from './components/Carrito/Carrito.vue'
Vue.component(Carrito)

// Componente administrador para manejar datos de la aplicación
import Root from './components/Root/Root.vue'
Vue.component(Root)

// Componente información sobre la empresa
import QuienesSomos from './components/QuienesSomos/QuienesSomos.vue'
Vue.component(QuienesSomos)

// Componente que introduce a los nuevos usuarios
import EresNuevo from './components/EresNuevo/EresNuevo.vue'
Vue.component(EresNuevo)

// Componente 
import MainS from './components/MainS/MainS.vue'
Vue.component(MainS)

// Componente 
import MainA from './components/MainA/MainA.vue'
Vue.component(MainA)

// Componente que muestra los detalles de cada producto
import Detalles from './components/Detalles/Detalles.vue'
Vue.component(Detalles)

// Componente 
import HistorialCompras from './components/HistorialCompras/HistorialCompras.vue'
Vue.component(HistorialCompras)

// Componente 
import HistorialVentas from './components/HistorialVentas/HistorialVentas.vue'
Vue.component(HistorialVentas)

// Componente 
import NotFound404 from './components/NotFound404/NotFound404.vue'
Vue.component(NotFound404)



// Rutas del router-link
const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/Login', component: Login, name:'Login' },
  { path: '/Registrar', component: Registrar, name:'Registrar' },
  { path: '/Carrito', component: Carrito, name:'Carrito' },
  { path: '/Root', component: Root, name:'Root'},
  { path: '/QuienesSomos', component: QuienesSomos, name:'QuienesSomos'},
  { path: '/EresNuevo', component: EresNuevo, name:'EresNuevo'},
  { path: '/MainS/Suplementacion', component: MainS, name:'Suplementacion'},
  { path: '/MainA/Alimentacion', component: MainA, name:'Alimentacion'},
  { path: '/Detalles/:id', component: Detalles, name:'Detalles'},
  { path: '/HistorialCompras', component: HistorialCompras, name:'HistorialCompras'},
  { path: '/HistorialVentas', component: HistorialVentas, name:'HistorialVentas'},
  { path: "*", component: NotFound404, name:'NotFound404'}
]

// Instanciamiento de VueRouter al que se les pasa las rutas previamente definidas
const router = new VueRouter({
  routes
})


// Objeto Vue
new Vue({
  render: h => h(App),
  router
}).$mount('#app')

