let express = require('express');
let Product = require("../models/post.js");
let mongoose = require("mongoose");

module.exports = function(app){

  // add a burger, api route defined below
  app.get('/api/products', function(req, res){
    mongoose.model('Product').find(function(err, newProduct) {
      res.json(newProduct);
    });
  });

  app.get('/api/history', function(req, res){
    mongoose.model('Product').find(function(err, newProduct) {
      res.json(newProduct);
    });
  });

  app.post("/api/products", function(req, res) {
    var newProduct = new Product({
      productid: req.body.productid,
      url: req.body.url,
      liked: req.body.liked,
      name: req.body.name,
      material: req.body.material,
      style: req.body.style,
      color: req.body.color,
      brand: req.body.brand
    })
    console.log(newProduct);
      res.json(newProduct);
      newProduct.save(res)
    });

  app.delete("/api/new/:id", function(req, res){

  });

  app.delete("/api/new/:id", function(req, res) {

  });

};
//   app.put("/api/new", function(req, res){
//     db.products.update({
//       liked: ,
//       material: ,
//       style: ,
//       color: ,
//       brand: 
//     }, {
//       where: {
//         productid:req.body.productid
//       }
//     })

//   });
// }