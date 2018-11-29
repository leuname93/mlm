'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var path = require('path');
var methodOverride = require("method-override");


const app = express();
var api = require('./routes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(logger('dev'));

app.use('/api', api)

app.use(express.static(__dirname + '/public'));
//app.set('views', path.join(__dirname, '/public'));
app.get('*', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
})

app.set('port', process.env.PORT || 3000);

app.listen( app.get('port') , ()=>{
    console.log(`API REST Server on port: ${app.get('port')}`);
})

mongoose.connect('mongodb://localhost:27017/mlm', { useNewUrlParser: true })
.then( db => console.log('Data Base Connected'))
.catch(err => console.log(err));

module.exports = app; 





