var categories = [];
var currentTotalText;
var divider;
var startingTotalBar;
var currentTotalBar;
//var pocketBalanceText;
//var pocketBalanceCircle;


function drawCategory(category_name, starting_balance, current_balance, pocket_balance, order, current_total, starting_total) {
  //Generating text
  var name = paper.text(order*75 + 25, 415, category_name).attr("font-size", "12");
  var amount = paper.text(order*75 + 25, 440, current_balance).attr("font-size", "28");
  currentTotalText = paper.text(300, 30, current_total).attr("font-size", "28");
  currentTotalText.hide();
  
  //Boundary between budget and pocket
  divider = paper.rect(order*75 + 125, 0, 1, 500).attr({opacity: .4});
  divider.hide();
  
  //--------------------------------------//	
  //These are the 5 bars: Starting Balance, Current Balance, New Pocket Money, Starting Total, Current Total
  //Starting Balance is static (for now)
  //Current Balance is draggable up and down
  //New Pocket Money only appears when you drag the Current Balance down
  //...and once it appears, it is draggable in all directions
  
  //STARTING BALANCE
  var rectStartingBalance = paper.rect(order*75, 400 - starting_balance/3, 51, starting_balance/3, 5).attr({fill: "#000", opacity: .15, stroke: "#000"});
  
  //Make it glow a little bit.
  rectStartingBalance.glow({width: 2, opacity: .1});
  
  //NEW POCKET MONEY
  var rectToPocket = paper.rect(order*75, 400 - current_balance/3, 50, 0, 5).attr({fill: "#fff", opacity: 1, stroke: "#000", cursor: "move"});
  
  //CURRENT BALANCE
  var rect = paper.rect(order*75, 400 - current_balance/3, 50, current_balance/3, 5).attr({fill: "#006633", opacity: .75, stroke: "#336633", cursor: "s-resize"});

  //STARTING TOTAL
  startingTotalBar = paper.rect(75, 460, order*75 - 25, 6, 2).attr({fill: "#000", opacity: .09, stroke: "#000"});
  startingTotalBar.hide();
  
  //CURRENT TOTAL
  currentTotalBar = paper.rect(75, 460, (current_total/starting_total)*(order*75 - 25), 6, 2).attr({fill: "#006633", opacity: .55, stroke: "#336633"});
  currentTotalBar.hide();

  //--------------------------------------//
  //Below is the first dragging functionality
  //This allows the user to drag down on the Current Balance bar to create
  //This allows the user to drag on the Current Balance bar to create
  //the New Pocket Money
  //::::::::::::::::::::://
  var heightP, rectP; 
  var pMoneyAmount = paper.text(rectToPocket.attr("x") + 25, rectToPocket.attr("y") - 15, Math.round(rectToPocket.attr("height"))).attr("font-size", "28");
  pMoneyAmount.attr({cursor: "move"});
	pMoneyAmount.hide();

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
    //This is for cases where money has already been moved
    if(rectToPocket.attr("x") > divider.attr("x")){
      rectToPocket.show();
      rectToPocket.attr({x: rect.attr("x"), y: rect.oy, opacity: .75, height: 0})
    };
    // New Pocket Money height and Y position
    heightP = rectToPocket.attr("height");
    rectP = rectToPocket.attr("y");
    // Text
    //newBalance = amount.attr("text");
    pMoneyAmount.attr("text");
    //Current Total width and fill color
    currentTotalBar.oWidth = currentTotalBar.attr("width");
    currentTotalBar.attr("fill", "003300");
  };
  //:::::::::::::::::::::://
  var move = function (dx, dy) {
    // move will be called with dx and dy
    // console.log(rect.oHeight, rect.attr("height"));
    rect.attr({height: Math.max(0, Math.min(rect.oHeight - dy/6, current_balance/3)), y: Math.min(400, Math.max(rect.oy + dy/6, 400 - current_balance/3))});
    rectToPocket.attr({height: Math.min(current_balance/3, Math.max(0, heightP + dy/6))});
    //Text stuff
    amount.attr({text: Math.round(rect.attr("height")*3)});
    pMoneyAmount.show();
    pMoneyAmount.attr({text: current_balance - Math.round(rect.attr("height")*3)});
    //Current Total
    //The math here is wrong, to be fixed eventually.
    currentTotalBar.attr({width: Math.max(0, Math.min(currentTotalBar.oWidth - dy/6, (current_total/starting_total)*(order*75 - 25)))});
  };
  //::::::::::::::://
  var up = function () {
    // restoring state
    rect.attr("fill", "#006633");
    rectToPocket.attr({opacity: 1});
    currentTotalBar.attr("fill", "#006633");
    $(".balance").val(Math.round(rect.attr("height")*3));
  };

  //Drag!
  rect.drag(move, start, up);
  
  //-----------------------------------------//
  //Below is the second dragging functionality
  //This allows the user to drag the New Pocket Money into the Pocket
  
  var startP = function () {
    // storing original coordinates
    rectToPocket.ox = rectToPocket.attr("x");
    rectToPocket.oy = rectToPocket.attr("y");
    pMoneyAmount.ox = pMoneyAmount.attr("x");
    pMoneyAmount.oy = pMoneyAmount.attr("y");
  };

  var moveP = function (dx, dy) {
    // move will be called with dx and dy
    rectToPocket.attr({x: rectToPocket.ox + dx, y: rectToPocket.oy + dy});
    pMoneyAmount.attr({x: pMoneyAmount.ox + dx, y: pMoneyAmount.oy + dy});
    rectToPocket.toFront();
    pMoneyAmount.toFront();
  };

  var upP = function (){
    //here is where I'll put the 'if' 'else' 'greater than' 'less than' stuff
    //... to determine if the New Pocket Money has been dropped in the pocket
    //... and then all the stuff that submits the changes and updates the balances
    if(rectToPocket.attr("x") > divider.attr("x")){
      rectToPocket.animate({opacity: 0}, 100, "easeInOut", function(){rectToPocket.hide()});
      pMoneyAmount.animate({opacity: 0}, 100, "easeInOut",function(){pMoneyAmount.hide()});
      pocket_balance = pocket_balance + current_balance - Math.round(rect.attr("height")*3);
      drawPocketBubble(category_name, pocket_balance, rectToPocket.attr("x") + 25, rectToPocket.attr("y"));

      // Grab the category that just changed
      var category = categories[order-1];

      // Update the category's balance
      category.current_balance = Math.round(rect.attr("height")*3);

      // Update the category's pocket balance
      category.pocket_balance =  pocket_balance;

      // Send the updated information to the server
      sendUpdate(category);
      //pocketBalanceText = paper.text(rectToPocket.attr("x") + 25, rectToPocket.attr("y"), pocket_balance).attr("font-size", "28");
      //pocketBalanceText.attr({opacity: 0, fill: "#fff"});
      //pocketBalanceText.animate({opacity: 1}, 400, "easeInOut");
      //pocketBalanceCircle = paper.circle(rectToPocket.attr("x") + 25, rectToPocket.attr("y")).attr({fill: "#333", stroke: "#333"})
      //pocketBalanceCircle.animate({r: pocket_balance*.75}, 1000, "elastic");
      //pocketBalanceText.toFront();
      };
  };

  var sendUpdate = function(category) {
    // Callback for after the server responds
    var onSuccess = function(data) {
      console.log(data);
    };

    // Our hand-rolled parameter to post
    // Ends up looking like:
    //
    // category[pocket_balance]=123
    // category[current_balance]=321
    // ... etc ...
    var changes = { category: category, _method: 'put' }

    // Post the changes, jQuery-style
    $.post('/categories/'+category.id, changes, onSuccess, 'json');
  }

  rectToPocket.drag(moveP, startP, upP);
  pMoneyAmount.drag(moveP, startP, upP);
  
}
