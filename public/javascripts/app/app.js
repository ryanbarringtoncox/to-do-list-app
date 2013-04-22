var todoArray;

//update todoArray from db
function updateTodoArray(callback) {
    $.getJSON("/todos.json", function (todos) {
      todoArray = todos;
      console.log("todos routed from json");
      console.log(todos);
      if (callback) {
        callback();        
      }
    });  
}

//appends to "All" body
function appendAllDiv(todos) {
  console.log("appendAllDiv called")
  console.log(todos);
  
    //populate "All" body
  todos.forEach(function (todo) {
        
    //make category string
    var categoryString = "<span class='category'>( ";
  
    todo.categories.forEach(function (category) {
      categoryString = categoryString.concat(category + " ");
    });
  
    categoryString = categoryString.concat(")</span>");
  
    //append to all body
    $("#all-body").append("<div class='to-do'><img src='images/remove.png' class='remove' alt=''remove-icon'/>"+todo.description+categoryString+"</div>");

  });
}

function appendCategorizedDiv(todos) {

  var i
  ,categorizedArray = new Array();  

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
    var categoriesArray = new Array();
    
    //simple validation
    if (description === "") {
      alert("You must add a description!");
    } else {
        categories.forEach(function (cat) {
          cat = cat.replace(/\s+/g, '');
          categoriesArray.push(cat);
        });
        
        //create the post object
        var todoPostObject = {
            "description": description,
            "categories": categoriesArray     
        };
        console.log("error yet?");      
        $.post("/todo/new", todoPostObject, function(res) {
          
          //clear form
          $(".description-input").val("");
          $(".categories-input").val("");
          
          //append to DOM
          //appendAllDiv(description, categories);
          updateTodoArray(); 
               
        });
      }
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
    
    console.log("this class is " + this_class);
    
    //no need to re-calculate DOM for 'add' body
    if (this_class !== "add") {
    
      //clear the body
      $("#"+this_class+"-body").html("");
      
      //append latest JSON
      updateDOM();
    } else {return; }
  });  
}

function assignRemoveClick() {
  
  $("img").click(function() {
    
    $(this).parent().fadeOut("slow", function() {
      
      //get description string
      var descrip = $(this)[0].innerText.split("(");
      descrip = descrip[0];
      
      //remove from mongoDB
      $.post("/todos/remove", {"description" : descrip}, function(res) {
        //console.log("res is " + res);
        
        updateTodoArray();
        
      });
      
      //clear matching todos from DOM
      $(".lil-to-do:contains('"+descrip+"')").fadeOut("slow", function() {
        $(this).remove();
      });
       $(".to-do:contains('"+descrip+"')").fadeOut("slow", function() {
        $(this).remove();
      });    
      
    });
  });    
}

//get json file and populate DOM...
function updateDOM() {
  console.log("updateDOM called");
  console.log(todoArray)
        
  //populate all and categorized bodies
  appendAllDiv(todoArray);
  appendCategorizedDiv(todoArray);
  
  assignRemoveClick();
    
}

//main flow of control
var main = function () {
  
  //update array
  updateTodoArray(function() {
    
    //update DOM
    updateDOM();
    assignTabClickEvents();
    assignAddClickEvents();
    
  }); 
}

$(document).ready(main);