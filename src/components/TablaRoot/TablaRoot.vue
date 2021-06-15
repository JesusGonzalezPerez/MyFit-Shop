<template>
    <div class="tabla-root d-flex flex-column align-items-center">

        <!-- Contenedor con todo el contenido del producto -->
        <div id="divAdd" class="d-flex flex-column m-0 col-10 col-lg-7 my-5">
            <form onsubmit="return false;">
                <!--  Título del prodcuto-->
                <h3 class="tex-center ">Añadir un suplemento</h3>

                <!-- Sucontenedor 1 -->
                <div class="d-flex flex-column flex-wrap flex-md-row">
                    <div id="col1" class="d-flex flex-column p-3 w-100 w-md-50">
                        <!-- Subcontenedor con la imagen  -->
                        <div id="divImg" class="p-3 my-1">
                            <h5 class="text-left pt-3">Imagen *</h5>
                            <input id="imgS" type="text" placeholder="Img src..." class="w-100 pl-1" name="" required>
                        </div>    

                        <!-- Sucontenedor precio y descuento-->
                        <div id="divOfert" class="p-3 my-1">
                            <h5 class="text-left pt-3">Precio *</h5>
                            <input id="precioS" type="number" class="w-100 pl-1" placeholder="Ej: 24" required>
                            <h5 class="text-left pt-3">Descuento</h5>
                            <input id="descuentoS" type="number"  class="w-100 pl-1" placeholder="Ej: 20">
                        </div>

                        <!-- Sucontenedor tablas de valor nutricional-->
                        <div id="divTables" class="p-3 my-1">
                            <h5 class="text-left pt-3">Tabla nutricional (32 gramos)</h5>
                            <input id="tabla32grS" type="text"  class="w-100 pl-1" placeholder="Img src...">
                            <h5 class="text-left pt-3">Tabla nutricional (100 gramos)</h5>
                            <input id="tabla100grS" type="text"  class="w-100 pl-1" placeholder="Img src...">
                        </div>
                    </div>
                
                    <!-- Sucontenedor 2 -> subcontenedor con la información principal del producto  -->
                    <div id="col2" class="d-flex flex-column justify-content-center p-3 w-100 w-md-50">
                        <h5 class="text-left">Nombre *</h5>
                        <input id="nombreS" type="text" class="w-100 pl-1" placeholder="Ej: Whey Protein Chocolate " required>
                        <h5 class="text-left pt-3">Descripción *</h5>
                        <input id="descripcionS" type="text"  class="w-100 pl-1" placeholder="Descripción del producto" required>
                        <h5 class="text-left pt-3">Cantidad *</h5>
                        <input id="cantidadS" type="text"  class="w-100 pl-1" placeholder="Ej: 2000gr" required>
                        <h5 class="text-left pt-3">Stock *</h5>
                        <input id="stockS" type="number" class="w-100 pl-1" placeholder="Ej: 28" required>
                        <h5 class="text-left pt-3">Categoría *</h5>
                        <input id="categoriaS" type="text"  class="w-100 pl-1" placeholder="Ej: Proteina" required>
                        <h5 class="text-left pt-3">Valoración *</h5>
                        <input id="valoracionS" type="number"  class="w-100 pl-1" placeholder="Ej: 4.5" required>
                    </div>
                </div>

                <!-- Sucontenedor botones-->
                <div id="buttons" class="d-flex justify-content-center p-3">
                    <button  class="btn btn-outline-light mx-2" title="Añadir suplemento" @click="addProduct('S')">Añadir suplemento</button>
                    <button class="btn btn-outline-light mx-2" title="Limpiar campos" @click="clearFields">Limpiar campos</button>
                </div>
            </form>
        </div>

        <!-- Contenedor con todo el contenido del producto -->
        <div id="divAdd" class="d-flex flex-column m-0 col-10 col-lg-7">
            <form onsubmit="return false;">
                <!--  Título del prodcuto-->
                <h3 class="tex-center ">Añadir un alimento</h3>

                <!-- Sucontenedor 1 -->
                <div class="d-flex flex-column flex-wrap flex-md-row">
                    <div id="col1" class="d-flex flex-column p-3 w-100 w-md-50">
                        <!-- Subcontenedor con la imagen  -->
                        <div id="divImg" class="p-3 my-1">
                            <h5 class="text-left pt-3">Imagen *</h5>
                            <input id="imgA" type="text" placeholder="Img src..." class="w-100 pl-1" name="" required>
                        </div>    

                        <!-- Sucontenedor precio y descuento-->
                        <div id="divOfert" class="p-3 my-1">
                            <h5 class="text-left pt-3">Precio *</h5>
                            <input id="precioA" type="number" class="w-100 pl-1" placeholder="Ej: 24" required>
                            <h5 class="text-left pt-3">Descuento</h5>
                            <input id="descuentoA" type="number"  class="w-100 pl-1" placeholder="Ej: 20">
                        </div>

                        <!-- Sucontenedor tablas de valor nutricional-->
                        <div id="divTables" class="p-3 my-1">
                            <h5 class="text-left pt-3">Tabla nutricional</h5>
                            <input id="tablaA" type="text"  class="w-100 pl-1" placeholder="Img src...">
                        </div>
                    </div>
                
                    <!-- Sucontenedor 2 -> subcontenedor con la información principal del producto  -->
                    <div id="col2" class="d-flex flex-column justify-content-center p-3 w-100 w-md-50">
                        <h5 class="text-left">Nombre *</h5>
                        <input id="nombreA" type="text" class="w-100 pl-1" placeholder="Ej: Pizza Margarita Fit" required>
                        <h5 class="text-left pt-3">Descripción *</h5>
                        <input id="descripcionA" type="text"  class="w-100 pl-1" placeholder="Descripción del producto" required>
                        <h5 class="text-left pt-3">Cantidad *</h5>
                        <input id="cantidadA" type="text"  class="w-100 pl-1" placeholder="Ej: 2000gr" required>
                        <h5 class="text-left pt-3">Stock *</h5>
                        <input id="stockA" type="number" class="w-100 pl-1" placeholder="Ej: 28" required>
                        <h5 class="text-left pt-3">Ingredientes *</h5>
                        <input id="ingredientesA" type="text"  class="w-100 pl-1" placeholder="Ej: Harina, tomate..." required>
                        <h5 class="text-left pt-3">Valoración *</h5>
                        <input id="valoracionA" type="number"  class="w-100 pl-1" placeholder="Ej: 4.5" required>
                    </div>
                </div>

                <!-- Sucontenedor botones-->
                <div id="buttons" class="d-flex justify-content-center p-3">
                    <button  class="btn btn-outline-light mx-2" title="Añadir alimento" @click="addProduct('A')">Añadir alimento</button>
                    <button class="btn btn-outline-light mx-2" title="Limpiar campos" @click="clearFields">Limpiar campos</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { db } from "../../db";

