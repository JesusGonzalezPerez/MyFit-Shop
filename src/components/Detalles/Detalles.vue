<template>
  <div class="detalles">
    <!-- Cabecera -->
    <Header v-if="!root"/>
    <!-- Cabecera Admin -->
    <HeaderAdmin v-else/>

    <div v-if="loading"  id="loader">
        <cube-spin></cube-spin>
    </div>
  
    <!-- Contenedor con todo el contenido del producto -->
    <div v-else id="producto" class="d-flex flex-wrap flex-column flex-md-row p-4">
        <!-- Subcontenedor con la imagen  -->
        <div id="marcoImg" class="d-flex align-items-center flex-column mb-2 col-12 col-md-5 py-5">
            <div id="divImg" class="d-flex flex-column align-items-center mb-5">
                <img :src="producto.img" :title="producto.nombre"/>
            </div>
            <div v-if="root" class="d-flex flex-column align-items-center mx-2">
                <div class="d-flex my-1">
                    <i id="editImg" @click="editProduct('img','editImg')" class="fa fa-pencil-square-o default mx-1" aria-hidden="true"></i>
                    <i id="saveImg" @click="updateProduct('img','saveImg')" class="fa fa-floppy-o default mx-1" aria-hidden="true"></i>
                </div>
                <p id="img" class="px-5" style="width:15rem;word-wrap: break-word;font-size:0.75rem" contenteditable="false">{{producto.img}}</p>
            </div>

            <!-- Sucontenedor con informacíon sobre el precio y opcion de añadir al carrito-->
            <div id="opciones" class="p-3" style="width:80%">
                <!-- Precio  -->
                <div class="d-flex justify-content-between align-items-center flex-wrap pt-4">
                    <div class="d-flex align-items-center flex-wrap ">
                        <!-- Si tiene descuento...  -->
                        <div v-if="producto.descuento" id="divPrecio" class="d-flex text-left mr-2"><p id="precio" title="Precio con descuento">{{precioConDescuento(producto.precio,producto.descuento)}}</p>€</div>
                        <!-- Si no...  -->
                        <div v-else id="divPrecio" class="d-flex align-items-center text-left mr-2 mb-3"><p  id="precio" class="mb-0" title="Precio" contenteditable="false">{{producto.precio}}</p>€</div>
                        <!-- Si tiene descuento... -->
                        <div v-if="producto.descuento" class="d-flex" style="color:grey"><p id="precioAntes" class="text-left" title="Precio sin descuento" contenteditable="false">{{producto.precio}}</p>€</div>

                        <div v-if="root && producto.descuento" class="d-flex align-items-center mx-3 mb-3">
                            <i id="editPrice" @click="editProduct('precioAntes','editPrice')" class="fa fa-pencil-square-o default mx-1" aria-hidden="true"></i>
                            <i id="savePrice" @click="updateProduct('precioAntes','savePrice')" class="fa fa-floppy-o default mx-1" aria-hidden="true"></i>
                        </div>
                        <div v-if="root && !producto.descuento" class="d-flex align-items-center mx-3 mb-3">
                            <i id="editPrice" @click="editProduct('precio','editPrice')" class="fa fa-pencil-square-o default mx-1" aria-hidden="true"></i>
                            <i id="savePrice" @click="updateProduct('precio','savePrice')" class="fa fa-floppy-o default mx-1" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
                <!-- Si tiene descuento... -->
                <div class="d-flex flex-wrap justify-content-center">
                    <div v-if="producto.descuento" id="divDesc" class="d-flex justify-content-center align-items-center mb-1" title="Descuento">Descuento <p id="descuento" class="d-flex align-items-center pl-2 pr-1 m-0" contenteditable="false">{{producto.descuento}}</p> %</div>
                    <div v-if="root && producto.descuento" class="d-flex align-items-center mx-3 mb-3">
                        <i id="editDescuento" @click="editProduct('descuento','editDescuento')" class="fa fa-pencil-square-o default mx-1" aria-hidden="true"></i>
                        <i id="saveDecuento" @click="updateProduct('descuento','saveDecuento')" class="fa fa-floppy-o default mx-1" aria-hidden="true"></i>
                    </div>
                </div>
                <!-- Si tiene descuento... -->
                <p v-if="producto.descuento" id="ahorro" class="text-left">Ahorras {{(producto.precio-precioConDescuento(producto.precio,producto.descuento)).toFixed(2)}}€!</p>
                <!-- Si el stock es mayor a 0... -->
                <div v-if="producto.stock>0" class="d-flex flex-column align-items-center w-100">
                    <div class="d-flex flex-row" title="Stock"><i id="stockIcon" class="fa fa-check" aria-hidden="true" style="color:green"></i> Stock disponible (<p id="stock" contenteditable="false">{{producto.stock}}</p>)</div>
                    <div v-if="root" class="d-flex align-items-center mx-3 mb-3">
                        <i id="editStock" @click="editProduct('stock','editStock')" class="fa fa-pencil-square-o default mx-1" aria-hidden="true"></i>
                        <i id="saveStock" @click="updateProduct('stock','saveStock')" class="fa fa-floppy-o default mx-1" aria-hidden="true"></i>
                    </div>
                </div>
                <!-- Si no...  -->
                <div v-else class="d-flex flex-column">
                    <div class="mb-2" title="Stock"><i id="stockIcon" class="fa fa-times" aria-hidden="true" style="color:red"></i> Stock  agotado, lo sentimos <i id="stockIcon" class="fa fa-frown-o" aria-hidden="true"></i></div>
                    <div v-if="root" class="d-flex justify-content-center mb-3">
                        <div v-if="root" class="d-flex">Stock (<p id="stock" class="m-0" contenteditable="false">{{producto.stock}}</p>)</div>
                        <i id="editStock" @click="editProduct('stock','editStock')" class="fa fa-pencil-square-o default mx-1" aria-hidden="true"></i>
                        <i id="saveStock" @click="updateProduct('stock','saveStock')" class="fa fa-floppy-o default mx-1" aria-hidden="true"></i>
                    </div>
                </div>

                <!-- Si hay usuario con sesión iniciada y el stock es mayor a 0 muestra el botón de añadir al carrito -->
                <button v-if="user && producto.stock>0" id="comprarBtn" type="button" title="Añadir al carrito" class="btn btn-dark mx-0 mb-3" @click="addProduct(producto.img, producto.nombre, producto.stock, precioConDescuento(producto.precio,producto.descuento))">Añadir <i class="fa fa-shopping-cart" aria-hidden="true"/></button>
            </div>
        </div>    
          
        <!-- Subcontenedor con la información  -->
        <div id="infoDiv" class="col-12 col-md-7">
            <!-- Título  -->
            <div class="d-flex mb-2">
                <h4 id="nombre" class="text-left my-5" contenteditable="false" title="Nombre">{{producto.nombre}}</h4>
                <div v-if="root" class="d-flex align-items-center mx-2">
                    <i id="editNombre" @click="editProduct('nombre','editNombre')" class="fa fa-pencil-square-o default mx-1" aria-hidden="true"></i>
                    <i id="saveNombre" @click="updateProduct('nombre','saveNombre')" class="fa fa-floppy-o default mx-1" aria-hidden="true"></i>
                </div>
            </div>            
            <!-- Datos  -->
            <div id="datosDiv" class="col-12 p-0"> 
                <!-- Descripción   -->
                <div class="d-flex mb-2">
                    <h5 class="text-left m-0">Descripción</h5>
                    <div v-if="root" class="d-flex align-items-center mx-2">
                        <i id="editDesc" @click="editProduct('desc','editDesc')" class="fa fa-pencil-square-o default mx-1" aria-hidden="true"></i>
                        <i id="saveDesc" @click="updateProduct('desc','saveDesc')" class="fa fa-floppy-o default mx-1" aria-hidden="true"></i>
                    </div>
                </div>                
                <p id="desc" class="text-left" contenteditable="false" title="Descripción">{{producto.descripcion}}</p>  
                <!-- Capacidad  -->
                <div class="d-flex mb-2">
                    <h5 class="text-left m-0">Cantidad</h5>
                    <div v-if="root" class="d-flex align-items-center mx-2">
                        <i id="editCan" @click="editProduct('can','editCan')" class="fa fa-pencil-square-o default mx-1" aria-hidden="true"></i>
                        <i id="saveCan" @click="updateProduct('can','saveCan')" class="fa fa-floppy-o default mx-1" aria-hidden="true"></i>
                    </div>
                </div>          
                <p id="can" class="text-left" contenteditable="false" title="Cantidad">{{producto.cantidad}}</p>
                <!-- Categoría  -->
                <div v-if="producto.categoria" class="d-flex mb-2">
                    <h5 class="text-left m-0">Categoría</h5>
                    <div v-if="root" class="d-flex align-items-center mx-2">
                        <i id="editCat" @click="editProduct('cat','editCat')" class="fa fa-pencil-square-o default mx-1" aria-hidden="true"></i>
                        <i id="saveCat" @click="updateProduct('cat','saveCat')" class="fa fa-floppy-o default mx-1" aria-hidden="true"></i>
                    </div>
                </div>  
                <p v-if="producto.categoria" id="cat" class="text-left" contenteditable="false" title="Categoría">{{producto.categoria}}</p>
                <!-- Ingredientes -->
                <div v-if="producto.ingredientes" class="d-flex mb-2">
                    <h5 class="text-left m-0">Ingredientes</h5>
                    <div v-if="root" class="d-flex align-items-center mx-2">
                        <i id="editIng" @click="editProduct('ing','editIng')" class="fa fa-pencil-square-o default mx-1" aria-hidden="true"></i>
                        <i id="saveIng" @click="updateProduct('ing','saveIng')" class="fa fa-floppy-o default mx-1" aria-hidden="true"></i>
                    </div>
                </div>  
                <p v-if="producto.ingredientes" id="ing" class="text-left" contenteditable="false" title="Ingredientes">{{producto.ingredientes}}</p>
                <!-- Valoración  -->
                <div class="d-flex mb-2">
                    <h5 class="text-left m-0">Valoración</h5>
                    <div v-if="root" class="d-flex align-items-center mx-2">
                        <i id="editVal" @click="editProduct('val','editVal')" class="fa fa-pencil-square-o default mx-1" aria-hidden="true"></i>
                        <i id="saveVal" @click="updateProduct('val','saveVal')" class="fa fa-floppy-o default mx-1" aria-hidden="true"></i>
                    </div>
                </div>  
                <p id="val" class="text-left" contenteditable="false" title="Valoración">{{producto.valoracion}}</p>
                <button v-if="root" class="btn btn-outline-dark" @click="deleteProduct" alt="Borrar producto">Borrar producto</button>
            </div>
        </div>

        <!-- Comentarios -->
        <div v-if="user" class="col-12 d-flex justify-content-center mt-3 p-0">
            <div class="form-group col-11 p-0 d-flex flex-column align-items-center">
                <h5 class="text-left col-12 col-md-8" for="newComment">Comentarios</h5>
                <textarea class="form-control col-12  col-md-8" title="Nuevo comentario" placeholder="Escriba aquí su comentario..." id="newComment" rows="5" v-on:keyup.enter="addComment" style="resize:none;"></textarea>
                <div class="comentarioDiv my-2 mt-3 d-flex flex-column text-left col-12 col-md-8" title="Comentario" v-for="comentario in arrayComentarios" v-bind:key="comentario.id">
                    <div class="mb-2" style="font-size:.9rem"><img :src="comentario.img" alt="" style="border-radius:2rem;width:2rem;"> {{comentario.usuario}}</div>
                    <div class="comentario pl-3 pt-1 pb-5">
                        {{comentario.comentario}}
                    </div>
                </div>
              </div>
          </div>
      </div>

      <!-- Contenedor pie de página -->
      <Footer v-if="!root"/>
  </div>
