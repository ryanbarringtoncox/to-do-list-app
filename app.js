var http = require('http')
  ,path = require('path') 
  ,express = require('express')
  ,app = express()
  ,todoController;

//Todo = require("./models/todo.js");
todoController = require('./controllers/todo_controller.js');
  
app.configure(function() {
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.bodyParser());
});

http.createServer(app).listen(3000, function() {
  console.log("Server running on port 3000...")
});

app.get("/todos.json", todoController.list);
app.post("/todo/new", todoController.create);