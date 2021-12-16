let mongoose = require('mongoose')
  Schema = mongoose.Schema

let Ontology = new Schema({
  encoding: String,
  date:Date,
  rawText:String,
  name:String,
  filename:String,
  agentAction  : [{ type: Schema.Types.ObjectId, ref: 'AgentAction' }]
  
});


module.exports = mongoose.model('Ontology', Ontology);