let dev=process.env.NODE_ENV=="development"
let prod=process.env.NODE_ENV=="production"
console.log(process.env.NODE_ENV)
let mongoStringConnect
if(dev){
  mongoStringConnect='mongodb://localhost/worldmanager'
}
if(prod){
  mongoStringConnect='mongodb://mongo:27017/worldmanager'
}
const express = require('express')
const Hylar = require('hylar')
const h=new Hylar()
const mongoose = require('mongoose');
const app = express();
var cors = require('cors')
mongoose.connect(mongoStringConnect, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
  if (err) {
    console.log('Could not connect to mongodb on localhost. Ensure that you have mongodb running on localhost and mongodb accepts connections on standard ports!');
  }
});

app.use(cors({credentials: true, origin: 'http://localhost:8080'}));
app.use(express.static('web/dist'))
app.use('/',require('./routes/ontoRoutes'))
app.use('/',require('./routes/actionRoutes'))

app.listen(3000) 