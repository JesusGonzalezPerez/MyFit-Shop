<template>
    <!-- Footer  -->
    <nav id ="footer" class="navbar navbar-fixed-bottom col-12">
        <!-- Contenedor contacto  -->
        <div class="m-2" id="contactDiv">
            <p class="text-left mb-1">CONTACTO</p>
            <ul class="p-0 m-0">
                <li title="Correo">Correo: jesusgpeligros@gmail.com</li>
                <li title="Contacto">Contacto: 603236960</li>
                <li title="CopyRight">@CopyJesús</li>
            </ul>
        </div>

        <!-- Contenedor de ayuda e información al usuario  -->
        <div class="m-2" id="infoDiv">
            <p class="text-left mb-1">AYUDA E INFORMACIÓN</p>
            <ul class="p-0 m-0">
                <li><router-link to="/QuienesSomos"><a title="¿Quiénes somos?">Quiénes somos</a></router-link></li>
                <li><router-link to="/EresNuevo"><a title="¿Eres nuevo?">¿Eres nuevo en MyFit?</a></router-link></li>
            </ul>
        </div>
        
        <!-- Contenedor con las redes sociales del desarrollador  -->
        <div class="m-2" id="socialDiv"  style="padding-bottom:1.1rem">
            <p class="text-left mb-0 mr-3">CONTÁCTA CON NOSOTROS</p>
            <ul class="p-0 m-0 mr-3 d-flex justify-content-between">
                <li class="nav-item active">
                    <a target="_blank" class="nav-link" href="https://github.com/JesusGonzalezPerez" title="GitHub"><i class="fa fa-github-square fa-2x" aria-hidden="true"></i></a>
                </li>
                <li class="nav-item active">
                    <a target="_blank" class="nav-link" href="https://www.instagram.com/jesugonza3/?hl=hr" title="Instagram"><i class="fa fa-instagram fa-2x" aria-hidden="true"></i></a>
                </li>
                <li class="nav-item active">
                    <a target="_blank" class="nav-link" href="https://www.linkedin.com/in/jesús-gonzález-pérez-324a29205/" title="Linkedin"><i class="fa fa-linkedin-square fa-2x" aria-hidden="true"></i></a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>


export default {
    name: 'Footer',
    data () {
        return {}
    },
}
</script>

<style scoped lang="scss">
    @import "../../scss/_footer.scss"
</style>
