<template>
  <div class="quienes-somos">
      <!-- Cabecera -->
      <Header/>
      <!-- Contenido del componente -->
      <div class="main">
          <!-- Carousel -->
          <Carousel/>
          <!-- Información -->
          <div class="d-flex justify-content-center">
              <div class="col-10 col-sm-9 col-md-6 col-lg-4 py-5">
                  <h2>¿QUIÉNES SOMOS?</h2>
                  <p>MyFit es una empresa de comercializacion de productos. Ofrecemos productos de alta calidad y a precios razonables.
                    Entregamos donde quiera que esté, cuando quiera.
                    Respiramos tecnología, bebemos diseño y nos alimentamos de nuestra voluntad de superarnos distribuyendo los mejores productos del mundo.
                    Confía en nosotros. Alimentaremos tu cuerpo y mente con todo lo necesario para superarte.</p>
                    <p>Si eres nuevo y quieres cambiar tu alimenatación estás a tan solo un paso clickando <router-link to="/Registrar"><a title="Ir a registrarse">aquí</a></router-link>.</p>
              </div>
          </div>
      </div>
      <!-- Footer -->
      <Footer/>
  </div>
</template>

<script>
// Se importa el componente Header
import Header from '../Header/Header'
// Se importa el componente Carousel
import Carousel from '../Carousel/Carousel'
// Se importa el componente Footer
import Footer from '../Footer/Footer'


export default {
  name: 'QuienesSomos',
  components:{
    Header,
    Carousel,
    Footer
  },
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">
    @import "../../scss/_quienesSomos.scss";
</style>
