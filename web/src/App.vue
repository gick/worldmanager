<template>
  <Menubar :model="items">

  </Menubar>
    <Toast position="top-left" group='tl'/>

  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
import OntoLoader from '@/components/OntoLoader.vue'
import Menubar from "primevue/menubar"
import Toast from "primevue/toast";
import {items} from '@/router/menu.js'

export default {
components:{
  Menubar,Toast
},
mounted(){
      this.axios.get("/ontologies").then((response) => {
        console.log(response)
        this.$store.dispatch("loadOntologies",{ontologies:response.data});
      });

},
data(){
  return{
  items:items()}

}  
}
</script>