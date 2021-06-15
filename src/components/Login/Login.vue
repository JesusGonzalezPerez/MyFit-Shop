<template>
    <div>
        <!-- Header -->
        <HeaderMinimal/>

        <!-- Contenedor main con todo el contenido de Login -->
        <div class="login col-12 d-flex flex-wrap">
              <!-- Subcontenedor Login -->
              <div id="login" class="col-xs-12 col-sm- 7 col-md-5">
                    <router-link to="/"><a  href="" title="Volver al home"><i class="fa fa-arrow-left" style="color:black" aria-hidden="true"></i></a></router-link>
                    <h4 class="text-center">Acceso para Clientes</h4>
                    <!-- Input email -->
                    <div class="field">
                        <label class="label ml-4">Email</label>
                        <div class="control text-center">
                            <input class="input" type="email" placeholder="Email..." v-model="email">
                        </div>
                    </div>

                    <!-- Input contraseña -->
                    <div class="field">
                        <label class="label ml-4">Contraseña</label>
                        <div class="control text-center">
                            <input class="input" type="password" placeholder="Contraseña..." v-model="contraseña" v-on:keyup.enter="iniciaSesion">
                        </div>
                    </div>

                    <!-- Botón iniciar sesión -->
                    <div class="btn-login">
                        <button class="btn btn-secondary" @click="iniciaSesion" title="Iniciar sesión">Iniciar sesión </button>
                    </div>

                    <!-- Otras opciones de login -->
                    <div class="btn-social-login">
                        <p class="ml-4">o identificarse con</p>
                        <button id="fbButton" class="btn btn-outline-light" @click="iniciaSesionFB" title="Iniciar sesión Facebook"><i class="fa fa-facebook-square" aria-hidden="true"></i> Facebook</button>
                        <button id="gButton" class="btn btn-outline-light" @click="iniciaSesionG" title="Iniciar sesión Google"><i class="fa fa-google-plus-square" aria-hidden="true"></i> Google</button>
                        <button id="gitButton" class="btn btn-outline-light" @click="iniciaSesionGit" title="Iniciar sesión GitHub"><i class="fa fa-github-square" aria-hidden="true"></i> GitHub</button>
                    </div>
              </div>

              <!-- Subcontendor Registarse -->
              <div id="signUp" class="col-xs-12 col-sm-6 col-md-4">
                  <h3>¿Eres nuevo en MyFit?</h3>
                  <p>Regístrate en MyFit para tener acceso a los suplementos y alimentos más económicos de España y para disfrutar de una serie de beneficios exclusivos.</p>
                  <router-link  to="/Registrar"><button class="btn btn-secondary" title="Registrarse"> Registrarse</button></router-link>
              </div>
        </div> 
    </div>
</template>



<script>
// Se importa firebase
import firebase from "firebase/app";
// Se importa componenten header minimalista
import HeaderMinimal from "../HeaderMinimal/HeaderMinimal"

export default {
  name: "Login",
  components:{
    HeaderMinimal
  },
  data() {
    return {
      email: "",
      contraseña: "",
    };
  },
  methods: {
    /**
     * Inicia sesión con un correo previamente registrado, en caso de no existir el usuario o equivocarte al introducir la contraseña muestra un mensaje de error
     * 
     * @author Jesús González
     */
    iniciaSesion: function () {
      // Comprueba con firebase que existe un usuario que coincida con los datos introducidos
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.contraseña)
        .then(() => {
          // Si el email pertenece al admin
          if(this.email != "administrador@admin.com"){
            localStorage.setItem('user', this.email);
            localStorage.setItem('img', "https://www.nicepng.com/png/detail/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png");
            this.$notify({title: 'Inicio de Sesión', text: 'Se ha iniciado sesión con email: '+this.email});
            this.$router.push({ name: "Home" });  
          // Si pertenece a un usuario estándar
          }else{
            localStorage.setItem('user', this.email);
            this.$notify({title: 'Inicio de Sesión', text: 'Se ha iniciado sesión como Administrador'});
            this.$router.push({ name: "Home" });  
          }
        })
        // En caso de no poder identificar al usuario se muestra mensaje de error
        .catch(() => {
          this.$notify({title: 'Inicio de Sesión', text: 'Email o contraseña incorrectos.', type:'warn'})
        });
    },
    //Inicia sesión con una cuenta de Facebook
    iniciaSesionFB: function(){
      // Variable con forma de login (Facebook)
      const provider = new firebase.auth.FacebookAuthProvider();
        // Firebase muestra una nueva ventana con la forma de log (Facebook)
        firebase.auth().signInWithPopup(provider)
        .then(() =>{
          firebase.auth().onAuthStateChanged((user) => {
            // Si el usuario existe y es correcto
            if(user){
              // Se guarda su email en localStorage
              localStorage.setItem('user', user.email);
              localStorage.setItem('img', user.photoURL);
            }
          });
          // Se notifica que la autenticación ha sido exitosa
          this.$notify({title: 'Inicio de Sesión',text: 'Se ha iniciado sesión con Facebook.'});
          // Volvemos al Inicio
          this.$router.push({name:'Home'});
        })
        // En caso de no poder identificar al usuario 
        .catch(function(){
          // Se muestra mensaje de error
          this.$notify({text: 'No se ha podido iniciar sesión con Facebook.', type:'warn'})
        })
    },
    //Inicia sesión con una cuenta de Google
    iniciaSesionG: function(){
      // Variable con forma de login (Google)
      const provider = new firebase.auth.GoogleAuthProvider();
        // Firebase muestra una nueva ventana con la forma de log (Google)
        firebase.auth().signInWithPopup(provider)
        .then(() =>{
          firebase.auth().onAuthStateChanged((user) => {
            // Si el usuario existe y es correcto
            if(user){
              // Se guarda su email en localStorage
              localStorage.setItem('user', user.email);
              localStorage.setItem('img', user.photoURL);
            }
          });
          // Se notifica que la autenticación ha sido exitosa
          this.$notify({title: 'Inicio de Sesión', text: 'Se ha iniciado sesión con Google.'});
          // Volvemos al Inicio
          this.$router.push({name:'Home'});
        })
        // En caso de no poder identificar al usuario 
        .catch(function(){
          // Se muestra mensaje de error
          this.$notify({text: 'No se ha podido iniciar sesión con Google.', type:'warn'})
        })
    },
    //Inicia sesión con una cuenta de GitHub
    iniciaSesionGit: function(){
      // Variable con forma de login (GitHub)
      const provider = new firebase.auth.GithubAuthProvider();
        // Firebase muestra una nueva ventana con la forma de log (GitHub)
        firebase.auth().signInWithPopup(provider)
        .then(() =>{
          firebase.auth().onAuthStateChanged((user) => {
            // Si el usuario existe y es correcto
            if(user){
              // Se guarda su email en localStorage
              localStorage.setItem('user', user.email);
              localStorage.setItem('img', user.photoURL);
            }
          });
          // Se notifica que la autenticación ha sido exitosa
          this.$notify({title: 'Inicio de Sesión',text: 'Se ha iniciado sesión con GitHub.'});
          // Volvemos al Inicio
          this.$router.push({name:'Home'});
        })
        // En caso de no poder identificar al usuario 
        .catch(function(){
          // Se muestra mensaje de error
          this.$notify({text: 'No se ha podido iniciar sesión con GitHub.', type:'warn'})
        })
    },
  }
};

</script>

<style scope lang="scss">
  @import "../../scss/_login.scss";
</style>
