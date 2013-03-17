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
  
  //assignRemoveClick();
}

function assignRemoveClickEvents() {
  //when "add" is clicked
  $("button").click(function() {
    
    //snatch input
    var description = $(".description-input").val();
    var categories = $(".categories-input").val().split(",");
    var categoriesArray = new Array()
    
    categories.forEach(function (cat) {
      cat = cat.replace(/\s+/g, '');
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
  })  ;
}

function assignTabClickEvents() {
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
    
    //no need to re-calculate DOM for 'add' body
    if (this_class === "add") {return};
    
    //clear the body
    $("#"+this_class+"-body").html("");
    
    //append latest JSON
    fillTheDOM(toDoArray);
    
    //assign click handlers after images are placed in DOM
    assignRemoveClick();
    
  });  
}

//when remove icon is clicked...
function assignRemoveClick() {
  
  $("img").click(function() {
    console.log("img click function call");
    $(this).parent().fadeOut("slow", function() {
      
      //remove from global array
      console.log($(this));
      
      //remove clicked to-do
      $(this).remove();
      
    });
  });    
}

function fillTheDOM(todos) {
  
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
    
    //assign click handlers after images are placed in DOM
    //assignRemoveClick();
    
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
}

//get json file and populate DOM...
function getJSON() {
  //console.log("getJSON() called")
  $.getJSON("all.json", function (todos) {
    
    toDoArray = todos;
    
    fillTheDOM(todos);
    
    assignRemoveClick();
    
  });  
}

var main = function () {

  getJSON();
  
  assignTabClickEvents();
  
  assignRemoveClickEvents();
  
}

$(document).ready(main);