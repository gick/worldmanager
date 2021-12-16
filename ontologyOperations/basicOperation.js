const Hylar = require('hylar')
const h = new Hylar()
let OntoModel = require('../models/ontoModel')
let { query } = require('../Sparql/query')
exports.Operation = class { 

    async validateOnto(id) {
        let onto = await OntoModel.findById(id)
        await h.load(onto.rawText, onto.encoding, false)

        let results = await h.query(query.all)
        return results
    }
    async getHierarchy(id){
        let onto = await OntoModel.findById(id)
        let error
        console.log(onto)
        await h.load(onto.rawText, onto.encoding, false)
        await h.setIncremental()

    //    await h.load({ontologyText:onto.rawText, mimetype:onto.encoding, keepOldValues:true,reasoningMethod:'incremental'})

        let results = await h.query(query.selectHierarchy)
        console.log(results)
        return results

    }

    async getHierarchyAsJSON(id){
        let onto = await OntoModel.findById(id)
        await h.load(onto.rawText, onto.encoding, false)

        let results = await h.query(query.hierarchy)
        if(results[0]){
        let variables=Object.keys(results[0])
        return {results:results,variables:variables}
        }
        else return results
    }

    computeJSON(queryResult){
        let rootNode={}
        
    }
    async runQuery(id,query){
        let onto = await OntoModel.findById(id)
        await h.load(onto.rawText, onto.encoding, false)

        let results = await h.query(query)
        if(results[0]){
        let variables=Object.keys(results[0])
        return {results:results,variables:variables}
        }
        else return results
    }

    async queryHierarchy(){

    }
    async queryAll() {
        console.log(results)
    }
}

