var express = require('express');
var app = express();
var fs = require('fs');
const path = require("path")
const hello = require("./public/script")

app.use(express.static(__dirname + "/public"));
app.get('/', function (req,res){
  res.sendFile(__dirname + '/public/index.html')
  
})

app.get('/products', function(req, res){
  res.sendFile(__dirname + '/public/products.html')
});
app.get('/basket', function(req, res){
  res.sendFile(__dirname + '/public/basket.html')
});
app.post('/hello', function(req, res){
  res.send("Post method at '/hello'!\n");
});
app.all('/test', function(req, res){
  res.send("HTTP method doesn't have any effect on this route!");
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