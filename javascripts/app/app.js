var main = function () {
  //console.log("hello world!");
  
  $.getJSON("all.json", function (todos) {
    var i;
    
    /*for (i = 0; i < todos.length; i++) {
      console.log(todos[i]);
    };
    */
    todos.forEach(function (todo) {
      //console.log(todo.description);
      $("#all-body").append("<div class='to-do'>"+todo.description+"</div>");
      todo.categories.forEach(function (category) {
        //console.log("  " + category);
        $("#all-body").append("<div class='category'>"+category+"</div>");
      });
    });
  });
}

$(document).ready(main);