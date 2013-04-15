var http = require('http')
  ,path = require('path')
  ,mongoose = require('mongoose') 
  ,express = require('express')
  ,app = express();

mongoose.connect('mongodb://localhost/development');

var TodoSchema = {
  "description": String,
  "categories": [String]
}

var Todo = mongoose.model("Todo", TodoSchema);

Todo.findOne({}, function (err, result) {
    if (err !== null) {
	console.log(err);
    } else if (result === null) {
	var p = new Todo({
	    "description": "Have fun",
	    "categories": ["work", "personal"]
	});

	p.save(function (err) {
	    if (err !== null) {
		console.log(err);
	    }
	});
    }
});
  
app.configure(function() {
   app.use(express.static(path.join(__dirname, "public")));
});

app.get("/todos.json", function(req, res) {
  //var todoObject = {};
  //todoObject.test = "Is this working";
  
  Todo.find({}, function(err, todos) {
    if(err!=null) {
      console.log(err);
    } else {
      res.json(todos);
      console.log("request made");
      console.log(todos);
    }
  })
});

http.createServer(app).listen(3000, function() {
  console.log("Server running on port 3000...")
});