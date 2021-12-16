let AgentAction = require('../models/agentAction')
const router = require('express').Router();

router.get('/agentAction', async function (req, res) {
    let action = new AgentAction({ description: req.query.description,
         precondition: req.query.precondition,
          effect: req.query.effect,
          name:req.query.name    
        })
    const savedAgent = await action.save()
    res.send({ ok: true })
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