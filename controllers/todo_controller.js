var Todo = require("../models/todo.js"),
  TodoController = {};
  
TodoController.list = function(req, res) {
  Todo.find({}, function(err, todos) {
    if(err!=null) {
      console.log(err);
    } else {
      res.json(todos);
    }
  }) 
};

TodoController.create = function(req, res) {
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
};

TodoController.remove = function(req, res) {
  console.log("remove controller called!");
  
}
  
module.exports = TodoController;
