var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var path = require('path');
var stripeKey = require('./stripeSK.js');
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



app.post("/createtemple", ctrl.create_temple);
app.post("/createwatercolor", ctrl.create_watercolor);
app.post("/api/payment", ctrl.processPayment);
app.get('/get/temples', ctrl.getTemples);
app.get('/get/orders', ctrl.getOrders);
app.get('/get/watercolors', ctrl.getWatercolors);
app.get('/get/contact', ctrl.getContact);
app.put('/api/updatewater', ctrl.updateWater);
app.put('/api/updatetemple', ctrl.updateTemple);
app.delete('/deletetemples/:id', ctrl.deletetemples);
app.delete('/deletewatercolor/:id', ctrl.deletewatercolor);
app.delete('/api/deleteorder/:id', ctrl.deleteorder);



var port = 3030;
app.listen(port, function() {
  console.log("Started server on port", port);
});
