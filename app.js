var http = require('http')
  ,express = require('express')
  ,path = require('path');
  
var app = express();

app.configure(function() {
   app.use(express.static(path.join(__dirname, "public")));
});

http.createServer(app).listen(3000, function() {
  console.log("Server running on port 3000...")
});