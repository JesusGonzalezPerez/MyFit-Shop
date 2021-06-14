<template>
    <div>
        <!-- Buscador y botón de filtro  -->
        <div id="searcher" class="input-group d-flex justify-content-center pt-5" style="background-color:rgb(240,240,240)"> 
            <div class="btn-group col-10 d-flex align-items-center">
                <input type="text" class="form-control" title="Buscador" id="searchInput" v-model="filterSearch" aria-describedby="helpId" placeholder="Buscar...">
                <button type="button" @click="limpiarFiltros" class="btn btn-dark" title="Limpiar input">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </button>
            </div>
        </div>   

        <!-- Si el filtro de búsqueda por texto está vació y el contenido del array alimentos no está vacío -->
        <div v-if="arrayFiltrado.length==0 && lengthUp0" id="loader" class="d-flex flex-column justify-content-around align-items-center" style="height:70vh;width:100vw;background-color:rgb(240,240,240);">
              <cube-spin></cube-spin>
        </div>

        <!-- Si no -->
        <div v-else class="products d-flex  p-0 pt-5">
            <div id="productos" class="col-12 d-flex flex-column p-0">
              <div class="d-flex justify-content-center">
                  <div class="d-flex flex-wrap justify-content-left col-11 p-0">
                      <!-- Contenedor producto -->
                      <div  class="articulos" v-for="el in arrayFiltrado" v-bind:key="el.id"> 
                          <router-link v-bind:to="`/Detalles/${el.id}`" id="router">
                              <!-- Etiqueta descuento  -->
                              <p v-if="el.descuento" id="descuento">{{el.descuento}}% DTO.</p>
                              <!-- Contenedor imagen y valoración  -->
                              <div class="divImg">
                                  <img :src="el.img">
                                  <div style="display:flex;align-item:center;justify-content:center;"><img src="../../../img/estrella.svg" style="width:1rem;margin-right:.1rem"/>{{el.valoracion}}</div>
                              </div>
                              <!-- Contenedor información con el nombre -->
                              <div class="divInfo">
                                  <br>
                                  <h5 class="text-center"><strong>{{el.nombre}}</strong></h5>
                              </div>
                              <!-- Contenedor con el precio -->
                              <div id="precio">
                                  <p v-if="el.descuento" class="m-0 mr-1">{{precioConDescuento(el.precio,el.descuento)}}€</p>
                                  <p class="m-0">{{el.precio}}€</p>
                              </div>
                          </router-link>

                          <!-- Contenedor con el botón [Añadir al carrito]  -->
                          <div class="divButton text-center my-2 mb-3">
                              <button v-if="user && el.stock>0" type="button" class="btn  btn-outline-dark mx-0 my-0" @click="addProduct(el.img, el.nombre, el.stock, precioConDescuento(el.precio,el.descuento),el.id)">
                                  Añadir <i class="fa fa-shopping-cart" aria-hidden="true"/>
                              </button>
                              <!-- Si no hay stock del producto  -->
                              <p v-if="el.stock==0" style="color:red">Stock agotado</p>
                          </div>
                      </div>
                  </div>
                </div>
          </div>
        </div>
        <!-- Si el filtro de búsqueda por texto está vació y el contenido del array alimentos también -->
        <h3 v-if="arrayFiltrado.length==0 && !lengthUp0" class="mt-5" style="background-color:rgb(240,240,240);">Lo sentimos, no hay resultados para su búsqueda <i class="fa fa-frown-o" aria-hidden="true"></i></h3>
    </div>
</template>

<script>
// Se importa la base de datos
import { db } from "../../db";

// Importe loader
import CubeSpin from '../../../node_modules/vue-loading-spinner/src/components/Circle'

// Importamos JQuery
const $ = require('jquery')
// Lo declaramos globalmente
window.$ = $

