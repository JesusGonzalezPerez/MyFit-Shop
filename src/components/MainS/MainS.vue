<template>
    <div class="main">
        <!-- Cabecera -->
        <Header v-if="!root"/>
        <!-- Cabecera Admin -->
        <HeaderAdmin v-else/>

        <!-- Suplementacion -->
        <Suplementacion/>

        <!-- Contenedor pie de página -->
        <Footer v-if="!root"/>
    </div>
</template>

<script>

// Se importa el componente Suplementacion
import Suplementacion from "../Suplementacion/Suplementacion"
// Se importa el componente Header
import Header from "../Header/Header"
// Se importa el componente Header de admin
import HeaderAdmin from "../HeaderAdmin/HeaderAdmin"
// Se importa el componente Footer
import Footer from "../Footer/Footer"

export default {
  name: 'Main',
  components:{
    Header,
    HeaderAdmin,
    Suplementacion,
    Footer
  },
  data () {
    return {
      user: null,
      root: null,
    }
  },
  created(){
    /**
     * Comprueba que exista un usuario activo
     * 
     * @author Jesús González
     */
    if(localStorage.getItem('user')){
        this.user = localStorage.getItem('user');
        if(this.user == "administrador@admin.com"){
            // Asigna el objeto usuario a la variable root
            this.root = this.user;
            // La variable user se intercambia a nula
            this.user = null;
        }
    }else{
        this.user = null;
        this.root = null;
    }
  },
}
</script>

<style scoped>
    .main{
        min-height: 100vh;
        background-color: rgb(240,240,240);
    }
</style>
