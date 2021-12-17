let mongoose = require('mongoose')
  Schema = mongoose.Schema

let AgentAction = new Schema({
  description: String,
  precondition:String,
  execution:String,
  name:String,  
});


module.exports = mongoose.model('AgentAction', AgentAction);