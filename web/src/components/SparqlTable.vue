<template>
  <div class="p-fluid">
    <h1>Sparql Request</h1>
    <Button @click="setPrefix" label="Add classic prefix" />
    <div class="p-field p-grid">
      <label for="select" class="p-mb-2 p-md-2 p-mb-md-0">Request :</label>
      <div class="p-md-5">
        <TextArea v-model="query" placeholder="SPARQL Format" />
      </div>
    </div>
    <Button label="Execute query" @click="runSparqlQuery" />
  </div>
  <div>
    <DataTable showGridlines selectionMode="single" :value="queryResult">
      <Column v-for="(col,i) of currentCols" :field="col.field" :header="col.field" v-bind:key="i">
        <template #body="slotProps">
          <div>{{getRowValue(slotProps)}}</div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>


<script>
import TextArea from "primevue/textarea";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import QueryService from "../store/sparqlQuery";
export default {
  components: {
    TextArea,
    DataTable,
    Column,
    Button,
  },

  data() {
    return {
      queryResult: null,
      currentCols: null,
      query: `SELECT ?o ?p ?s WHERE 
        {?o ?p ?s.}`,
    };
  },
  computed: {
    currentOntology() {
      return this.$store.state.currentOntology;
    },
  },
  methods: {
    getRowValue(slotProps) {
      return slotProps.data[slotProps.field].value;
    },

    setPrefix() {
      let prefix = `PREFIX owl: <http://www.w3.org/2002/07/owl#>
                    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>`;
      this.query = prefix;
    },
    async runSparqlQuery() {
     let currentService= new QueryService({ontoId:this.currentOntology._id,queryString:this.query})
      let { variables, result } = await currentService.getQueryStringResult();
      this.currentCols = variables;
      this.queryResult = result;
    },
  },
};
</script>

<style>
</style>