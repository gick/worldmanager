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
        }
    
    },
    computed:{
        ontologies(){
            return this.$store.state.ontologies
        },
        currentOnto(){
            return this.$store.state.currentOntology
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