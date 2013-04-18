var http = require('http')
  ,path = require('path') 
  ,express = require('express')
  ,app = express();

Todo = require("./models/todo.js");
  
app.configure(function() {
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.bodyParser());
});

app.get("/todos.json", function(req, res) {
  //var todoObject = {};
  //todoObject.test = "Is this working";
  
  Todo.find({}, function(err, todos) {
    if(err!=null) {
      console.log(err);
    } else {
      res.json(todos);
      //console.log("request made");
      //console.log(todos);
    }
  })
});

app.post("/todo/new", function(req, res) {
  //console.log("post called");
  var t = new Todo({
    "description": req.body.description,
    "categories": req.body.categories
  });
  
  t.save(function(err, result) {
    if (err!==null) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

http.createServer(app).listen(3000, function() {
  console.log("Server running on port 3000...")
});