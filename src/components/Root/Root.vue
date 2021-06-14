<template>
  <div class="root col-12 p-0">
    <!-- Header administrador -->
    <HeaderAdmin/>
    <!-- Componente para añadir productos  -->
    <TablaRoot/>
  </div>
</template>

<script>

// Se importa el componente Header administrador
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'
// Se importa el componente TablaRoot
import TablaRoot from '../TablaRoot/TablaRoot'

export default {
  name: 'Root',
  components:{
    HeaderAdmin,
    TablaRoot,
  },
  created(){
      /**
       * Comprueba si el usuario pertenece al administrador
       * 
       * @author Jesús González
       */
      if (localStorage.getItem("user") != "administrador@admin.com") {
          this.$notify({
            title: "Inicio de Sesión",
            type: "error",
            text: "Debes de iniciar sesión como administrador para acceder a la ruta",
          });
          this.$router.push({ name: "Home" });
      }
  },
}
</script>

<style scoped>
  .root{
      position: absolute;
  }
  #admin{
      min-height: 100vh;
  }
</style>
