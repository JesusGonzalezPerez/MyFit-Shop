<template>
<div>
      <!-- Buscador y botón de filtro  -->
      <div id="searcher" class="input-group d-flex justify-content-center pt-5"> 
          <div class="btn-group col-10 d-flex align-items-center">
                <button type="button" class="btn btn-dark" @click="openModal">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                </button>
              <input type="text" class="form-control" name="" id="searchInput"  v-model="filterSearch" aria-describedby="helpId" placeholder="Buscar...">
              <button type="button" @click="limpiarFiltros" class="btn btn-dark">
                  <i class="fa fa-times" aria-hidden="true"></i>
              </button>
          </div>
      </div>   

      <!-- Si el filtro de búsqueda por texto está vació y el contenido del array alimentos no está vacío -->
      <div v-if="arrayFiltrado.length==0 && lengthUp0" id="loader" class="d-flex justify-content-center align-items-center" style="height:70vh;width:100vw">
            <cube-spin></cube-spin>
      </div>

      <!-- Si no -->
      <div v-else class="products d-flex p-0 pt-5">
        <div id="productos" class="col-12 d-flex flex-column p-0">
            <div class="d-flex justify-content-center">
                <div  class="d-flex flex-wrap justify-content-between justify-content-sm-start col-11 p-0">
                    <!-- Contenedor producto -->
                    <div  class="articulos" v-for="el in arrayFiltrado" v-bind:key="el.id" :title="el.nombre"> 
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
                            <button v-if="user && el.stock>0" type="button" title="Añadir al carrito" class="btn  btn-outline-dark mx-0 my-0" @click="addProduct(el.img, el.nombre, el.stock, precioConDescuento(el.precio,el.descuento),el.id)">
                                Añadir <i class="fa fa-shopping-cart" aria-hidden="true"/>
                            </button>
                            <!-- Si no hay stock del producto  -->
                            <p v-if="el.stock==0" style="color:red">Stock agotado</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Si el filtro de búsqueda por texto está vació y el contenido del array alimentos también -->
        <h3 v-if="arrayFiltrado.length==0 && !lengthUp0" class="mt-5">Lo sentimos, no hay resultados para su búsqueda <i class="fa fa-frown-o" aria-hidden="true"></i></h3>

        <!-- Modal filtros -->
        <div class="modal" id="filterModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <!-- Modal header -->
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Categorías</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <ul class="p-0">
                            <li id="proteina" class="btn btn-outline-dark" @click="filtroProteina">     
                                Proteínas
                            </li>
                            <li id="caseina" class="btn btn-outline-dark" @click="filtroCaseina">     
                                Caseína
                            </li>
                            <li id="creatina" class="btn btn-outline-dark" @click="filtroCreatina">     
                                Creatina
                            </li>
                            <li id="barrita" class="btn btn-outline-dark" @click="filtroBarritas">     
                                Barritas
                            </li>
                            <li id="crema" class="btn btn-outline-dark" @click="filtroCremas">     
                                Cremas
                            </li>
                            <li id="accesorio" class="btn btn-outline-dark" @click="filtroAccesorios">     
                                Accesorios
                            </li>
                            <li id="preWorkout" class="btn btn-outline-dark" @click="filtroPreWorkout">     
                                Pre-workout
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
      </div>
  </div>
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
    Products:{
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
      array:[],
      arraySuplementos: [],
      arrayProteina:[],
      arrayCaseina:[],
      arrayCreatina:[],
      arrayBarritas:[],
      arrayPreWorkout:[],
      arrayCrema:[],
      arrayAccesorios:[],
      lengthUp0: true,
    }
  },
  firestore:{
    // Contiene todos los suplementos
    array: db.collection("arraySuplementos")
    .orderBy("nombre"),
    // Contiene todos los suplementos (igual que el anterior, pero este no se sobrescribe)
    arraySuplementos: db.collection("arraySuplementos")
    .orderBy("nombre"),
    // Contiene todas las proteinas
    arrayProteina: db.collection("arraySuplementos")
    .where("categoria", "==", "Proteina"),
    // Contiene todas las caseinas
    arrayCaseina: db.collection("arraySuplementos")
    .where("categoria", "==", "Caseina"),
    // Contiene todas las creatinas
    arrayCreatina: db.collection("arraySuplementos")
    .where("categoria", "==", "Creatina"),
    // Contiene todas las barritas
    arrayBarritas: db.collection("arraySuplementos")
    .where("categoria", "==", "Barrita"),
    // Contiene todas las pre-workout
    arrayPreWorkout: db.collection("arraySuplementos")
    .where("categoria", "==", "Pre-Workout"),
    // Contiene todas las cremas
    arrayCremas: db.collection("arraySuplementos")
    .where("categoria", "==", "Crema"),
    // Contiene todas los accesorios
    arrayAccesorios: db.collection("arraySuplementos")
    .where("categoria", "==", "Accesorio"),
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
     * Abre el modal de filtros
     */
    openModal: function(){
      $('#filterModal').modal('show');
    },


    /**
     * Muestra array de Proteínas
     * 
     * @author Jesús González
     */
    filtroProteina:function(){
        this.filterSearch="";
        this.array = this.arrayProteina;
        $('#filterModal').modal('hide');
    },


    /**
     * Muestra array de Caseinas
     * 
     * @author Jesús González
     */
    filtroCaseina:function(){
        this.filterSearch="";
        this.array = this.arrayCaseina;
        $('#filterModal').modal('hide');
    },


    /**
     * Muestra array de Creatinas
     * 
     * @author Jesús González
     */
    filtroCreatina:function(){
        this.filterSearch="";
        this.array = this.arrayCreatina;
        $('#filterModal').modal('hide');
    },


    /**
     * Muestra array de Barritas
     * 
     * @author Jesús González
     */
    filtroBarritas:function(){
        this.filterSearch="";
      this.array = this.arrayBarritas;
      $('#filterModal').modal('hide');
    },


    /**
     * Muestra array de Pre-Workout
     * 
     * @author Jesús González
     */
    filtroPreWorkout:function(){
        this.filterSearch="";
        this.array = this.arrayPreWorkout;
        $('#filterModal').modal('hide');
    },


    /**
     * Muestra array de Cremas
     * 
     * @author Jesús González
     */
    filtroCremas:function(){
        this.filterSearch="";
      this.array = this.arrayCremas;
      $('#filterModal').modal('hide');
    },


    /**
     * Muestra array de Accesorios
     * 
     * @author Jesús González
     */
    filtroAccesorios:function(){
        this.filterSearch="";
        this.array = this.arrayAccesorios;
        $('#filterModal').modal('hide');
    },
    

    /**
     * Limpia el input buscador y desmarca todos los checkboxes
     * 
     * @author Jesús González
     */
    limpiarFiltros: function(){ 
        this.array = this.arraySuplementos;
        $('#accesorio').prop('checked',false);
        $('#proteina').prop('checked',false);
        $('#caseina').prop('checked',false);
        $('#creatina').prop('checked',false);
        $('#barrita').prop('checked',false);
        $('#preWorkout').prop('checked',false);
        $('#crema').prop('checked',false);
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
        return this.array;
        // Si no está vacío
      } else {
        // Devuelve el array aplicando el filtro
        var arr = this.Products.filter((obj) => {
          if (obj.nombre.toLowerCase().indexOf(this.filterSearch.toLowerCase()) >=0) {
            return true;
          } else {
            return false;
          }
        });

        if (arr.length == 0) {
          this.setExist(false);
            return arr;
        } else {
          this.setExist(true);
            return arr;
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
