var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var path = require('path');
var stripeKey = require('./stripeSecretKeys.js');
var stripe = require('stripe')(stripeKey.secretKey);
var app = module.exports = express();


app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/../dist/')));

var conn = massive.connectSync({
  connectionString : "postgres://postgres:domrep20@localhost:5432/Paintings"
});

app.set('db', conn);
var ctrl = require('./serverCtrl.js')
var db = app.get('db');



app.post("/create/temples", ctrl.create_temples);
app.post("/create/watercolors", ctrl.create_watercolors);
app.post("/api/payment", ctrl.processPayment);
app.get('/get/temples', ctrl.getTemples);
app.get('/get/orders', ctrl.getOrders);
app.get('/get/watercolors', ctrl.getWatercolors);
app.get('/get/contact', ctrl.getContact);
app.put('/update', ctrl.update);
app.delete('/delete', ctrl.delete);
app.delete('/api/deleteorder/:id', ctrl.deleteorder);



var port = 3030;
app.listen(port, function() {
  console.log("Started server on port", port);
});
