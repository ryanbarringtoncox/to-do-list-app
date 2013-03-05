var main = function () {

  //get json file of to-dos
  $.getJSON("all.json", function (todos) {
    var i;
    
    //populate "All" body
    todos.forEach(function (todo) {
      
      //to do description
      $("#all-body").append("<div class='to-do'>"+todo.description+"</div>");
      
      //to do categories
      todo.categories.forEach(function (category) {
        $("#all-body").append("<div class='category'>"+category+"</div>");
      });
    });
  });
  
  //when a tab is clicked...
  $("#tabs > a").click(function() {
    
    //remove active class from all bodies
    $(".body").removeClass("active");
    
    //get class name
    var this_class = $(this).attr("class");
    
    //make corresponding body div active
    $("#"+this_class+"-body").addClass("active");
  });
}

$(document).ready(main);