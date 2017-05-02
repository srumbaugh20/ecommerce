var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var path = require('path');
var app = module.exports = express();


app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/../dist/')));

var conn = massive.connectSync({
  connectionString : "postgres://postgres:domrep20@localhost:5432/TemplePaintings"
});

app.set('db', conn);
var ctrl = require('./serverCtrl.js')
var db = app.get('db');



app.post("/create", ctrl.create)
app.get('/get', ctrl.getAll);
app.put('/update', ctrl.update);
app.delete('/delete', ctrl.delete);



var port = 3030;
app.listen(port, function() {
  console.log("Started server on port", port);
});
