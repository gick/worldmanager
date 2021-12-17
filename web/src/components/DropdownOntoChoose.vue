<template>
  <Dropdown v-model="currentOnto" @change="handleChange" :options="ontologies" optionLabel="name" placeholder="Select an ontologie" />
</template>

<script>
import Dropdown from 'primevue/dropdown'
export default {
    components:{
        Dropdown
    },
    data(){
        return{
            currentOnto:null,
        }
    
    },
    computed:{
        ontologies(){
            return this.$store.state.ontologies
        }
    },
    methods:{
        handleChange(e){
                  this.$store.commit("setCurrentOntology", { currentOntology: e.value });

        }
    }
}
</script>

<style>

</style>