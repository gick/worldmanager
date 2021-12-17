let AgentAction = require('../models/agentAction')
let AgentQuery = require('../models/agentQuery')
const { Operation } = require('../ontologyOperations/basicOperation')
let operation = new Operation()

const router = require('express').Router();
let OntoModel = require('../models/ontoModel')

router.get('/newAgentAction', async function (req, res) {
    let action = new AgentAction({ description: req.query.description,
         precondition: req.query.precondition,
         execution: req.query.execution,
          name:req.query.name    
        })
    let savedAgent = await action.save()
    let onto=await OntoModel.findById(req.query.id)
    onto.agentAction.push(savedAgent._id)
    onto.save()
    res.send({ success: true })
})

router.get('/newAgentQuery', async function (req, res) {
    let query = new AgentQuery({ query: req.query.query,
         name: req.query.name,
        })
    let savedQuery = await query.save()
    let onto=await OntoModel.findById(req.query.id)
    onto.agentQuery.push(savedQuery._id)
    onto.save()
    res.send({ success: true, query:savedQuery})
})

router.get('/deleteQuery', async function (req, res) {
    let query = await AgentQuery.findOneAndDelete(req.query.id)
    res.send({ success: true,query:query })
})

router.get('/execQuery', async function (req, res) {
    let query= await AgentQuery.findById(req.query.queryId)
    operation.runQuery(req.query.ontoId,query.query)
    .then((queryResult)=>{
        res.send({success:true,queryResult})
    })
    .catch((e) => {
        console.log(e)
        res.send({ success: false, error: e.toString() })

    })
})

router.get('/deleteAction', async function (req, res) {
    let onto = await AgentAction.findOneAndDelete(req.query.id)
    res.send({ success: true })
})



router.get('/allActions', async function (req, res) {
    let actions=await AgentAction.find({})
    res.send(actions)
})
module.exports = router;