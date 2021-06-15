<template>
      <div class="registar">
          <!-- Header minimalista -->
          <HeaderMinimal/>

          <!-- Contenido principal del componente -->
          <div class="login d-flex">
              <div id="login" class="col-xs-12 col-sm-9 col-md-6 mb-4">             
                    <router-link to="/Login"><a  href="" title="Volver a iniciar sesión"><i class="fa fa-arrow-left" style="color:black" aria-hidden="true"></i></a></router-link>
                    <h4 class="text-center">Crea una cuenta con tu correo electrónico</h4>
                    <!-- Input email -->
                    <div class="field">
                        <label class="label ml-4">Email</label>
                        <div class="control text-center">
                            <input class="input" type="email" placeholder="Email..." v-model="email">
                        </div>
                    </div>
                    <!-- Input contraseña -->
                    <div class="field">
                        <label class="label ml-4">Contraseña (Min: 6 caracteres)</label>
                        <div class="control text-center">
                          <input class="input" id="pass1" type="password" placeholder="Contraseña..." v-model="contraseña">
                        </div>
                    </div>
                    <!-- Input repetir contraseña -->
                    <div class="field">
                        <label class="label ml-4">Repetir contraseña</label>
                        <div class="control text-center">
                            <input class="input" id="pass2" type="password" placeholder="Contraseña..." >
                        </div>
                    </div>
                    <!-- Checkbox Mostrar contraseñas -->
                    <div class="custom-control custom-checkbox d-flex justify-content-center align-items-center">
                        <input @click="showPasswords" class="custom-control-input mr-1" type="checkbox" value="" id="flexCheckChecked">
                        <label class="custom-control-label m-0" for="flexCheckChecked" title="Mostrar Contraseña">
                          Mostrar Contraseña
                        </label>
                    </div>
                    <!-- Botón registrar -->
                    <div id="divRegister" class="text-center mt-5">
                        <button class="btn btn-secondary" id="registrar" @click="registrar" title="Registrar">Registrar</button>
                    </div>
                    <p class="text-center mt-3">¿Tienes ya una cuenta registrada? <br> o quieres identificarte mediante una red social <br> <router-link to="/Login"><a href="" style="font-weight:bold;color:white;" title="Iniciar sesión">Inicia sesión</a></router-link></p>
              </div> 
          </div>
      </div> 
</template>

<script>
// Se importa firebase
import firebase from "firebase/app";
// Se importa el componenete header minimalista
import HeaderMinimal from "../HeaderMinimal/HeaderMinimal"
// Importamos JQuery
const $ = require('jquery')
// Lo declaramos globalmente
window.$ = $


export default {
  name: "Registrar",
  components:{
    HeaderMinimal
  },
  data() {
    return {
      email: "",
      contraseña: "",
    };
  },
  mounted(){
      /**
       * Comprueba si hay un usuario activo, para no poder entrar en registrar
       * 
       * @author Jesús González
       */
      if(localStorage.getItem("user")){
          this.$notify({title: 'Registrar', type: 'error', text: 'Actualmente hay una sesión de usuario abierta.'})
          this.$router.push({name:'Home'});
      }
  },
  methods: {
    /**
     * Registra un email 
     * 
     * @author Jesús González
     */
    registrar: function () {
        if($('#pass1').val() == $('#pass2').val()){
            // Firebase registra el usuario
            firebase.auth().createUserWithEmailAndPassword(this.email,this.contraseña)
            .then(() =>{
              // Se comprueba que las contraseña coinciden
              
                  // Notificación éxito al registrar
                  this.$notify({text: '¡Usuario registrado!', type:'success'})
                  // Se mueve al usuario al Login para que inicie sesión
                  this.$router.push({ name: "Login" });
            })
            // Si el usuario está registrado o no se han rellenado los campos
            .catch((error) => {
              // Se notifica que el usuario no ha podido ser registrado
              this.$notify({text: error, type:'warn'})
            });
        }else{
            // Notificación error
            this.$notify({text: "Las contraseñas deben coincidir", type:'error'})
        }
    },

    /**
     * Alterna el tipo del input entre password y text
     * 
     * @author Jesús González
     */
    showPasswords(){
      // Si los inputs son de tipo contraseña
      if($('#pass1').attr("type")=="password" && $('#pass2').attr("type")=="password"){
        // Se cambian a texto
        $('#pass1').attr("type","text");
        $('#pass2').attr("type","text");
      // Si no
      }else{
        // Se cambian a contraseña
        $('#pass1').attr("type","password");
        $('#pass2').attr("type","password");
      }
    }
  }
};
</script>

<style scoped lang="scss">
  @import "../../scss/_registrar.scss";
</style>
