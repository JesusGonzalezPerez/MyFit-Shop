<template>
<div>
    <div class="tabla-carrito" style="background-color:rgb(240,240,240)">
        <div class="d-flex justify-content-center">
            <!-- Título del carrito -->
            <h5><i class="fa fa-shopping-bag" aria-hidden="true"></i> Cesta de compra MyFit</h5>
            <!-- Si no hay productos en el carrito -->
            <div v-if="!this.carrito.length" style="border:0">
                <img src="https://www.tixtime.com/img/shopping11-aaa.svg" style="width:10rem;"/>
            </div>
            <h5 v-if="!this.carrito.length" style="margin-bottom:2rem;">Tu carrito está vacío <i class="fa fa-frown-o" aria-hidden="true"></i></h5>
            <router-link to="/">
                <button v-if="!this.carrito.length" class="btn btn-dark"> Ver Productos</button>
            </router-link>
            <!-- Bucle que crea un tr por cada elemento del array y rellena los td con los datos  -->
            <div class="ob col-10 flex-sm-row py-2" style="background-color:white" v-for="(el,index) in carrito" v-bind:key="el.id" :id="index">
                <!-- Imagen  -->
                <img :src="el.img"/>
                <!-- Nombre producto -->
                <p id="nombre">{{el.nombre}}</p>
                <!-- Cantidad a comprar -->
                <div id="cant" class="d-flex flex-column mx-2">
                    <p><strong>Cantidad</strong></p>
                    <div class="d-flex flex-row my-0">
                        <i class="fa fa-minus mx-1 ml-3" aria-hidden="true" @click="restaUno(el.id)" /> 
                        <p class="pl-2" :id="el.id" >{{el.cantidad}}</p> 
                        <p>/</p>
                        <p class="pr-2" > {{el.stock}}</p> 
                        <i class="fa fa-plus px-2" aria-hidden="true" @click="sumaUno(el.id, el.stock)" />
                    </div>
                </div>
                <!-- Precio producto -->
                <div id="precio" class="d-flex flex-column mx-2">
                    <p><strong>Precio total:</strong></p>
                    <p class="px-2">{{parseFloat(el.precio*el.cantidad).toFixed(2)}}€</p>
                </div>
                <!-- Botón eliminar producto del carrito -->
                <button class="btn btn-outline-danger" v-on:click="eliminar(el.id,el.nombre)"><i class="fa fa-trash" aria-hidden="true" ></i></button>  
            </div>

            <!-- Si el carrito tiene elementos, muestra el total -->
            <div v-if="this.carrito.length" class="col-10">
                <p id="total" >TOTAL: {{totalCarrito}} €</p>
            </div>

            <!-- Botón comprar -->
            <button id="btnBuy" @click="confirmComprar()"  class="btn btn-dark"  v-if="this.carrito.length"><i class="fa fa-shopping-bag" aria-hidden="true"></i> Realizar compra</button>
        </div>
    </div>
    
        <!-- Modal Compra -->
        <div class="modal" id="modalCompra" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <!-- Modal header -->
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Elige forma de pago</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div id="bodyModal" class="modal-body d-flex flex-column">
                            <div @click="comprar('Redsys')" class="w-100 my-1" style="cursor:pointer"><img src="https://www.hiopos.online/wp-content/uploads/2019/04/redsys.png" alt="" height="40vh"></div>
                            <div @click="comprar('PayPal')" class="w-100 my-1" style="cursor:pointer"><img src="https://programacion.net/files/article/20160627050602_paypal.png" alt="" height="40vh"></div>
                            <div @click="comprar('VISA')" class="w-100 my-1" style="cursor:pointer"><img src="http://www.moto-segura.com/img/cms/LOGOS%20TARGETES/LOGO%20VISA%20PNG.png" alt="" height="40vh"></div>
                    </div>
                </div>
            </div>
      </div>
      </div>
</template>

<script>
// Se importa la base de datos
import { db } from "../../db";

// Importamos JQuery
const $ = require('jquery')
// Lo declaramos globalmente
window.$ = $

