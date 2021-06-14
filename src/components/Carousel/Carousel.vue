<template>
    <!-- Carousel  -->
    <div v-if="!root" id="carouselId" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carouselId" data-slide-to="0" class="active"></li>
            <li data-target="#carouselId" data-slide-to="1"></li>
            <li data-target="#carouselId" data-slide-to="2"></li>
            <li data-target="#carouselId" data-slide-to="3"></li>
        </ol>
        <!-- Imágenes -->
        <div class="carousel-inner h-xs-20" role="listbox">
            <div class="carousel-item active">
                <img data-src="holder.js/900x500/auto/#777:#555/text:First slide" src="https://www.bodynutrition.biz/img/m/allmax-nutrition.webp" alt="Plant protein bites">
            </div>
            <div class="carousel-item">
                <img data-src="holder.js/900x500/auto/#666:#444/text:Second slide" src="http://tienda.needsportnutricion.com/modules/tvcmsslider/views/img/5eb94003fcbb2474a135_banner2-1920x650.png" alt="Kit preWorkout">
            </div>
            <div class="carousel-item">
                <img data-src="holder.js/900x500/auto/#666:#444/text:Third slide" src="https://www.jcmusclebuilding.com/wp-content/uploads/2014/12/optimum-nutrition-top-banner.png" alt="Firness slogan">
            </div>
            <div class="carousel-item">
                <img data-src="holder.js/900x500/auto/#666:#444/text:Third slide" src="https://i.pinimg.com/originals/36/24/0d/36240d7a8ad3ceeb5cf435cb462bbd75.jpg" alt="Creatine">
            </div>
        </div>
        <!-- Imagen previa  -->
        <a class="carousel-control-prev" href="#carouselId" role="button" data-slide="prev" id="botonCarousel">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <!-- Siguiente imagen -->
        <a class="carousel-control-next" href="#carouselId" role="button" data-slide="next" id="botonCarousel">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</template>

<script>

export default {
    name: 'Carousel',
    data () {
        return {
            user: null,
            root: null
        }
    },
    created() {
        /**
         *  Comprueba si hay un usuario con sesión iniciada y guarda el objeto usuario en una variable
         * 
         *  @author Jesús González 
        */
        // Si existe en el localStorage el elemento usuario
        if(localStorage.getItem('user')){
            // Se guarda el email del usuario del localStorage en la variable user
            this.user = localStorage.getItem('user');
            if(this.user == "administrador@admin.com"){
                // Asigna el objeto usuario a la variable root
                this.root = this.user;
            }
        // Si no hay elemento user en el localStorage no hay usuario logueado
        }else{
            // El valor de user se torna null
            this.user = null;
            this.root = null;
        }
    },
}
</script>

<style scoped lang="scss">
    // Se importan los estilos del componente
    @import "../../scss/_carousel.scss"
</style>
