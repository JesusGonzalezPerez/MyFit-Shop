<template>
    <ProductsS v-if="array" id="array" v-bind:Products="array" style="background-color:rgb(240,240,240);"/>
</template>

<script>
// Se importa el componente que lista los productos
import ProductsS from "../ProductsS/ProductsS";
// Se importa la base de datos
import { db } from "../../db";

export default {
  name: 'Suplementacion',
  components:{
    ProductsS
  },
  data () {
    return {
      array:[],
    }
  },
  firestore:{
    array: db.collection("arraySuplementos")
    .orderBy("nombre")
  },
  methods:{
    /**
     * Rellena el array con los objetos que recibe de la consulta
     * 
     * @author Jesús González
     */
    leerDatos(){
      db.collection('arraySuplmentos')
      .limit(2)
      .orderBy('nombre')
      .get()
      .then(query => {
        query.forEach(item =>{
            this.array.push(item.data());
        })
      })
    },


    // siguiente: function(){
    //   let lastQuery = null;
    //   const query = db.collection("arraySuplementos")
    //                 .orderBy("nombre")
    //                 .startAfter(lastQuery)
    //   query.limit(18).get().then(snap =>{
    //       lastQuery = snap.docs[snap.docs.length-1];
    //       this.array = snap.docs;
    //   })
    // }
  },
  computed:{
  }
}
</script>

<style scoped lang="scss">
  #array{
    min-height: 61vh;
  }
</style>
