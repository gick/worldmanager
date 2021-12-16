const multer = require('multer')
let fs = require('fs')
let OntoModel = require('../models/ontoModel')
const { Operation } = require('../ontologyOperations/basicOperation')
const router = require('express').Router();
const storage = multer.memoryStorage() // memoryStorage() is not a function
const upload = multer({ storage: storage })
let operation = new Operation()
router.post('/uploadOntology', upload.single('ontology'), async function (req, res) {
    let onto = new OntoModel({ encoding: req.body.encoding, rawText: req.file.buffer.toString('utf8'), filename: req.file.originalname,name:req.body.name, date: Date.now() })
    const savedOnto = await onto.save()
    res.send({ ok: true })
});

router.get('/ontologies', async function (req, res) {
    let onto = await OntoModel.find({})
    res.send(onto)
})

router.get('/deleteOntology', async function (req, res) {
    let onto = await OntoModel.findOneAndDelete(req.query.id)
    res.send({ success: true })
})

router.get('/runQuery', async function (req, res) {
    let onto = await operation.runQuery(req.query.id,req.query.query)

    res.send(onto)
})

router.get('/jsonHierarchy', async function(req,res){
    operation.getHierarchyAsJSON(req.query.id)
    .then((resp) => {
        console.log(resp)
        res.send({ success: true, statements: resp })
    })
    .catch((e) => {
        console.log(e)
        res.send({ success: false, error: e.toString() })

    })

})

router.get('/ontologyHierarchy', async function(req,res){
    operation.getHierarchy(req.query.id)
    .then((resp) => {
        console.log(resp)
        res.send({ success: true, statements: resp })
    })
    .catch((e) => {
        console.log(e)
        res.send({ success: false, error: e.toString() })

    })

})

router.get('/validate', async function (req, res) {

    operation.validateOnto(req.query.id)
        .then((resp) => {
            console.log(resp)
            let variable=Object.keys(resp[0])
            res.send({ success: true, statements: resp,variables:variable })
        })
        .catch((e) => {
            console.log(e)
            res.send({ success: false, error: e.toString() })

        })
})
module.exports = router;