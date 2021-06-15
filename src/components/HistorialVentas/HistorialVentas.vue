<template>
    <div>
        <!-- Cabecera -->
        <HeaderAdmin/>

        <!-- Título del componente -->
        <h3 class="py-5 m-0" style="background-color:rgb(240,240,240)"><i class="fa fa-bookmark" aria-hidden="true"></i> Historial de ventas</h3>

        <!-- Google Charts Graphics -->
        <GChart id="grafica"
          :settings="{ packages: ['corechart', 'table', 'map']}"
          type="ColumnChart"
          :data="drawGraphics"
          :options="chartOptions"
        />

        <!-- Div principal -->
        <div class="historial-ventas pt-5">
          <button class="btn btn-dark" data-toggle="modal" data-target="#modelId" title="Mostrar historial de ventas">Mostrar historial detallado de ventas</button>

          <!-- Modal -->
          <div class="modal fade" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Historial detallado de ventas</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- Si el arrayCompras está vacío -->
                    <div v-if="arrayVentas.length==0">
                        <h5 class="pt-5">No hay ventas aún registradas</h5>
                    </div>
                    <!-- Si el arrayCompras no esta vacío -->
                    <div v-else class="d-flex justify-content-around py-2" v-for="(pedido,index) in arrayVentas" v-bind:key="pedido.id">
                        <div class="pedido d-flex justify-content-between w-75 flex-column p-2 my-1">
                            <div class="mb-4" style="color:black;font-weight:bold;font-size:.8rem;word-wrap:break-word;" title="Usuario">Usuario: {{pedido.usuario}}</div>
                            <div class="d-flex justify-content-between align-items-center px-2 pb-2 w-100">
                              <div class="text-left" style="width:20rem;color:black;font-size:.65rem;" title="Fecha">{{pedido.fecha}}</div>
                              <div class="mx-3 px-2" style="font-weight:bold;color:black;background-color:rgb(252, 4, 132, 0.4);border-radius:.25rem;border:1px solid rgba(0, 0, 0, 0.53);width:8rem" title="Precio total">Total: {{pedido.total}}€</div>
                              <i :id="pedido.id" class="fa fa-arrow-circle-down" @click="desplegarItem(index,pedido.id)" aria-hidden="true" title="Desplegar pedido"></i>
                            </div>
                            <div :id="index" class="d-none flex-column">
                                <div class="productosList d-flex justify-content-between flex-column flex-md-row align-items-center py-2 px-4 my-1" v-for="(producto,index) in pedido.listaProductos" v-bind:key="index">
                                    <img class="m-1" :src="producto.producto.img" alt="Imagen" title="Imagen producto" style="width:3rem">
                                    <div class="d-flex align-items-center justify-content-center" style="width:12rem" title="Nombre producto">{{producto.producto.nombre}}</div>
                                    <div title="Cantidad">Cantidad: {{producto.producto.cantidad}}</div>
                                    <div title="Precio">Precio Unidad: {{producto.producto.precio}} €</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
              </div>
            </div>
          </div>

        </div>
    </div>
</template>

<script>
// Importe componente HeaderAdmin
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'
// Se importa la base de datos
import { db } from "../../db";
// Se importa gráficos de Google
import { GChart } from 'vue-google-charts';

// Importamos JQuery
const $ = require('jquery')
// Lo declaramos globalmente
window.$ = $

export default {
  name: 'HistorialVentas',
  data () {
    return {
      arrayVentas:[],
      user: null,
      chartData: [],
      chartOptions: {
        chart: {
          title: 'Grafica Ventas',
        },
        backgroundColor: {
            fill: 'rgb(240,240,240)',
        },
        colors:  ['#FC0484'],
        height: 400
      }
    }
  },
  components:{
    HeaderAdmin,
    GChart
  },
  firestore:{
    arrayVentas: db.collection("arrayCompras")
    .orderBy("fecha")
  },
  created(){
      /**
       *  Comprueba si hay un usuario con sesión iniciada y guarda el email de usuario en una variable
       * 
       *  @param {Object} user Corresponde al usuario autentificado en Firebase 
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
    
    // Comprueba que el usuario que inicia sesión es el administrador
    if (localStorage.getItem("user") != "administrador@admin.com") {
        this.$notify({
          title: "Inicio de Sesión",
          type: "error",
          text: "Debes de iniciar sesión como administrador para acceder a la ruta",
        });
        this.$router.push({ name: "Home" });
    }

      // Se bindea el valor del arrayVentas al cargar la página
      this.$bind("arrayVentas", db.collection("arrayCompras")
      .orderBy("usuario"));
  },
  methods:{
      /**
       *  Despliega el contenedor de cada pedido para ver su contenido
       * 
       *  @param {String} index Posicion del elemento pedido 
       *  @param {String} pedido Identificador del pedido
       * 
       *  @author Jesús González
       */
      desplegarItem(index,pedido){
        // Si el contenedor esta oculto
        if(document.getElementById(index).classList.contains("d-none")){
          // Cambiamos la clase del icono 
          document.getElementById(pedido).classList.replace("fa-arrow-circle-down","fa-arrow-circle-up");
          // Mostramos el contenedor
          document.getElementById(index).classList.replace("d-none","d-flex");
        // Si no
        }else{
          // Cambiamos la clase del icono 
          document.getElementById(pedido).classList.replace("fa-arrow-circle-up","fa-arrow-circle-down");
          // Ocultamos el contenedor
          document.getElementById(index).classList.replace("d-flex","d-none");
        }
      }
  },
  computed:{
    drawGraphics: function(){
        // Se crea un array con los meses del año y un valor inicial de 0
        let valores = [
            ['Mes', 'Ventas'],
            ['Enero', 0],
            ['Febrero', 0],
            ['Marzo', 0],
            ['Abril', 0],
            ['Mayo', 0],
            ['Junio', 0],
            ['Julio', 0],
            ['Agosto', 0],
            ['Septiembre', 0],
            ['Octubre', 0],
            ['Noviembre', 0],
            ['Diciembre', 0]
        ]; 
        // Se recorre el arrayVentas
        this.arrayVentas.forEach((venta)=>{
          // Por cada elementos
          // Obtenemos la fecha
          const fecha = venta.fecha.toString();
          var mes = fecha.split("de")[1].trim();
          // En función del mes se suma uno al total de dicho mes
          switch (mes){
            case 'enero':
              valores[1][1] += 1;
              break;
            case 'febrero':
              valores[2][1] += 1;
              break;
            case 'marzo':
              valores[3][1] += 1;
              break;
            case 'abril':
              valores[4][1] += 1;
              break;
            case 'mayo':
              valores[5][1] += 1;
              break;
            case 'junio':
              valores[6][1] += 1;
              break;
            case 'julio':
              valores[7][1] += 1;
              break;
            case 'agosto':
              valores[8][1] += 1;
              break;
            case 'septiembre':
              valores[9][1] += 1;
              break;
            case 'octubre':
              valores[10][1] += 1;
              break;
            case 'noviembre':
              valores[11][1] += 1;
              break;
            case 'diciembre':
              valores[12][1] += 1;
              break;
            default:
              this.$notify({title: 'Error', type: 'error', text: 'Se ha encontrado una fecha con formato incorrecto'})
              break;
          }
        })
        // Se devuelve el array para que lo reciba el gráfico de Google 
        return valores;
    }
  }
}
</script>

<style scoped lang="scss">
    @import "../../scss/_historialVentas.scss";
</style>
