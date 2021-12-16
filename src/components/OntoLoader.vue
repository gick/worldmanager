<template>
  <div class="p-fluid">
    <h1>Import new ontology</h1>
    <div class="p-field p-grid">
      <label for="select" class="p-mb-2 p-md-2 p-mb-md-0">Ontology text format :</label>
      <div class="p-md-5">
        <Dropdown
          v-model="language"
          :options="languageSet"
          optionLabel="name"
          id="select"
          placeholder="Select encoding"
        />
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="upload" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Choose file</label>
      <div class="p-col-5 p-md-5">
        <FileUpload
          ref="upload"
          id="upload"
          mode="basic"
          :customUpload="true"
          @uploader="ontoUploader"
        />
      </div>
    </div>

    <div class="p-field p-grid">
      <label for="name" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Choose name</label>
      <div class="p-col-5 p-md-5">
        <InputText
          ref="name"
          id="name"
          v-model="name"
        />
      </div>
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import FileUpload from "primevue/fileupload";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import { ToastSeverity } from "primevue/api";

export default {
  name: "OntoLoader",
  components: {
    FileUpload,
    Dropdown,
    InputText,
  },

  data() {
    return {
      language: null,
      name: null,
      languageSet: [
        { name: "Turtle", code: "text/turtle" },
        { name: "N3", code: "text/n3" },
        { name: "LD+JSON", code: "application/ld+json" },
      ],
    };
  },
  methods: {
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
    ontoUploader(event) {
      if (this.language == null) {
          this.showChooseEncoding()
      }
      if(this.name==null){

      }
      var formData = new FormData();
      formData.append("ontology", event.files[0]);
      formData.append("encoding", this.language.code);
      formData.append("name",this.name)
      this.axios
        .post("http://localhost:3000/uploadOntology", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() =>
          this.$toast.add({
            severity: ToastSeverity.INFO,
            summary: "Info Message",
            detail: "Ontology successfully loaded",
            life: 3000,
            group: "tl",
          })
        );
    },
  },
};
</script>

<style>
</style>