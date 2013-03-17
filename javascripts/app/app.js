//global JSON array for to-dos
var toDoArray;

function appendToDOM(description, categories) {
  
  //make category string
  var categoryString = "<span class='category'>( ";
  
  categories.forEach(function (category) {
    categoryString = categoryString.concat(category + " ")
    //$("#all-body").append("<span class='category'>"+category+" </span>");
  });  
  
  categoryString = categoryString.concat(")</span>");
  
  //append to all body
  $("#all-body").append("<div class='to-do'><img src='images/remove.png' class='remove' alt=''remove-icon'/>"+description+categoryString+"</div>");
  
  assignRemoveClick();
}

//when remove icon is clicked...
function assignRemoveClick() {
  
  $("img").click(function() {
    $(this).parent().fadeOut("slow", function() {
      //remove clicked to-do
      $(this).remove();
      //remove all divs with description text
      
    });
  });    
}

//get json file and populate DOM...
function getJSON() {
  $.getJSON("all.json", function (todos) {
    
    toDoArray = todos;
    
    //console.log(toDoArray);
    
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
      $("#categorized-body").append("<div class='category-header'>"+key+"</div>");
      
      //append descriptions
      var descriptions = categorizedArray[key];
      descriptions.forEach(function (descrip) {       

        $("#categorized-body").append("<div class='lil-to-do'><img src='images/remove.png' class='remove cat-remove' alt='remove-icon'/>"+descrip+"</div>");
      })
    }
    
      //assign click handlers after images are placed in DOM
      assignRemoveClick();
    
  });  
}

var main = function () {

  getJSON();
  
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
    
    //snatch input
    var description = $(".description-input").val();
    var categories = $(".categories-input").val().split(",");
    var categoriesArray = new Array()
    
    categories.forEach(function (cat) {
      categoriesArray.push(cat);
    });
    
    //append to global array
    toDoArray.push({
        "description": description,
        "categories": categoriesArray
    });
    //console.log(toDoArray);
    
    //clear form
    $(".description-input").val("");
    $(".categories-input").val("");
    
    //append to DOM
    appendToDOM(description, categories);
  })
  
}

$(document).ready(main);