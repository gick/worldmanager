let mongoose = require('mongoose')
  Schema = mongoose.Schema

let AgentQuery = new Schema({
  query: String,
  name:String,  
});


module.exports = mongoose.model('AgentQuery', AgentQuery);