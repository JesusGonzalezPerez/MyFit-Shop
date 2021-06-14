<template>
    <!-- <div v-if="loading">
      <p>pepe</p>
    </div> -->
    <div id="app">
        <!-- Cabecera -->
        <Header v-if="!root"/>
        <!-- Cabecera Admin -->
        <HeaderAdmin v-else/>

        <!-- Si no hay contenido en arraySuplementos -->
        <div v-if="arraySuplementos.length==0" id="loader" class="d-flex justify-content-center align-items-center" style="height:70vh;width:100vw">
              <cube-spin></cube-spin>
        </div>

        <!-- Si hay... -->
        <div v-else class="main">
            <!-- Carrusel -->
            <Carousel/>

            <!-- Sección Products  -->
            <img class="" src="../../../img/supHome.png" alt="" width="250rem" style="padding:1rem">
            <ProductsList :Products="arraySuplementos"/>

            <!-- Sección mejores valorados  -->
            <img class="bestVals" src="../../../img/bestSupHome.png" alt="" width="370rem" style="padding:1rem">
            <ProductsList :Products="arraySupMejoresVals"/>

            <!-- Sección Proteinas -->
            <img class="" src="../../../img/aliHome.png" alt="" width="200rem" style="padding:1rem">
            <ProductsList :Products="arrayAlimentos"/>

            <!-- Sección Creatinas  -->
            <img class="bestVals" src="../../../img/bestAliHome.png" width="370rem" alt="" style="padding:1rem">
            <ProductsList :Products="arrayAliMejoresVals"/>
        </div>

        <!-- Footer  -->
        <Footer v-if="!root"/>
    </div> 
</template>

<script>

// Importe componente Header
import Header from '../Header/Header';

// Se importa componente Cabecera
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin';

// Importe componente Carrusel
import Carousel from '../Carousel/Carousel';

// Importe componente 
import ProductsList from '../ProductsList/ProductsList';

// Importe componente Footer
import Footer from '../Footer/Footer';

// Importe loader
import CubeSpin from '../../../node_modules/vue-loading-spinner/src/components/Circle';

// Importe base de de datos
import { db } from "../../db";


export default {
  name: "Home",
  components:{
    Header,
    HeaderAdmin,
    Carousel,
    ProductsList,
    Footer,
    CubeSpin
  },
  data() {
    return {
      // Array suplementos 
      arraySuplementos: [],
      // Array suplementos mejores valorados
      arraySupMejoresVals: [],
      // Array alimentos
      arrayAlimentos: [],
      // Array alimentos mejores valorados
      arrayAliMejoresVals: [],
      loading:true,
      user:null,
      root:null,
    };
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
  firestore: {
    // Guarda en el arraySuplementos los resultados de la consulta
    arraySuplementos: db.collection("arraySuplementos")
    .orderBy("nombre")
    .limit(8),
    // Guarda en el arraySupMejoresVals los resultados de la consulta
    arraySupMejoresVals: db.collection("arraySuplementos")
    .orderBy("valoracion", "desc")
    .limit(8),
    // Guarda en el arrayAlimentos los resultados de la consulta
    arrayAlimentos: db.collection("arrayAlimentos")
    .orderBy("nombre") 
    .limit(8),
    // Guarda en el arrayAliMejoresVals los resultados de la consulta
    arrayAliMejoresVals: db.collection("arrayAlimentos")
    .orderBy("valoracion", "desc")
    .limit(8),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  border: 0;
  padding: 0;
  margin: 0;
}
.main{
  min-height: 70vh;
  background-color: rgb(240, 240, 240);
}
.w-md-50{
  width: 50% !important;
}
</style>
