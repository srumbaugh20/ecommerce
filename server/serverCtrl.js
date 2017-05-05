var app = require('./server.js');
var db = app.get('db');

module.exports = {


create: function(req, res, next){
  var name = req.body.name;
  var loc = req.body.location;
  var desc = req.body.descript;
  var img = req.body.imageURL;
  var large = req.body.price_large;
  var medium = req.body.price_medium;
  var small = req.body.price_small;


  db.create_product([name, loc, desc, img, large, medium, small], function(err){
    console.log(name);
      res.status(202).send("Item Created");
  });
},


getAll: function(req, res, next){

  db.get_templepaintings(function(err, temple_paintings) {
      res.status(200).send(temple_paintings);
  });
},

update: function(req, res, next){
  var name = req.body.name;
  var descr = req.body.descript;
  var loc = req.body.location;
  var img = req.body.imageURL;
  var large = req.body.price_large;
  var medium = req.body.price_medium;
  var small = req.body.price_small;
  var id = req.body.id;

  db.update_product([name, loc, descr, img, large, medium, small, id], function(err) {
    console.log(img);
      res.status(202).send("updated");

  });
},

delete: function(req, res, next){
  var id = req.body.id;
  db.delete_product([id], function(err) {
      res.status(200).send('Item deleted');
  });
}



};
