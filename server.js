var express = require('express');
var app = express();
var fs = require('fs');
const path = require("path")
const hello = require("./public/script");
const { db } = require('mongodb');
app.use(express.static(__dirname + "/public"));
const { MongoClient } = require("mongodb");
const uri= "mongodb+srv://jackmills200503:jackmills@neaproject.e9kaj.mongodb.net/?retryWrites=true&w=majority&appName=NEAProject"
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("Products")
    const shoes = database.collection("Shoes")
    const search = db.shoes.stats()
    console.log(search)

  } finally {

    await client.close();
  }
}
run().catch(console.dir);

app.get('/', function (req,res){
  res.sendFile(__dirname + '/public/index.html')
  
})
app.get('/products', function(req, res){
  res.sendFile(__dirname + '/public/products.html')
});

app.get('index.html', function (req,res){
  window.location.href = '/index'
})
app.get('/basket', function(req, res){
  res.sendFile(__dirname + '/public/basket.html')
});
app.get('/products/:id', function(req,res){
  res.send("ID:" + req.params.id);
});
app.get('*', function(req, res){
  res.send("Invalid URL.");
})
function testfunc(){
  console.log("test")
  hello()
}
testfunc()
app.listen(3000)