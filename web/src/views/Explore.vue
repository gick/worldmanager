<template>
  <div>
    <DataTable
      v-model:selection="currentOnto"
      selectionMode="single"
      data-key="_id"
      :value="ontologies"
      responsiveLayout="scroll"
    >
      <Column field="name" header="Name"></Column>
      <Column field="filename" header="File name"></Column>
      <Column field="encoding" header="Encoding"></Column>
      <Column field="date" header="Date"></Column>
      <Column field="date" header="Date"></Column>
      <Column
        headerStyle="min-width: 4rem; text-align: center"
        bodyStyle="text-align: center; overflow: visible"
      >
        <template #body="slotProps">
          <Button
            class="p-button-success"
            label="Inspect"
            @click="inspect(slotProps.data)"
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
            @click="deleteOnto(slotProps.data)"
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

export default {
  data() {
    return {
      currentOnto: null,
    };
  },
  computed: {
    ontologies() {
      console.log(this.$store);
      return this.$store.state.ontologies;
    },
  },
  components: {
    Button,
    DataTable,
    Column,
  },
  methods: {
    inspect(data) {
      this.$store.commit("setCurrentOntology", { currentOntology: data });
      this.$router.push("/inspect");
    },
    deleteOnto(data) {
      console.log(data);
      this.axios
        .get("/deleteOntology", {
          params: { id: data._id },
        })
        .then((response) => {
          if (response.data.success) {
            this.$store.commit("deleteOntology", { id: data._id });
            this.$toast.add({
              severity: ToastSeverity.WARN,
              summary: "Info Message",
              detail: "Ontology deleted",
              life: 3000,
              group: "tl",
            });
          }
        });
    },
  },
};
</script>

<style>
</style>