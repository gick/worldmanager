<template>
    <Card style="width: 25rem">
      <template #header>
        <img class="card-header" alt="user header" src="../assets/rdf.png" />
      </template>

      <template #title>
        <div class="card-title">Basic information</div>
      </template>
      <template #content>
        <div class="p-d-flex p-jc-start p-ai-start p-flex-column">
          <div class="p-mr-2">File name : {{currentOntology.name}}</div>
          <div class="p-mr-2">File name : {{currentOntology.filename}}</div>
          <div class="p-mr-2">Creation date : {{currentOntology.date}}</div>
          <div class="p-mr-2">Encoding {{currentOntology.encoding}}</div>
          <div class="p-mr-2">Ontologie : <DropdownOntoChoose/></div>
        </div>
      </template>
      
    </Card>
<div class="p-d-flex p-m-3 p-flex-column">
  <OntoTree/>
</div>
</template>

<script>
import Card from 'primevue/card'
import DropdownOntoChoose from '@/components/DropdownOntoChoose'
import OntoTree from '@/components/OntoTree'
export default {
    components:{
        DropdownOntoChoose,
        OntoTree,
        Card
    },
    computed:{
      currentOntology(){
        return this.$store.state.currentOntology
      }
    }
}
</script>

<style scoped>
.card-title {
  background-color: lightblue;
  border-radius: 5%;
}
.card-header {
  width: 100px;
}
</style>
