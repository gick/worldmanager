<template>
  <div class="p-fluid">
    <h1>Sparql Request</h1>
    <Button @click="setPrefix" label="Add classic prefix"/>
    <div class="p-field p-grid">
      <label for="select" class="p-mb-2 p-md-2 p-mb-md-0">Request :</label>
      <div class="p-md-5">
        <TextArea v-model="query"  placeholder="SPARQL Format" />
      </div>
    </div>
    <Button label="Execute query" @click="runSparqlQuery"/>
  </div>
  <div>
    <DataTable
      showGridlines
      selectionMode="single"
      :value="queryResult"
    >
      <Column v-for="(col,i) of currentCols" :field="col.field" :header="col" v-bind:key=i></Column>
    </DataTable>
  </div>
</template>


<script>
import TextArea from "primevue/textarea";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button"
export default {
 components:{
     TextArea,
     DataTable,
     Column,
     Button,
 },



  data() {



    return {



      queryResult: null,
      currentCols: null,
      query:`SELECT ?o ?p ?s WHERE 
        {?o ?p ?s.}`
    };
  },
  methods: {
    setPrefix(){
    let prefix =
`PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>`
    this.query=prefix
    },
    runSparqlQuery() {
        console.log(this.query)
      this.axios
        .get("http://localhost:3000/runQuery", {
          params: {
            id: this.$store.state.currentOntology._id,
            query:this.query
          },
        })
        .then((response) =>{
            console.log(response)
            let cols=response.data.variables.map(x=>{return{field:x}})
        this.currentCols=cols
         this.queryResult=response.data.results 
         console.log(response.data) 
         console.log(this.currentCols) 
            }
        );
    },
  },
};
</script>

<style>
</style>