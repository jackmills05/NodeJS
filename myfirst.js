var express = require('express');
var app = express();

app.get('/hello', function(req, res){
  res.send("Hello world!");
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


app.listen(3000)