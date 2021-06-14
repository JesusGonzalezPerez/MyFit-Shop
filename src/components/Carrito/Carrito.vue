<template>
  <div class="carrito">
    <!-- Cabecera -->
    <Header/>
    <!-- Vista de productos en el carrito  -->
    <TablaCarrito :carrito="arrayCarrito"/>
    <!-- Footer -->
    <Footer/>
  </div>
</template>

<script>

// Se importa componente Cabecera
import Header from '../Header/Header'
// Se importa componente lista de productos del carrito
import TablaCarrito from '../TablaCarrito/TablaCarrito'
// Se importa componente Footer
import Footer from '../Footer/Footer'
// Se importa base de datos
import { db } from "../../db";

export default {
  name: 'Carrito',
  components:{
    Header,
    TablaCarrito,
    Footer
  },
  data () {
    return {
      user: null,
      arrayCarrito:[]
    }
  },
  firestore: {
    // Array que recibe todos los productos del carrito que tiene el usuario
    carrito: db.collection("arrayCarrito").where("email", "==", localStorage.getItem('user')),
  },
  created() {
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
        // Si el usuario es admin
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
}
</script>

<style scoped>
</style>
