var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/development');

var TodoSchema = {
  "description": String,
  "categories": [String]
}

var Todo = mongoose.model("Todo", TodoSchema);

//if db is empty, save an initial todo to database
Todo.findOne({}, function (err, result) {
  if (err !== null) {
	console.log(err);
    } else if (result === null) {
      	var p = new Todo({
      	    "description": "Have fun",
      	    "categories": ["health", "personal"]
      	});
      
      	p.save(function (err) {
      	  if (err !== null) {
      		console.log(err);
      	    }
      	});
      }
});

module.exports = Todo;