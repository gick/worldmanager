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
    <h1>Create new rule</h1>
    <div class="p-field p-grid">
      <label for="name" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Rule name</label>
      <div class="p-col-5 p-md-5">
        <InputText ref="name" id="name" v-model="name" />
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="name" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Rule variables (comma separated)</label>
      <div class="p-col-5 p-md-5">
        <InputText ref="name" id="name" v-model="variables" />
      </div>
    </div>

    <div class="p-field p-grid">
      <label for="name" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Rule preconditions</label>
      <div class="p-col-5 p-md-5">
        <TextArea v-model="preconditions" :autoResize="true" rows="5" cols="30" />
      </div>
      <div class="p-col-2">
        <Button @click="setPreconditions" label="Example" />
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="name" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Rule execution</label>
      <div class="p-col-5 p-md-5">
        <TextArea v-model="execution" :autoResize="true" rows="5" cols="30" />
      </div>
      <div class="p-col-2">
        <Button @click="setExecution" label="Example" />
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="name" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Rule description (natural language)</label>
      <div class="p-col-5 p-md-5">
        <TextArea v-model="description" :autoResize="true" rows="5" cols="30" />
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

export default {
  name: "RuleComponent",
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
      execution: null,
      preconditions: null,
      name: null,
      description: null,
    };
  },
  methods: {
    setPreconditions() {
      this.preconditions = `PREFIX orc:    <http://xmlns.com/foaf/0.1/>
ASK  { ?aircraft rdf:type  orc:aircraft ;
       ?x   orc:hasMission  ?y }`;
    },

    setExecution() {
      this.execution = `PREFIX foaf:  <http://xmlns.com/foaf/0.1/>

DELETE { ?aircraft orc:hasMission ?y }
INSERT {?aircraft orc:hasMission ?newMission }
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

    showChooseEncoding() {
      this.$toast.add({
        severity: ToastSeverity.WARN,
        summary: "Info Message",
        detail: "You must choose an encoding format!",
        life: 3000,
        group: "tl",
      });
    },
    send() {
      this.axios
        .get("/newAgentAction", {
          params: {
            execution: this.execution,
            preconditions: this.preconditions,
            name: this.name,
            description: this.description,
            id: this.currentOntology._id,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.$toast.add({
              severity: ToastSeverity.INFO,
              summary: "Info Message",
              detail: "Rule added",
              life: 3000,
              group: "tl",
            });
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
