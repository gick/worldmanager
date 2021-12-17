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
        <div class="p-mr-2">
          Ontologie :
          <DropdownOntoChoose />
        </div>
      </div>
    </template>
  </Card>

  <div class="p-fluid">
    <h1>Create new query</h1>
    <div class="p-field p-grid">
      <label for="name" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Query name</label>
      <div class="p-col-5 p-md-5">
        <InputText ref="name" id="name" v-model="name" />
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="name" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Query</label>
      <div class="p-col-5 p-md-5">
        <TextArea v-model="query" :autoResize="true" rows="5" cols="30" />
      </div>
      <div class="p-col-2">
        <Button @click="setQuery" label="Example" />
      </div>
    </div>
    <Button label="Confirm" @click="send" />
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import TextArea from "primevue/textarea";
import { ToastSeverity } from "primevue/api";
import Card from "primevue/card";
import DropdownOntoChoose from "@/components/DropdownOntoChoose";
import QueryService from "../store/sparqlQuery";

export default {
  name: "QueryComponent",
  components: {
    InputText,
    TextArea,
    Button,
    Card,
    DropdownOntoChoose,
  },
  computed: {
    currentOntology() {
      return this.$store.state.currentOntology;
    },
  },
  data() {
    return {
      query: null,
      name: null,
    };
  },
  methods: {
    setQuery() {
      this.query = `
SELECT ?A ?B ?C WHERE{
    ?A ?B ?C
}
`;
    },


    showChooseName() {
      this.$toast.add({
        severity: ToastSeverity.WARN,
        summary: "Info Message",
        detail: "You must choose a name!",
        life: 3000,
        group: "tl",
      });
    },

   async send() {
    let currentService=new QueryService({ontoId:this.currentOntology._id,queryString:this.query,name:this.name})
    let created= await currentService.createQuery()
    if (created.data.success) {
            this.$store.dispatch('loadOntologies')
            this.$toast.add({
              severity: ToastSeverity.INFO,
              summary: "Info Message",
              detail: "Query added",
              life: 2000,
              group: "tl",
            });
          }
    },
  },
};
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
