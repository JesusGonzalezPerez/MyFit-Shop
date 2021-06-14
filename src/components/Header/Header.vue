<template>
    <div id="header">
        <!-- Navbar 1 con opciones de usuario -->
        <div class="col-12 d-flex flex-wrap justify-content-between" style="background-color:black;" id="navbar2">
            <router-link to="/">
                <a class="navbar-brand col-xs-1" title="Home">
                    <img class="ml-2" src="../../../img/MyFit_logo3.png" width="300rem" height="130rem">
                </a>
            </router-link>
            <!-- Menú usuario -->
            <div id="menu" class="col-xs-12 col-md-5 d-sm-flex justify-content-center justify-content-md-end">
                <ul class="p-0 align-items-end">
                    <li v-if="!user">
                        <router-link to="/Login">
                            <a href="" title="Iniciar sesión">Iniciar sesión</a>
                        </router-link>
                    </li>
                    <li v-if="!user">
                        <router-link to="/Registrar">
                            <a href="" title="Registrarse">Registrarse</a>
                        </router-link>
                    </li>
                    <li v-if="user">
                        <router-link to="/Carrito" id="carrito">
                            <i class="fa fa-shopping-cart"></i><span id="cart_menu_num" data-action="cart-can" class="badge rounded-circle">{{this.carrito.length}}</span>
                        </router-link>
                    </li>
                    <li v-if="user">
                        <div class="dropdown">
                            <a class="btn dropdown-toggle p-0 px-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-user" aria-hidden="true" :title="`Usuario: `+ correo"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-left p-0" id="dropdown" aria-labelledby="dropdownMenuButton">
                                <p class="dropdown-header p-2 m-0 text-center">{{correo}}</p>
                                <router-link to="/HistorialCompras">
                                    <a class="dropdown-item"><i class="fa fa-bookmark" aria-hidden="true"></i> Historial de compras</a>
                                </router-link>
                                <a @click="cerrarCesion" class="dropdown-item"><i class="fa fa-sign-out" aria-hidden="true"></i> Cerrar sesión</a>
                            </div>
                        </div>
                    </li>
                    <vue-confirm-dialog class="confirmDiv"></vue-confirm-dialog>
                </ul>
            </div>
        </div>

        <!-- Navbar 3 con enlaces -->
        <div id="navbar3"  class="col-12">
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
    name: "Header",
    data() {
        return {
            user: null,
            carrito:[]
        };
    },
    mounted() {
        /**
         *  Comprueba si hay un usuario con sesión iniciada y guarda el email de usuario en una variable
         * 
         *  @author Jesús González 
        */
        // Si existe en el localStorage el elemento usuario
        if(localStorage.getItem('user')){
            // Se guarda el email del usuario del localStorage en la variable user
            this.user = localStorage.getItem('user');
        // Si no hay elemento user en el localStorage no hay usuario logueado
        }else{
            // El valor de user se torna null
            this.user = null;
        }

        // Se linkea el carrito con el contenido de la consulta
        this.$bind("carrito",db.collection("arrayCarrito")
        .where("email", "==", localStorage.getItem('user')));
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
                        // Cierra sesión desde firebase
                        firebase.auth().signOut();
                        // Notificación de cierre de sesión
                        this.$notify({
                            title: "Cierre de Sesión",
                            text: "Se ha cerrado sesión de la cuenta: " + this.user
                        });
                        // Variable user cambia valor a null
                        this.user = null;
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
