import axios from 'axios'
import { unflatten, flatten } from 'un-flatten-tree';
import { arrayToTree } from "performant-array-to-tree";
export default class NodeService {
    constructor(id) {
        this.ontologyId = id;
        this.nodes = new Set()
        this.sparqlResults = []
        this.classesMap = new Map()
        this.classArray = []
        
    }




    async getHierarchy() {
        let resp = await axios.get('/jsonHierarchy', { params: { id: this.ontologyId } })
        this.sparqlResults = resp.data.statements.results

        for (let item of this.sparqlResults) {
            this.nodes.add(item.super.value)
            this.nodes.add(item.directSub.value)
        }
        let arrayNode = [...this.nodes]   //all classes of the onto
        arrayNode.forEach((elem, index) => this.classesMap.set(elem, index))
        this.constructFlatArray()
        let tree=arrayToTree(this.classArray,{id:"key",dataField: null})
        return tree
    }

    constructFlatArray() {
        for (let item of this.nodes) {
            let i = this.sparqlResults.find(el => { return el.directSub.value == item })
            if (typeof i == "undefined") {
                let id = this.classesMap.get(item)
                let custom = item
                this.classArray.push({ key: id, parentId: null, label: custom })
            } else {
                let id = this.classesMap.get(i.directSub.value)
                let parentId = this.classesMap.get(i.super.value)
                this.classArray.push({ key: id, parentId: parentId, label: i.directSub.value })
            }

        }
    }
}

