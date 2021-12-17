<template>
  <div>
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

    <DataTable
      v-model:selection="selectedQuery"
      selectionMode="single"
      data-key="_id"
      :value="currentQueries"
      responsiveLayout="scroll"
    >
      <Column field="name" header="Name"></Column>
      <Column field="query" header="Query"></Column>
      <Column
        headerStyle="min-width: 4rem; text-align: center"
        bodyStyle="text-align: center; overflow: visible"
      >
        <template #body="slotProps">
          <Button
            class="p-button-success"
            label="Inspect"
            @click="run(slotProps.data)"
            icon="pi pi-cog"
          ></Button>
        </template>
      </Column>
      <Column
        headerStyle="min-width: 4rem; text-align: center"
        bodyStyle="text-align: center; overflow: visible"
      >
        <template #body="slotProps">
          <Button
            label="Delete"
            @click="deleteQuery(slotProps.data)"
            class="p-button-danger"
            icon="pi pi-cog"
          ></Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>


<script>
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { ToastSeverity } from "primevue/api";
import Card from "primevue/card";
import DropdownOntoChoose from "@/components/DropdownOntoChoose";

export default {
  data() {
    return {};
  },
  computed: {
    currentQueries() {
      console.log(this.$store);
      return this.$store.state.currentOntology.agentQuery;
    },
        currentOntology() {
      console.log(this.$store);
      return this.$store.state.currentOntology;
    },

  },
  components: {
    Button,
    DataTable,
    Column,
    Card,
    DropdownOntoChoose
  },
  methods: {
    run(data) {
      this.axios
        .get("/execQuery", {
          params: { queryId: data._id,ontoId:this.currentOntology._id },
        })
    },
    deleteQuery(data) {
      console.log(data);
      this.axios
        .get("/deleteQuery", {
          params: { id: data._id },
        })
        .then((response) => {
          if (response.data.success) {
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