export default {
  name: 'Products',
  components:{
    CubeSpin,
  },
  props:{
    ProductsA:{
      type: Array,
      default: function(){
        return [];
      }
    },
  },
  data () {
    return {
      user : null,
      root : null,
      filterSearch:"",
      arrayAlimentos: [],
      lengthUp0: true,
    }
  },
  firestore:{
    // Contiene todos los alimentos
    arrayAlimentos: db.collection("arrayAlimentos")
    .orderBy("nombre")
    .limit(24),
  },
  created() {
    /**
     *  Comprueba si hay un usuario con sesión iniciada
     * 
     *  @author Jesús González 
    */
    // Si existe el usuario en localStorage
    if(localStorage.getItem('user')){
        // Asigna el objeto usuario a la variable user
        this.user = localStorage.getItem('user');
        // Si el email del usuario corresponde al del administrador
        if(this.user == "administrador@admin.com"){
            // Asigna el objeto usuario a la variable root
            this.root = this.user;
            // La variable user se intercambia a nula
            this.user = null;
        }
    } else { 
        localStorage.clear();
        // Si no existe una cuenta de usuario actualmente abierta, se les asigna a las variables un valor nulo
        this.user = null;
        this.root = null;
    }
  },
  methods: {
    /**
     *  Añade al carrito el elemento y notifica
     * 
     *  @param {String} img Enlace de la imagen del producto
     *  @param {String} nombre Nombre del producto
     *  @param {Number} stock Cantidad disponible del producto
     *  @param {Number} precio Precio del producto
     *  @param {String} id Identificador del producto
     * 
     *  @author Jesús González 
    */
    addProduct: function (img, nombre, stock, precio, id) {
      // Añade a la colección el objeto con los parámetros proporcionados
      const nombreSinEspacios = nombre.replace(/ /g, "");
      const emailString = this.user.toString();
      const emailFormated = emailString.replace(/\.|_|#|-|@|<>/g, '');
      db.collection("arrayCarrito")
      .doc(`${nombreSinEspacios}${emailFormated}`)
      .get().then((doc) => {
          // Si el documento en la base de datos existe
          if (doc.exists) {
            // Se notifica de que el producto se ha añadido correctamente
            this.$notify({
              title: nombre+" se encuentra en el carrito.",
              type: 'warn'
            });
          // Si no existe
          } else {
            db.collection("arrayCarrito").doc(`${nombreSinEspacios}${emailFormated}`).set({
              img: img,
              nombre: nombre,
              stock: stock,
              precio: precio,
              cantidad: 1,
              idS: id,
              email: this.user,
            });
            // Se notifica de que el producto se ha añadido correctamente
            this.$notify({
              title: nombre+" se ha añadido al carrito.",
            });
          } 
      }) 
    },

    /**
     *  Retorna el precio con descuento del producto (limita la cifra a un decimal)
     * 
     *  @param {Number} precio Precio del producto
     *  @param {Number} descuento Descuento del producto
     * 
     *  @author Jesús González 
    */
    precioConDescuento: function (precio, descuento) {
      return (precio-(precio*descuento/100)).toFixed(1);
    },

    /**
     * Cambia el valor de la variable
     * 
     * @author Jesús González
     */
    setExist(lengthUp0) {
      this.lengthUp0 = lengthUp0;
    },

    /**
     * Limpia el input buscador y desmarca todos los checkboxes
     * 
     * @author Jesús González
     */
    limpiarFiltros: function(){ 
        this.filterSearch = "";
    }
  },
  computed:{
    /**
     * Filtra el contenido del array
     * 
     * @author Jesús González
     */
    arrayFiltrado: function () {
       // Si el input de búsqueda está vacío devuelve el array de suplementos
      if (this.filterSearch == "") {
        return this.arrayAlimentos;
        // Si no está vacío
      } else {
        // Devuelve el array aplicando el filtro
        var array = this.arrayAlimentos.filter((obj) => {
          if (obj.nombre.toLowerCase().indexOf(this.filterSearch.toLowerCase()) >=0) {
            return true;
          } else {
            return false;
          }
        });

        if (array.length == 0) {
          this.setExist(false);
          return array;
        } else {
          this.setExist(true);
          return array;
        }
      }
    },
  }
}
</script>

<style scoped lang="scss">
  // Importe de estilos de los productos
  @import "../../scss/_products.scss";
</style>
