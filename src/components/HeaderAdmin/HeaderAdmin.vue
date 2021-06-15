<template>
    <div class="header-admin">
        <!-- Navbar 1 vista administrador  -->
        <div class="col-12 d-flex flex-wrap justify-content-between bg-dark" id="navbar2">
            <router-link to="/">
                <a class="navbar-brand col-xs-1 d-flex align-items-end" title="Home">
                    <img class="ml-2" src="../../../img/MyFit_logo2.png" width="300rem" height="130rem">
                </a>
            </router-link>
            <!-- Menú usuario -->
            <div id="menu" class="col-xs-12 col-md-5 d-sm-flex justify-content-center justify-content-md-end">
                <ul class="p-0 align-items-end">
                    <li v-if="!root">
                        <router-link to="/Login">
                            <a  href="" title="Iniciar sesión">Iniciar sesión</a>
                        </router-link>
                    </li>
                    <li v-if="!root"> 
                        <router-link to="/Registrar">
                            <a href="" title="Registrarse">Registrarse</a>
                        </router-link>
                    </li>
                    <li v-if="root">
                        <router-link to="/Root">
                            <i class="fa fa-unlock-alt" aria-hidden="true" title="Panel de administrador"></i>
                        </router-link>
                    </li>
                    <li v-if="root">
                        <div class="dropdown" title="Perfil Administrador">
                            <a class="btn dropdown-toggle p-0 px-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-user" aria-hidden="true"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-left p-0" id="dropdown" aria-labelledby="dropdownMenuButton">
                                <p class="dropdown-header p-2 m-0 text-center">{{correo}}</p>
                                <router-link to="/HistorialVentas">
                                    <a class="dropdown-item" title="Historial de venats"><i class="fa fa-bookmark" aria-hidden="true"></i> Historial de ventas</a>
                                </router-link>
                                <a @click="cerrarCesion" class="dropdown-item"  title="Cerrar sesión"><i class="fa fa-sign-out" aria-hidden="true"></i> Cerrar sesión</a>
                            </div>
                        </div>
                    </li> 
                    <vue-confirm-dialog class="confirmDiv"></vue-confirm-dialog>
                </ul>
            </div>
        </div>

        <!-- Navbar 3 vista administrador  -->
        <div id="navbar3" class="col-12 bg-dark">
            <ul class="mb-0 py-2 px-1">
                <li title="Menú suplementación">
                    <router-link to="/MainS/Suplementacion">
                        <img id="sup" src="../../../img/supTitle.png" alt="" width="180rem" height="20px">
                    </router-link>
                </li>
                <li title="Menú alimentación">
                    <router-link to="/MainA/Alimentacion">
                        <img id="sup" src="../../../img/aliTitle.png" alt="" width="150rem" height="20px">
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
// Se importa firebase
import firebase from "firebase/app";
// Se importa la base de datos
import { db } from "../../db";

export default {
    name: "HeaderAdmin",
    data() {
        return {
            root: null,
            carrito:[],
        };
    },
    created() {
        /**
         *  Comprueba si hay un usuario con sesión iniciada y guarda el email de usuario en una variable
         * 
         *  @author Jesús González 
        */
       // Si existe en el localStorage el elemento usuario
        if(localStorage.getItem('user')){
            // Se guarda el email del usuario del localStorage en la variable root
            this.root = localStorage.getItem('user');
        // Si no hay elemento user en el localStorage no hay usuario logueado
        }else{
            // El valor de root se torna null
            this.root = null;
        }
    },
    firestore:{
        carrito: db.collection("arrayCarrito")
        .where("email", "==", localStorage.getItem('user'))
    },
    methods: {
        /**
         *  Cierra la sesión del usuario actual 
         * 
         *  @author Jesús González 
        */
        cerrarCesion(){
            // Ventana emergente para confirmar el cierre de sesión
            this.$confirm({
                title: 'Cerrar sesión',
                message: `¿Seguro que desea cerrar sesión?`,
                button: {
                    no: 'No',
                    yes: 'Sí'
                },
                /**
                 * Función callback
                 * @param {Boolean} confirmar
                 */
                callback: confirmar => { 
                    if (confirmar) {
                        // Limpia localStorage
                        localStorage.clear();
                        // Cerrar sesión firebase
                        firebase.auth().signOut();
                        // Notificacion cierre de sesión
                        this.$notify({
                            title: "Cierre de Sesión",
                            text: "Se ha cerrado sesión de Administrador"
                        });
                        // Variable root cambia valor a null
                        this.root = null;
                        // Si se encuentra en una ruta que no es el Home, vuelve a este
                        if(this.$router.currentRoute.name != "Home"){
                            this.$router.push({name:'Home'});
                        // Si se encuentra en Home te lleva a Login
                        }else{
                            this.$router.push({name:'Login'});
                        }
                    }
                }
            })
        },
    },
    computed:{
        /**
         *  Si exite un usuario con email lo devuelve, si no retorna nulo
         * 
         *  @author Jesús González 
        */
        correo(){
        if(localStorage.getItem('user'))
            return localStorage.getItem('user');
        else
            return null;
        },
    }
};
</script>

<style scoped lang="scss">
    // Importe de estilos de la cabecera
    @import "../../scss/_header.scss";
</style>
