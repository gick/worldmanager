<template>
  <div class="p-fluid">
    <h1>Ontology inspecter</h1>
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


    <Message v-if="!validated">Validate your ontology file to continue</Message>

    <div class="p-field p-grid">
      <label for="select" class="p-mb-2 p-md-2 p-mb-md-0">Validate ontology :</label>
      <div class="p-md-5">
        <Button id="select" :disable="validated" label="Validate" @click="validate" />
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="hierarchy" class="p-mb-2 p-md-2 p-mb-md-0">Get class hierarchy :</label>
      <div class="p-md-5">
        <Button id="hierarchy" label="Compute hierarchy" @click="getHierarchy" />
      </div>
    </div>

    <Message
      severity="success"
      v-if="validated && valid"
    >This ontology is valid and has {{statements.length}} statements</Message>
    <Message
      severity="error"
      v-if="validated && !valid"
    >This ontology is invalid error code {{error}}</Message>

    <div v-if="valid" class="primary">
      <TextArea v-model="currentOntology.rawText" rows="5" cols="30"></TextArea>
    </div>
  </div>
  <SparqlTable/>
</template>

<script>
import SparqlTable from "./SparqlTable"
import DropdownOntoChoose from "./DropdownOntoChoose"
import TextArea from "primevue/textarea";
import Button from "primevue/button";
import { ToastSeverity } from "primevue/api";
import Message from "primevue/message";
import Card from "primevue/card";
import Explore from "@/views/Explore.vue"
export default {
  components: {
    TextArea,
    Button,
    Message,
    Card,
    SparqlTable,
    Explore,
    DropdownOntoChoose
  },
  data() {
    return {
      statements: 0,
      validated: false,
      valid: false,
    };
  },
  props: {},
  computed: {
    currentOntology() {
      return this.$store.state.currentOntology;
    },
  },
  methods: {
    toggle(event) {
    this.$refs.op.toggle(event);
},
    getHierarchy() {
      this.axios.get("http://localhost:3000/ontologyHierarchy", {
        params: {
          id: this.currentOntology._id,
        },
      }).then(response=>console.log(response))
    },
    validate() {
      this.axios
        .get("http://localhost:3000/validate", {
          params: {
            id: this.currentOntology._id,
          },
        })
        .then((response) => {
          console.log(response);
          this.validated = true;
          if (response.data.success) {
            this.valid = true;
            this.statements = response.data.statements;
          } else {
            this.valid = false;
            this.error = response.data.error;
          }
        });
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
