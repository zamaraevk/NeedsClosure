var express = require('express');

var app = express();

app.use(express.static(__dirname + "/client"));
app.use(express.static(__dirname + "/node_modules"));

console.log(__dirname + "/node_modules");

app.listen(process.env.PORT || 3000, function(){
  console.log('Server is running');
});
