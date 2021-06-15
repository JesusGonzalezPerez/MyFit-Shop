<template>
  <div class="products">
          <!-- Contenedor producto -->
          <div  class="articulos mr-2" v-for="el in Products" v-bind:key="el.id" :title="el.nombre"> 
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
                  <button v-if="user && el.stock>0" title="Añadir al carrito" type="button" class="btn  btn-outline-dark mx-0 my-0" @click="addProduct(el.img, el.nombre, el.stock, precioConDescuento(el.precio,el.descuento), el.id)">
                      Añadir <i class="fa fa-shopping-cart" aria-hidden="true"/>
                  </button>
                  <!-- Si no hay stock del producto  -->
                  <p v-if="el.stock==0" style="color:red">Stock agotado</p>
              </div>
          </div>
  </div>
</template>

<script>
// Se importa la base de datos
import { db } from "../../db";

export default {
  name: 'ProductsList',
  data () {
    return {}
  },
  props:{
    Products:{
      type: Array,
      default: function(){
        return [];
      }
    },
  },
  created(){
    /**
     *  Comprueba si hay un usuario con sesión iniciada y guarda el objeto usuario en una variable
     * 
     *  @param {Object} user Corresponde al usuario autentificado en Firebase 
     * 
     *  @author Jesús González 
    */
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
  methods:{
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
  }
}
</script>

<style scoped lang="scss">
  // Importe de estilos de los productos
  @import "../../scss/_products.scss";
</style>
