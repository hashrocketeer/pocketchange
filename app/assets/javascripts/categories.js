var categories = [];

function drawCategory(category_name, dollars, order) {
  //Generating text
  var name = paper.text(order*75 + 20, 220, category_name);
  var amount = paper.text(order*75 + 20, 230, dollars);
  var edit = paper.text(order*75 + 20, 240, 'edit');	
  
  //--------------------------------------//	
  //These are the 3 bars: Starting Balance, Current Balance, New Pocket Money
  //Starting Balance is static (for now)
  //Current Balance is draggable up and down
  //New Pocket Money only appears when you drag the Current Balance down
  //...and once it appears, it is draggable in all directions
  
  //STARTING BALANCE
  var rectstartingBalance = paper.rect(order*75, 200 - dollars/10, 51, dollars/10 + 10, 5).attr({fill: "#000", opacity: .15, stroke: "#000"});
  
  //Make it glow a little bit.
  rectstartingBalance.glow({width: 2, opacity: .1});
  
  //NEW POCKET MONEY
  var recttoPocket = paper.rect(order*75, 200 - dollars/10, 50, 0, 5).attr({fill: "#33CCCC", opacity: 1, stroke: "#33CCCC", cursor: "move"});
  
  //CURRENT BALANCE
  var rect = paper.rect(order*75, 200 - dollars/10, 50, dollars/10 + 10, 5).attr({fill: "#006633", opacity: .75, stroke: "#336633", cursor: "s-resize"});
  // categories.push(rect);
  
  //--------------------------------------//
  //Below is the first dragging functionality
  //This allows the user to drag on the Current Balance bar to create
  //the New Pocket Money
  //::::::::::::::::::::://
  var heightP, rectP;

  var debug = function() {
    console.log("Rect height:", rectP.attr("height"));
    console.log("Rect y:", rectP.attr("y"));
  };


  var start = function () {
    // storing original coordinates: 
    // Current Balance height, Y position, and fill color
    rect.oHeight = rect.attr("height");
    rect.oy = rect.attr("y");
    rect.attr("fill", "003300");
    // New Pocket Money height and Y position
    heightP = recttoPocket.attr("height");
    rectP = recttoPocket.attr("y");
  };
  //:::::::::::::::::::::://
  var move = function (dx, dy) {
    // move will be called with dx and dy
    // console.log(rect.oHeight, rect.attr("height"));
    rect.attr({height: rect.oHeight - dy, y: rect.oy + dy});
    recttoPocket.attr({height: heightP + dy});
  };
  //::::::::::::::://
  var up = function () {
    // restoring state
    rect.attr("fill", "#006633");
  };

  //Drag!
  rect.drag(move, start, up);
  
  //-----------------------------------------//
  //Below is the second dragging functionality
  //This allows the user to drag the New Pocket Money into the Pocket
  var startP = function () {
    // storing original coordinates
    recttoPocket.ox = recttoPocket.attr("x");
    recttoPocket.oy = recttoPocket.attr("y");
  };

  var moveP = function (dx, dy) {
    // move will be called with dx and dy
    recttoPocket.attr({x: recttoPocket.ox + dx, y: recttoPocket.oy + dy});
  };

  var upP = function (){
    //here is where I'll put the 'if' 'else' 'greater than' 'less than' stuff
    //... to determine if the New Pocket Money has been dropped in the pocket
    //... and then all the stuff that submits the changes and updates the balances
  };

  recttoPocket.drag(moveP, startP, upP);
}
