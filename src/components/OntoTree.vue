<template>
  <div class="p-grid">
    <div class="p-col-6">
      <Button label="Get hierarchy" @click="getHierarchy" />
    </div>
  </div>

  <div class="p-grid">
    <div class="p-col-6">
      <Tree @node-select="onNodeSelect" selectionMode="single" :value="nodes"></Tree>
    </div>
  </div>
</template>

<script>
import NodeService from "@/store/NodeService.js";
import Button from "primevue/button";
import Tree from "primevue/tree";
export default {
  components: {
    Button,
    Tree,
  },
  data() {
    return {
      currentNodeService: null,
      nodes: null,
    };
  },
  computed: {
    currentOntology() {
      return this.$store.state.currentOntology;
    },
  },
  methods: {
    onNodeSelect(ev){
        console.log(ev)
    },
    async getHierarchy() {
      if (this.currentOntology._id) {
        this.currentNodeService = new NodeService(this.currentOntology._id);
      } else {
        return;
      }
      let tree = await this.currentNodeService.getHierarchy();
      console.log(tree);
      this.nodes = tree;
    },
  },
};
</script>

<style>
</style>