export default {
  name: 'TablaCarrito',
  props:{
    carrito:{
      type: Array,
      default: function(){
        return [];
      }
    }
  },
  data () {
    return {
      user: null,
      arrayCarrito: [],
      arrayProductos:[],
    }
  },
  mounted(){
    /**
     * Comprueba que exista un usuario activo, que no sea el administrador
     * 
     * @author Jesús González
    */
    // Si existe el objeto user en localStorage 
    if(localStorage.getItem("user")){
        // Se le asigna el valor a la variable user
        this.user = localStorage.getItem('user');
        // Se linkea el arrayCarrito con el contenido de la consulta
        this.$bind('arrayCarrito', db.collection("arrayCarrito").where("email", "==", localStorage.getItem('user')));
        if(this.user == "administrador@admin.com"){
            // Error
            this.$notify({title: 'Error', type: 'error', text: 'El administrador no tiene esta función.'})
            // Mueve al usuario al Home
            this.$router.push({name:'Home'});
        }
      // Si no
      }else{
        // Se limpia el localStorage
        localStorage.clear();
        // Notifica
        this.$notify({title: 'Inicio de Sesión', type: 'error', text: 'Tienes que iniciar sesión para acceder al carrito.'})
        // Mueve al usuario al Home
        this.$router.push({name:'Home'});
        this.$bind('arrayCarrito', db.collection("arrayCarrito").where("email", "==", ""));
      }
  },
  firestore:{
    // Colección del carrito 
    arrayCarrito: db.collection("arrayCarrito").where("email", "==", localStorage.getItem('user'))
  },
  methods:{
    /**
     * Borra el producto del carrito
     * 
     * @author Jesús González
     */
    deleteProduct: function (id) {
      db.collection("arrayCarrito").doc(id).delete();
    },

    /**
     * Realiza la compra
     * 
     * @author Jesús González
     */
    confirmComprar(){
      // Ventana de confirmación para realizar la compra
      this.$confirm({
          title: 'Comprar',
          message: `¿Seguro que desea completar la compra de los productos?`,
          button: {
            no: 'No',
            yes: 'Sí'
          },
          /**
          * Callback Function
          * @param {Boolean} confirm 
          */
          callback: () => {
            $('#modalCompra').modal('show');
          }
      });
    },

    /**
     * Realiza el pago de la cesta completa y descuenta el stock del almacén
     */
    comprar(formaDePago){
        // Si se conforma la compra
        if (confirm) {
            this.arrayCarrito.forEach((obj)=>{
                db.collection('arraySuplementos')
                .doc(`${obj.idS}`)
                .get().then((doc) => {
                    if (doc.exists) {          
                        db.collection('arraySuplementos').doc(obj.idS).update({
                            stock: obj.stock - obj.cantidad,
                        });
                        // Borra los elementos
                        db.collection("arrayCarrito").doc(obj.id).delete();
                    }else{
                        db.collection('arrayAlimentos').doc(obj.idS).update({
                            stock: obj.stock - obj.cantidad,
                        });
                        // Borra los elementos
                        db.collection("arrayCarrito").doc(obj.id).delete();
                    }
                });
            });
            // Genera pedido
            this.generarPedido();

            // Notifica de la compra realizada con éxito
            this.$notify({
              title: "Compra con "+formaDePago+" realizada con éxito",
              type: "success",
              image : 'https://pbs.twimg.com/profile_images/1591360162/wbotelhos-qconsp.png'
            });
            
            // Se oculta el modal
            $('#modalCompra').modal('hide');

            // Se mueve al usuario al inicio
            this.$router.push({ name: "Home" });
        }
    },

    /**
     * 
     * Genera un pedido con los productos comprados del carrito
     * 
     * @author Jesús González
     */
    generarPedido(){
      // // Fecha actual
      const fecha = new Date();
      // // Formateamos la fecha
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
      const fechaFormated= fecha.toLocaleDateString("es-ES", options);

      // Array
      const arrayProductos = [];
      // Recorremos el arrayCarrito
      this.arrayCarrito.forEach((producto)=>{
        // Se guarda cada producto en el arrar previamente creado
        arrayProductos.push({producto});
      });

      // Añadimos a la colección arrayCompras el docuemnto pedido
      db.collection('arrayCompras').add({
        listaProductos: arrayProductos,
        usuario: this.user,
        fecha: fechaFormated,
        total: this.totalCarrito
      })
    },


    /**
     * Elimina un prodcuto del carrito
     * 
     * @author Jesús González
     */
    eliminar(id,nombre){  
        // Ventana de confirmación para borrar del carrito el prodcuto
        this.$confirm({
            title: 'Eliminar',
            message: `¿Seguro que desea eliminar ${nombre} del carrito?`,
            button: {
              no: 'No',
              yes: 'Sí'
            },
            /**
            * Callback Function
            * @param {Boolean} confirm 
            */
            callback: confirm => {
              // Si se confirma
              if (confirm) {
                  // Borra el producto de la colección
                  db.collection("arrayCarrito").doc(id).delete();
              }
            }
        })
    },

    /**
     * Aumenta la cantidad de un prodcuto en el carrito
     * 
     * @param {String} id Identificador de la etiqueta html que muestra la cantidad de producto añadida al carrito
     * @param {String} stock Cantidad disponible y por lo tanto máxima posible de añadir al carrito
     * 
     * @author Jesús González
     */
    sumaUno: function(id,stock){
      // Valor de cantidad añadida al carrito
      let valor =  parseInt($(`#${id}`).text());
      // Si el valor es menor al stock total
      if(valor<stock){
        // Valor incrementa en uno
        valor++;
        // Se actualiza la cantidad en la base de datos
        db.collection("arrayCarrito").doc(id).update({cantidad:valor});
        // Se sobreescribe esta cantidad en la vista
        parseInt($(`#${id}`).text(valor));
      }
      this.totalCarrito;
    },

    /**
     * Disminuye la cantidad de un prodcuto en el carrito
     * 
     * @param {String} id Identificador de la etiqueta html que muestra la cantidad de producto añadida al carrito
     * 
     * @author Jesús González
     */
    restaUno: function(id){
      // Valor de cantidad añadida al carrito
      let valor = parseInt($(`#${id}`).text());
      if(valor>=2){
        // Valor disminuye en uno
        valor--;
        // Se actualiza la cantidad en la base de datos
        db.collection("arrayCarrito").doc(id).update({cantidad:valor});
        // Se sobreescribe esta cantidad en la vista
        parseInt($(`#${id}`).text(valor));
      }
      // Se actualiza el total del carrito
      this.totalCarrito;
    },
  },
  computed:{
    /**
     * Obtiene el valor total del carrito
     * 
     * @author Jesús González
     */
    totalCarrito(){
      let total=0;
      this.carrito.forEach((producto)=>{
        total += parseFloat(producto.precio*producto.cantidad);
      });
      return total.toFixed(2);
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../scss/_tablaCarrito.scss";
</style>
