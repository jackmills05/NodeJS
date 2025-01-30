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
    const database = client.db('products');
    const products = database.collection('Shoes');
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const productsOutput = await movies.findOne();
    console.log(productsOutput);
  } finally {
    // Ensures that the client will close when you finish/error
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