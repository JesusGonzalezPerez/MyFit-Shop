<template>
    <div>
        <!-- Cabecera -->
        <Header/>
        <!-- Título del componente -->
        <h3 class="py-5 m-0" style="background-color:rgb(240,240,240)"><i class="fa fa-bookmark" aria-hidden="true"></i> Historial de compras {{getnombre}}</h3>
        <!-- Div principal -->
        <div class="historial-compras">
            <div v-if="arrayCompras.length==0 && !loading">
                <h5 class="p  t-5">Aún no has realizado ninguna compra, ¿a qué esperas?</h5>
                <router-link to="/" class="btn btn-dark mt-3">Ver productos</router-link>
            </div>
            <!-- Si el arrayCompras está vacío -->
            <cube-spin v-if="arrayCompras.length==0 && loading"></cube-spin>
            <!-- Si el arrayCompras no esta vacío -->
            <div v-else class="d-flex justify-content-around py-2" style="background-color:rgb(240,240,240)" v-for="(pedido,index) in arrayCompras" v-bind:key="pedido.id">
                <div class="pedido d-flex justify-content-between w-75 flex-column p-2 my-1">
                    <div class="d-flex justify-content-between align-items-center px-2 pb-2 w-100">
                      <div class="text-left" style="width:20rem;color:black" title="Fecha">{{pedido.fecha}}</div>
                      <div class="mx-3" style="font-weight:bold;color:black;background-color:rgb(252, 4, 132, 0.4);padding:.2rem;border-radius:.25rem;border:1px solid rgba(0, 0, 0, 0.53);width:8rem" title="Precio total">Total: {{pedido.total}}€</div>
                      <i :id="pedido.id" class="fa fa-arrow-circle-down" @click="desplegarItem(index,pedido.id)" aria-hidden="true" title="Desplegar pedido"></i>
                    </div>
                    <div :id="index" class="d-none flex-column">
                        <div class="productosList d-flex justify-content-between flex-column flex-md-row align-items-center py-2 px-4 my-1" v-for="(producto,index) in pedido.listaProductos" v-bind:key="index">
                            <img class="m-1" :src="producto.producto.img" :alt="producto.producto.img" title="Imagen producto" style="width:3rem">
                            <div class="d-flex align-items-center justify-content-center" style="width:12rem" title="Nombre producto">{{producto.producto.nombre}}</div>
                            <div title="Cantidad">Cantidad: {{producto.producto.cantidad}}</div>
                            <div title="Precio">Precio Unidad: {{producto.producto.precio}} €</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer -->
        <Footer/>
    </div>
</template>

<script>
// Importe componente Header
import Header from '../Header/Header'
// Importe componente Footer
import Footer from '../Footer/Footer'
// Se importa la base de datos
import { db } from "../../db";
// Importe loader
import CubeSpin from '../../../node_modules/vue-loading-spinner/src/components/Circle'

// Importamos JQuery
const $ = require('jquery')
// Lo declaramos globalmente
window.$ = $

export default {
  name: 'HistorialCompras',
  data () {
    return {
      arrayCompras:[],
      user: null,
      loading:true,
    }
  },
  components:{
    Header,
    Footer,
    CubeSpin
  },
  firestore:{
    arrayCompras: db.collection("arrayCompras")
    .where("usuario", "==", localStorage.getItem('user')),
  },
  created(){
      this.loading=true;
      /**
       *  Comprueba si hay un usuario con sesión iniciada y guarda el email de usuario en una variable
       * 
       *  @param {Object} user Corresponde al usuario autentificado en Firebase 
       * 
       *  @author Jesús González 
      */
      // Si existe en el localStorage el elemento usuario
      if(localStorage.getItem('user')){
          // Se guarda el email del usuario del localStorage en la variable user
          this.user = localStorage.getItem('user');
          // Se bindea el valor del arrayCompras al cargar la página
          this.$bind("arrayCompras",db.collection("arrayCompras")
          .where("usuario", "==", localStorage.getItem('user')));
          setTimeout(() => {
            if (this.arrayCompras.length == 0) {
              this.loading = false;
            }
          }, 700);
      // Si no hay elemento user en el localStorage no hay usuario logueado
      }else{
          localStorage.clear();
          // El valor de user se torna null
          this.user = null;
          this.$notify({title: 'Inicio de Sesión', type: 'error', text: 'Tienes que iniciar sesión para acceder al historial de compras.'})
          this.$router.push({name:'Home'});
      }
  },
  methods:{
      /**
       *  Despliega el contenedor de cada pedido para ver su contenido
       * 
       *  @param {String} index Posicion del elemento pedido 
       *  @param {String} pedido Identificador del pedido
       * 
       *  @author Jesús González
       */
      desplegarItem(index,pedido){
        // Si el contenedor esta oculto
        if(document.getElementById(index).classList.contains("d-none")){
          // Cambiamos la clase del icono 
          document.getElementById(pedido).classList.replace("fa-arrow-circle-down","fa-arrow-circle-up");
          // Mostramos el contenedor
          document.getElementById(index).classList.replace("d-none","d-flex");
        // Si no
        }else{
          // Cambiamos la clase del icono 
          document.getElementById(pedido).classList.replace("fa-arrow-circle-up","fa-arrow-circle-down");
          // Ocultamos el contenedor
          document.getElementById(index).classList.replace("d-flex","d-none");
        }
      },
  },
  computed:{
    /**
     *  Obtiene el "nombre del usuario" a partir de su email
     * 
     *  @author Jesús González
     */
    getnombre(){
      // Convierte el correro del usuario en string
      const usuario = (this.user).toString();
      // Lo separa con el elemento @
      const usuarioModificado = usuario.split('@');
      // Guardamos el primer string resultante
      const nombre = usuarioModificado[0];
      // Retornamos ese valor como nombre
      return nombre;
    }
  }
}
</script>

<style scoped lang="scss">
    @import "../../scss/_historialCompras.scss";
</style>
