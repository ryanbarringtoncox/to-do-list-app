var main = function () {
  
  //when remove icon is clicked...
  function assignRemoveClick() {
    $("img").click(function() {
      $(this).parent().fadeOut("slow", function() {
        $(this).remove();
      });
    });    
  }
  
  function appendToDOM(description, categories) {
    console.log(description);
    console.log(categories);
    
    //to do description
    $("#all-body").append("<div class='to-do'><img src='images/remove.png' class='remove' alt=''remove-icon'/>"+description+"</div>");
    
    //to do categories
    categories.forEach(function (category) {
      $("#all-body").append("<span class='category'>"+category+" </span>");
    });
    
    assignRemoveClick();
  }

  //get json file and populate DOM...
  $.getJSON("all.json", function (todos) {
    var i;
    var categorizedArray = new Array();
    
    //populate "All" body
    todos.forEach(function (todo) {
      
      appendToDOM(todo.description, todo.categories);

    });
 
    //populate categorizedArray
    todos.forEach(function (todo) {

      todo.categories.forEach(function(cat) {

        if (cat in categorizedArray) {
          //var tempArray = categorizedArray[cat];
          categorizedArray[cat].push(todo.description);
        }
        else {
          var tempArray = new Array;
          tempArray[0] = todo.description;
          categorizedArray[cat] = tempArray; 
        }
      });
      
    });
    
    //populate "Categorized" body        
    for (var key in categorizedArray) {
      
      //get the key aka category
      $("#categorized-body").append("<div class='to-do'>"+key+"</div>");
      
      //append descriptions
      var descriptions = categorizedArray[key];
      descriptions.forEach(function (descrip) {       

        $("#categorized-body").append("<div class=''><img src='images/remove.png' class='remove' alt='remove-icon'/>"+descrip+"</div>");
      })
    }
    
      //assign click handlers after images are placed in DOM
      assignRemoveClick();
    
  });
  
  //when a tab is clicked...
  $(".tab-wrapper > a").click(function() {
    
    //remove active class from all bodies and tabs
    $(".body").removeClass("active");
    $(".tab-wrapper").removeClass("active");
    
    //get class name
    var this_class = $(this).attr("class");
    
    //make corresponding tabs and body active
    $("#"+this_class+"-body").addClass("active");
    $(this).parent().addClass("active");
  });
  
  //when "add" is clicked
  $("button").click(function() {
    
    var description = $(".description-input").val();   
    var categories = $(".categories-input").val().split(",");
    
    //append to DOM
    appendToDOM(description, categories);
  })
  
}

$(document).ready(main);