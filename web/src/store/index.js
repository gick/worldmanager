import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    ontologies:[],
    currentOntology:{}
  },
  mutations: {
    setCurrentOntology(state,payload ){
      state.currentOntology=payload.currentOntology
    },
    addOntologies(state,payload){
      console.log(payload.ontologies)
      state.ontologies=[]
      state.ontologies=payload.ontologies
    },
    deleteOntology(state,payload){
      console.log(payload)
      let temp=state.ontologies.filter(item=>{return item._id!==payload.id})
      state.ontologies=temp
    }
  },
  actions: {
    loadOntologies({commit}){
      axios.get("http://localhost:3000/ontologies").then((response) => {
        commit('addOntologies',{ontologies:response.data})
      });
     //   this.$store.commit("addOntologie",{ontologies:response.data});

    }
  },
  modules: {
  }
})
