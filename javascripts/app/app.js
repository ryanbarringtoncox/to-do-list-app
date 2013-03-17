//global JSON array for to-dos
var toDoArray;

//appends to "All" body
function appendAllDiv(description, categories) {

  //make category string
  var categoryString = "<span class='category'>( ";

  categories.forEach(function (category) {
    categoryString = categoryString.concat(category + " ");
  });

  categoryString = categoryString.concat(")</span>");

  //append to all body
  $("#all-body").append("<div class='to-do'><img src='images/remove.png' class='remove' alt=''remove-icon'/>"+description+categoryString+"</div>");

}

function appendCategorizedDiv(todos) {

    var i;
    var categorizedArray = new Array();  

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
}

function assignAddClickEvents() {
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
    
    //clear form
    $(".description-input").val("");
    $(".categories-input").val("");
    
    //append to DOM
    appendAllDiv(description, categories);
  });
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

function assignRemoveClick() {
  
  $("img").click(function() {
    
    $(this).parent().fadeOut("slow", function() {
      
      //remove from global array
      var descrip = $(this)[0].innerText.split("(");
      descrip = descrip[0];
      
      //get index of this description in global array
      var index = getIndex(descrip);
      
      //remove the global array index that matches descrip
      toDoArray.splice(index,1);
      
      //remove clicked to-do
      $(this).remove();
      
      //remove other occurrences of to-do.  for category body.
      $(".lil-to-do:contains("+descrip+")").fadeOut("slow", function() {
        $(this).remove();
      });
      
    });
  });    
}

function fillTheDOM(todos) {
  
  //populate "All" body
  todos.forEach(function (todo) {
    
    appendAllDiv(todo.description, todo.categories);

  });

  appendCategorizedDiv(todos);

}

function getIndex(descrip) {
  
  var index = -1 //not found
  var arr = new Array();
  var counter = 0;
  
  toDoArray.forEach(function (todo) {
    if (descrip === todo.description) {index = counter;}
    counter++;
  })
  
  return index;
}

//get json file and populate DOM...
function getJSON() {
  $.getJSON("all.json", function (todos) {
    
    toDoArray = todos;
    
    fillTheDOM(todos);
    
    assignRemoveClick();
    
  });  
}

//main flow of control
var main = function () {

  getJSON();
  
  assignTabClickEvents();
  
  assignAddClickEvents();
  
}

$(document).ready(main);