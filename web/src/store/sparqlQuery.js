import axios from 'axios'
export default class QueryService {
    constructor({ontoId, queryString, queryId,name}={}) {
        this.ontologyId = ontoId;
        this.queryString = queryString
        this.queryId = queryId
        this.variables = []
        this.queryResult =[]
        this.name=name
    }



    async createQuery(){
        let  response= await axios
        .get("/newAgentQuery", {
          params: {
            query: this.queryString,
            name: this.name,
            id: this.ontologyId,
          },
        })
        return response

    }
  
    async getQueryStringResult() {
        let response = await axios.get('/runQuery', { params: { id: this.ontologyId, query: this.queryString } })
        if (response.data.success) {
            this.variables = response.data.result.variables.map((x) => {
                return { field: x };
            });

            this.queryResult = response.data.result.results;
            return { variables: this.variables, result: this.queryResult }
        }
        return { success: false, error: response.data.error }
    }

    async getQueryIdResult() {
        let response = await axios.get('/execQuery', { params: { queryId: this.queryId, ontoId: this.ontologyId } })
        if (response.data.success) {
            this.variables = response.data.variables.map((x) => {
                return { field: x };
            });

            this.queryResult = response.data.results;
            return { var: this.variables, result: this.queryResult }
        }
        return { success: false, error: response.data.error }
    }

    async deleteQuery(){
        let response = await axios.get('/deleteQuery', { params: { id: this.queryId } })
        if(response.data.success){
            return {success:true,query:response.data.query}
        }
        return {success:false,error:response.data.error}
    }

}

