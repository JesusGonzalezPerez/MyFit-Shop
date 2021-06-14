<template>
  <body>
      <div id="message">
      <h2>404</h2>
      <h1>Page Not Found</h1>
      <div class="d-flex justify-content-center">
          <img src="../../../img/MyFit_logo3.png" alt="MyFit Shop" width="80%">
      </div>
      <h3 class="text-center">Redireccionamiento automático al Home en 5 segundos...</h3>
    </div>
  </body>
</template>

<script>
export default {
  name: 'NotFound404',
  data () {
    return {}
  },
  mounted(){
    setTimeout(() => {
        this.$router.push({name:'Home'});
    }, 5000);
  }
}
</script>

<style scoped lang="scss">
    @import "../../scss/_variables.scss";
    
    body { background: $primaryColor; color: rgba(0,0,0,0.87); font-family: Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; min-height: 100vh; display:flex; justify-content: center; align-items: center;}
    #message { background: $primaryColorT; max-width: 360px; padding: 5rem; border-radius: 3px; }
    #message h3 { color: #888; font-weight: normal; font-size: 1rem; margin: 16px 0 12px; }
    #message h2 { color: $secondaryColor; font-weight: bold; font-size: 16px; margin: 0 0 8px; }
    #message h1 { font-size: 22px; font-weight: 300; color: $light; margin: 0 0 16px;}
    #message p { line-height: 140%; margin: 16px 0 24px; font-size: 14px; }
    #message a { display: block; text-align: center; background: #039be5; text-transform: uppercase; text-decoration: none; color: white; padding: 16px; border-radius: 4px; }
    #message, #message a { box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); }
    #load { color: rgba(0,0,0,0.4); text-align: center; font-size: 13px; }
    @media (max-width: 600px) {
      #message { margin-top: 0; background: $primaryColorT; box-shadow: none; }
    }
</style>
