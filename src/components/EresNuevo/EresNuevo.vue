<template>
  <div class="eres-nuevo">
      <!-- Header -->
      <Header/>

      <!-- Contenedor principal -->
      <div class="main">
          <div class="d-flex flex-wrap justify-content-center">
              <div class="col-9 py-5">
                  <h2>¡Bienvenido a MyFit!</h2>
                  <p>Echa un vistazo a continuación para descubrir cómo podemos satisfacer tus ambiciones y unirte a nuestra familia.</p>
              </div>
              <div class="col-12 py-5">
                  <h4>¿No estás seguro de por dónde empezar?</h4>
                  <p>Aquí hay algunos productos recomendados.</p>
                  <!-- Lista de productos -->
                  <ProductsList :Products="arraySuplementos"/>
              </div>
          </div>
      </div>

      <!-- Footer -->
      <Footer/>
  </div>
</template>

<script>
// Se importa el componente
import Header from '../Header/Header'
// Se importa el componente que maqueta los productos
import ProductsList from '../ProductsList/ProductsList'
// Se importa el componente Footer
import Footer from '../Footer/Footer'
// Se importa la base de datos
import { db } from "../../db";

export default {
  name: 'EresNuevo',
  components:{
    Header,
    ProductsList,
    Footer
  },
  data () {
    return {
      arraySuplementos: [],
    }
  },
  firestore: {
    // Suplementos con mayor precio limitados a 6
    arraySuplementos: db.collection("arraySuplementos")
    .orderBy("precio", "desc")
    .limit(6)
  }
}
</script>

<style scoped></style>