// Importamos JQuery
const $ = require('jquery')
// Lo declaramos globalmente
window.$ = $

export default {
    name: 'TablaRoot',
    data () {
        return {}
    },
    methods:{
        /** 
         * Añade a la base de datos un nuevo suplemento con los datos introducidos en los correspondientes inputs y notifica
         * 
         * @author Jesús González 
         */
        addProduct: function(type){
            switch(type){
            // Suplementos
            case 'S':
                // Comprueba que los campos obligatorios estén rellenos
                if($(`#img${type}`).val() != "" &&  $(`#precio${type}`).val() != "" &&  $(`#nombre${type}`).val() != "" &&  $(`#descripcion${type}`).val() != "" &&  
                $(`#categoria${type}`).val() != "" &&  $(`#cantidad${type}`).val() != "" &&  $(`#stock${type}`).val() != "" &&  $(`#valoracion${type}`).val() != ""){
                    // Añade suplemento a la base de datos
                    db.collection("arraySuplementos").add({
                        cantidad: $(`#cantidad${type}`).val(),
                        categoria: $(`#categoria${type}`).val(),
                        descripcion: $(`#descripcion${type}`).val(),
                        descuento: $(`#descuento${type}`).val(),
                        img: $(`#img${type}`).val(),
                        nombre: $(`#nombre${type}`).val(),
                        precio: $(`#precio${type}`).val(),
                        stock: $(`#stock${type}`).val(),
                        tabla100gr: $(`#tabla100gr${type}`).val(),
                        tabla32gr: $(`#tabla32gr${type}`).val(),
                        valoracion: $(`#valoracion${type}`).val(),
                    });
                    // Limpia los campos
                    this.clearFields();
                    // Notifica
                    this.$notify({
                        title: "Se ha añadido un nuevo suplemento",
                        type:'success'
                    });
                // Si no
                }else{
                    // Notifica
                    this.$notify({
                        title: "No se ha pordido añadir el suplemento",
                        type:'warn'
                    });
                }
            break;
            // Alimentos
            case 'A':
                // Comprueba que los campos obligatorios estén rellenos
                if($(`#img${type}`).val() != "" &&  $(`#precio${type}`).val() != "" &&  $(`#nombre${type}`).val() != "" &&  $(`#descripcion${type}`).val() != "" &&  
                $(`#ingredientes${type}`).val() != "" &&  $(`#cantidad${type}`).val() != "" &&  $(`#stock${type}`).val() != "" &&  $(`#valoracion${type}`).val() != ""){
                    // Añade alimento a la base de datos
                    db.collection("arrayAlimentos").add({
                        cantidad: $(`#cantidad${type}`).val(),
                        descripcion: $(`#descripcion${type}`).val(),
                        descuento: $(`#descuento${type}`).val(),
                        img: $(`#img${type}`).val(),
                        nombre: $(`#nombre${type}`).val(),
                        precio: $(`#precio${type}`).val(),
                        stock: $(`#stock${type}`).val(),
                        tablaNutricional: $(`#tabla${type}`).val(),
                        ingredientes: $(`#ingredientes${type}`).val(),
                        valoracion: $(`#valoracion${type}`).val(),
                    });            
                    // Limpia los campos
                    this.clearFields();
                    // Notifica
                    this.$notify({
                        title: "Se ha añadido un nuevo alimento",
                        type:'success'
                    });
                // Si no
                }else{
                    // Notifica
                    this.$notify({
                        title: "No se ha pordido añadir el alimento",
                        type:'warn'
                    });
                }
                break;
            }
        },


        /** 
         * Limpia todos los inputs 
         * 
         * @author Jesús González 
         */
        clearFields: function(){
            $('#col1 > div > input').val('');
            $('#col2 > input').val('');
        }
    }
}
</script>

<style scoped lang="scss">
    @import "../../scss/_tablaRoot.scss";
</style>
