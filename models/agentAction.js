let mongoose = require('mongoose')
  Schema = mongoose.Schema

let AgentAction = new Schema({
  description: String,
  precondition:String,
  effect:String,
  name:String,  
});


module.exports = mongoose.model('AgentAction', AgentAction);