</template>

<script>
// Importe componente Header
import Header from "../Header/Header"

// Importe componente Header administrador
import HeaderAdmin from "../HeaderAdmin/HeaderAdmin"

// Importe loader
import CubeSpin from '../../../node_modules/vue-loading-spinner/src/components/Circle'

// Importe componente Footer
import Footer from "../Footer/Footer"

// Importe base de de datos
import { db } from "../../db";

// Importe JQuery y declaración
const $ = require('jquery');
window.$ = $;

export default {
  name: 'Detalles',
  components:{
    Header,
    HeaderAdmin,
    CubeSpin,
    Footer
  },
  data (){
    return {
      producto:{},
      user: null,
      root: null,
      loading: true,
      arrayComentarios:[]
    }
  },
  mounted(){
    // Comprueba si hay usuario activo
    this.checkUser();
    // Obtiene el producto
    this.getProduct();

    // Se guarda en una variable la url de la página
    const url = (/^(\w+):\/\/([^]+)/g.exec(document.URL)).toString();
    // Se separa el string con el separador indicado ('/') 
    const id = url.split('/')[8];

    // Valor del div comentarios
    const comment = $('#newComment').val();
    // Email del usuario
    const user = localStorage.getItem('user');
    // URL de imagen
    let img="";

    // Si hay imagen en localStorage
    if(localStorage.getItem('img')){
      // Se asigna la URL
      img = localStorage.getItem('img');
    // Si no
    }else{
      // Imagen por defecto
      img = "https://www.nicepng.com/png/detail/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png";
    }

    // Consulta a la colección arraySuplementos
    const docRef = db.collection("arraySuplementos").doc(id);
      docRef.get().then((doc) => {
        // Si el documento en la base de datos existe
        if (doc.exists) {
          // Si tiene comentarios
          if(doc.data().comentarios){
              this.arrayComentarios.push({comentario: comment, usuario: user, img: img});
              this.arrayComentarios = doc.data().comentarios;
          }
        // Si no existe el id en la colección arraySuplementos, pertenece a la colecciñon arrayAlimentos
        }else{
          const docRef = db.collection("arrayAlimentos").doc(id);
          docRef.get().then((doc) => {
              if(doc.data().comentarios){
                this.arrayComentarios.push({comentario: comment, usuario: user, img: img});
                this.arrayComentarios = doc.data().comentarios;
              }
          });
        }
      });
  },
  methods:{
    /**
     *  Obtiene el id del producto de la URL y realiza la consulta a la base de datos para obtener los campos con la información
     * 
     *  @author Jesús González 
    */
    getProduct: function(){
      // Se guarda en una variable la url de la página
      const url = document.URL.toString();
      // Se separa el string con el separador indicado ('/') 
      const id = url.split('/')[5];
      // Consulta base de datos
      const docRef = db.collection("arraySuplementos").doc(id);
      docRef.get().then((doc) => {
        // Si el documento en la base de datos existe
        if (doc.exists) {
            // Se guarda los datos del resultado de la consulta en una variable
            this.producto = doc.data();
            this.loading=false;
        // Si no existe
        } else {
          // Intenta buscar en el array Alimentos
          try{
              const docRef = db.collection("arrayAlimentos").doc(id);
              docRef.get().then((doc) => {
                // Si el documento en la base de datos existe
                if (doc.exists) {
                    // Se guarda los datos del resultado de la consulta en una variable
                    this.producto = doc.data();
                    this.loading=false;
                // Si no existe
                } else {
                  // Se informa con un mensaje de que el producto no existe y devuelve al Inicio
                  this.$router.push({name:'Home'});
                  this.$notify({
                    title: "ERROR: El ID del producto no existe",
                    type:"error"
                  });
                }
              })
          // Si no se encuentra en el array Alimentos -> El producto no existe
          }catch(e){
              // Se informa con un mensaje de que el producto no existe y devuelve al Inicio
              this.$router.push({name:'Home'});
              this.$notify({
                title: "ERROR: El ID del producto no existe",
                type:"error"
              });
          }
        }
      })
    },


    /**
     *  Comprueba si hay un usuario con sesión iniciada
     * 
     *  @author Jesús González 
    */
    checkUser: function(){
      // Si existe usuario en el localStorage
      if(localStorage.getItem('user')){
          // Se guarda el email del usuario en la variable user
          this.user = localStorage.getItem('user');
          // Si el email del usuario pertenece al root
          if(this.user == "administrador@admin.com"){
              // Se asigna el valor de user a root
              this.root = this.user;
              // La variable user se vuelve null
              this.user = null;
          }
      // Si no hay usuario en localStorage, no hay nadie con sesión iniciada
      }else{
          // La variable user se torna null
          this.user = null;
          // La variable root se torna null
          this.root = null;
      }
    },


    /**
     *  Retorna el precio con descuento del producto 
     * 
     *  @param {Number} precio Precio del producto
     *  @param {Number} descuento Descuento del producto
     * 
     *  @author Jesús González 
    */
    precioConDescuento: function (precio, descuento) {
      // Retorna el precio del producto con el descuento aplicado y limitado a un decimal
      return (precio-(precio*descuento/100)).toFixed(1);
    },


    /**
     *  Añade al carrito el elemento y notifica
     * 
     *  @param {String} img Enlace de la imagen del producto
     *  @param {String} nombre Nombre del producto
     *  @param {Number} stock Cantidad disponible del producto
     *  @param {Number} precio Precio del producto
     * 
     *  @author Jesús González 
    */
    addProduct: function (img, nombre, stock, precio) {
      // Se guarda en una variable la url de la página
      const url = document.URL.toString();
      // Se separa el string con el separador indicado ('/') 
      const id = url.split('/')[5];
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
     * Alterna la propiedad editable de los campos y las clases de los botones al editar
     * 
     * @param {String} field Identificador del campo a editar
     * @param {String} field Identificador del botón
     * 
     * @author Jesús González
     */
    editProduct: function(field,boton){
      // Si el campo no es editable
      if ($(`#${field}`).attr("contentEditable") == "false"){
          // Se cambia a editable
          $(`#${field}`).attr('contenteditable','true');
          // Se aplica al botón de editar la clase
          $(`#${boton}`).addClass('rosa');
      //Si no
      }else{
          // Se cambia a no editable
          $(`#${field}`).attr('contenteditable','false');
          // Se borra al botón de editar la clase
          $(`#${boton}`).removeClass('rosa');
          // Se aplica al botón de editar la clase
          $(`#${boton}`).addClass('default');
      }
    },

    /**
     * Borrar producto
     * 
     * @author Jesús González
     */
    deleteProduct(){
        // Ventana de confirmación para borrar del carrito el prodcuto
        this.$confirm({
            title: 'Eliminar',
            message: `¿Seguro que desea eliminar el producto?`,
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
                  // Se guarda en una variable la url de la página
                  const url = document.URL.toString();
                  // Se separa el string con el separador indicado ('/') 
                  const id = url.split('/')[5];
                  // Consulta base de datos
                  const docRef = db.collection("arraySuplementos").doc(id);
                  docRef.get().then((doc) => {
                    // Si el documento en la base de datos existe
                    if (doc.exists) {
                        // Borra suplemento
                        docRef.delete();
                        this.$notify({
                          title: "Producto "+doc.data().nombre+" eliminado correctamente",
                          type: 'success'
                        });
                        this.$router.push({name:'Suplementacion'});
                    // Si no existe
                    } else {
                      // Intenta buscar en el array Alimentos
                      try{
                          const docRef = db.collection("arrayAlimentos").doc(id);
                          docRef.get().then((doc) => {
                            // Si el documento en la base de datos existe
                            if (doc.exists) {
                              // Borra alimento
                                docRef.delete();
                                this.$notify({
                                  title: "Producto "+doc.data().nombre+" eliminado correctamente",
                                  type: 'success'
                                });
                                this.$router.push({name:'Alimentacion'});
                            }
                          })
                      // Si no se encuentra en el array Alimentos -> El producto no existe
                      }catch(e){
                          // Se informa con un mensaje de que el producto no existe y devuelve al Inicio
                          this.$router.push({name:'Home'});
                          this.$notify({
                            title: "ERROR: El ID del producto no existe",
                            type:"error"
                          });
                      }
                    }
                  })
              }
            }
        })
    },


    /**
     * Añade un nuevo comentario de usuario al producto
     * 
     * @author Jesús González
     */
    addComment:function(){
      // Se guarda en una variable la url de la página
      const url = (/^(\w+):\/\/([^]+)/g.exec(document.URL)).toString();
      // Se separa el string con el separador indicado ('/') 
      const id = url.split('/')[8];

      // Valor del textarea
      const comment = $('#newComment').val();
      // Email del usuario
      const user = localStorage.getItem('user');
      // Imagen de perfil usuario
      let img="";

      // Si existe el objeto img en localStorage
      if(localStorage.getItem('img')){
        // Se guarda en la variable img
        img = localStorage.getItem('img');
      // Si no
      }else{
        // Se asigna una imagen por defecto
        img = "https://www.nicepng.com/png/detail/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png";
      }

      // Se busca por id el producto en la colección de suplementos
      const docRef = db.collection("arraySuplementos").doc(id);
        docRef.get().then((doc) => {
          // Si el documento en la base de datos existe
          if (doc.exists) {
            // Si el producto tiene comentarios
            if(doc.data().comentarios){
                // Se guardan en el array arrayComentarios
                this.arrayComentarios = doc.data().comentarios;
            // Si no
            }else{
                // arrayComentarios se vacía
                this.arrayComentarios = [];
            }

            // Se añade al arrayComentarios el nuevo comentario
            this.arrayComentarios.push({comentario: comment, usuario: user, img: img});

            // Se actualiza la colección con todos los comentarios
            db.collection('arraySuplementos').doc(id).update({
              comentarios: this.arrayComentarios,
            });
          // Si no existe el id, pertenecera a la colección de alimentos
          }else{
            // Se busca por id el producto en la colección de alimentos
            const docRef = db.collection("arrayAlimentos").doc(id);
            docRef.get().then((doc) => {
              // Si el producto tiene comentarios
              if(doc.data().comentarios){
                // Se guardan en el array arrayComentarios
                this.arrayComentarios = doc.data().comentarios;
               // Si no
              }else{
                // arrayComentarios se vacía
                this.arrayComentarios = [];
              }

              // Se añade al arrayComentarios el nuevo comentario
              this.arrayComentarios.push({comentario: comment, usuario: user, img: img});

              // Se actualiza la colección con todos los comentarios
              db.collection("arrayAlimentos").doc(id).update({
                comentarios: this.arrayComentarios,
              })
            });
          }
        });

      // Se limpia el textarea de añadir comentarios
      $('#newComment').val("");
    },


    /**
     * Actualiza en la base de datos las propiedades del producto
     * 
     * @param {String} field Id del campo a editar
     * @param  {String} boton  Id del botón clickado
     * 
     * @author Jesús González
     */
    updateProduct: function(field,boton){
      // Se guarda en una variable la url de la página
      const url = (/^(\w+):\/\/([^]+)/g.exec(document.URL)).toString();
      // Se separa el string con el separador indicado ('/') 
      const id = url.split('/')[8];
      // Descripción en la vista
      const valor = $(`#${field}`).text();
  
      // Se añade la clase verde, que aplica un estilo diferente al botón
      $(`#${boton}`).addClass("verde");

      // Animación background-color verde botón guardar
      setInterval(function(){ 
        $(`#${boton}`).removeClass("verde"); 
        $(`#${boton}`).addClass("default"); 
      }, 500);

      const docRef = db.collection("arraySuplementos").doc(id);
      docRef.get().then((doc) => {
        // Si el documento en la base de datos existe
        if (doc.exists) {
            switch(field){
                case 'desc':
                  // Update
                  db.collection("arraySuplementos").doc(id).update({descripcion: valor});
                  break;
                case 'can':
                  // Update
                    db.collection("arraySuplementos").doc(id).update({cantidad: valor});
                  break;
                case 'cat':
                  // Update
                  db.collection("arraySuplementos").doc(id).update({categoria: valor});
                  break;
                case 'val':
                  // Update
                  db.collection("arraySuplementos").doc(id).update({valoracion: valor});
                  break;
                case 'nombre':
                  // Update
                  db.collection("arraySuplementos").doc(id).update({nombre: valor});
                  break;
                case 'img':
                  // Update
                  db.collection("arraySuplementos").doc(id).update({img: valor});
                  break;
                case 'precioAntes':
                  // Update
                  db.collection("arraySuplementos").doc(id).update({precio: valor});
                  break;
                case 'precio':
                  // Update
                  db.collection("arraySuplementos").doc(id).update({precio: valor});
                  break;
                case 'descuento':
                  // Update
                  db.collection("arraySuplementos").doc(id).update({descuento: valor});
                  break;
                case 'stock':
                  // Update
                  db.collection("arraySuplementos").doc(id).update({stock: valor});
                  break;
                default:
                  this.$notify({title:"No se ha podido actualizar el valor", type:"warn"})
                  break;
              }
        // Si no existe
        } else {  
            switch(field){
                case 'desc':
                  // Update
                  db.collection("arrayAlimentos").doc(id).update({descripcion: valor});
                  break;
                case 'can':
                  // Update
                    db.collection("arrayAlimentos").doc(id).update({cantidad: valor});
                  break;
                case 'ing':
                  // Update
                  db.collection("arrayAlimentos").doc(id).update({ingredientes: valor});
                  break;
                case 'val':
                  // Update
                  db.collection("arrayAlimentos").doc(id).update({valoracion: valor});
                  break;
                case 'nombre':
                  // Update
                  db.collection("arrayAlimentos").doc(id).update({nombre: valor});
                  break;
                case 'img':
                  // Update
                  db.collection("arrayAlimentos").doc(id).update({img: valor});
                  break;
                case 'precioAntes':
                  // Update
                  db.collection("arrayAlimentos").doc(id).update({precio: valor});
                  break;
                case 'precio':
                  // Update
                  db.collection("arrayAlimentos").doc(id).update({precio: valor});
                  break;
                case 'descuento':
                  // Update
                  db.collection("arrayAlimentos").doc(id).update({descuento: valor});
                  break;
                case 'stock':
                  // Update
                  db.collection("arrayAlimentos").doc(id).update({stock: valor});
                  break;
                default:
                  this.$notify({title:"No se ha podido actualizar el valor",type:"warn"})
                  break;
              }
          }
      })
    }, 
  },
  computed:{
    // Retorna el valor del objeto img de localStorage
    imgUser: function(){
      return localStorage.getItem('img');
    },
  }
}
</script>

<style scoped lang="scss">
  @import "../../scss/_detalles.scss";
</style>
