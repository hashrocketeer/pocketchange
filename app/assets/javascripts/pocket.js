function drawPocketBubble(category_name, pocket_balance, order, startingCX, startingCY, newOrExisting){
//----------------------------------------//
//--------------POCKET-------------------//
//---------------------------------------//

var categoryNameText = paper.text(startingCX + pocket_balance*.75, startingCY - 20, category_name).attr("font-size", "14");
categoryNameText.attr("text-anchor", "start");
categoryNameText.attr("font-family", "Courier New");
everythingRightOfBudget.push(categoryNameText);

var pocketBalanceText = paper.text(startingCX, startingCY, pocket_balance).attr("font-size", "28");
pocketBalanceText.attr({opacity: 0, fill: "#fff", cursor: "move"});
pocketBalanceText.attr("font-family", "Courier New");
pocketBalanceText.animate({opacity: 1}, 400, "easeInOut");
everythingRightOfBudget.push(pocketBalanceText);

var pocketBalanceCircle = paper.circle(startingCX, startingCY, 0).attr({fill: "#333", stroke: "#CCC", cursor: "move"});
pocketBalanceCircle.animate({r: Math.max(pocket_balance*.75, 23)}, 1000, "elastic");
pocketBalanceText.toFront();
everythingRightOfBudget.push(pocketBalanceCircle);

var littleTriangle = paper.image("assets/blacktriangle.svg", startingCX + pocket_balance*.75 - 27, startingCY - 7, 35, 35)
everythingRightOfBudget.push(pocketBalanceCircle);

var spendDollarBubble = paper.circle(pocketBalanceCircle.attr("cx") + 150, pocketBalanceCircle.attr("cy"), 0).attr({fill: "#999", cursor: "e-resize"})
everythingRightOfBudget.push(spendDollarBubble);

var spendDollarText = paper.text(pocketBalanceCircle.attr("cx") + 150, pocketBalanceCircle.attr("cy"), "0").attr("font-size", "28");
spendDollarText.attr({opacity: 0, cursor: "e-resize"});
spendDollarText.attr("font-family", "Courier New");
everythingRightOfBudget.push(spendDollarText);

//Below is the third dragging functionality
//This allows the user to drag the New Pocket Money into the Pocket
var startPocketCircle = function () {
  // storing original coordinates
  categoryNameText.ox = categoryNameText.attr("x");
  categoryNameText.oy = categoryNameText.attr("y");
  pocketBalanceCircle.ox = pocketBalanceCircle.attr("cx");
  pocketBalanceCircle.oy = pocketBalanceCircle.attr("cy");
  pocketBalanceText.ox = pocketBalanceText.attr("x");
  pocketBalanceText.oy = pocketBalanceText.attr("y");
  littleTriangle.ox = littleTriangle.attr("x");
  littleTriangle.oy = littleTriangle.attr("y");
  
  pocketBalanceCircle.toFront();
  littleTriangle.toFront();
  pocketBalanceText.toFront();
};

var movePocketCircle = function (dx, dy) {
  // move will be called with dx and dy
  categoryNameText.attr({x: Math.min(Math.max(divider.attr("x") + 2*(pocket_balance*.75), categoryNameText.ox + dx), divider.attr("x") + 400), y: Math.min(Math.max(pocket_balance*.75 - 20, categoryNameText.oy + dy), 475 - pocket_balance*.75 - 20)})
  pocketBalanceCircle.attr({cx: Math.min(Math.max(divider.attr("x") + pocket_balance*.75, pocketBalanceCircle.ox + dx), divider.attr("x") + 400 - pocket_balance*.75), cy: Math.min(Math.max(pocket_balance*.75, pocketBalanceCircle.oy + dy), 475 - pocket_balance*.75)});
  pocketBalanceText.attr({x: Math.min(Math.max(divider.attr("x") + pocket_balance*.75, pocketBalanceText.ox + dx), divider.attr("x") + 400 - pocket_balance*.75), y: Math.min(Math.max(pocket_balance*.75, pocketBalanceText.oy + dy), 475 - pocket_balance*.75)});
  littleTriangle.attr({x: Math.min(Math.max(divider.attr("x") + 2*(pocket_balance*.75) - 27, littleTriangle.ox + dx), divider.attr("x") + 400 - 27), y: Math.min(Math.max(pocket_balance*.75, littleTriangle.oy + dy), 475 - pocket_balance*.75)});
};

var upPocketCircle = function (){
  pocket_x = pocketBalanceCircle.attr("cx");
  pocket_y = pocketBalanceCircle.attr("cy");
  
  // Grab the category that just changed
  var category = categories[order-1];
  
  //Update the category's pocket bubble x and y coordinates
  category.pocket_x = pocket_x;
  category.pocket_y = pocket_y;

  // Send the updated information to the server
  sendUpdate(category);
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
  };

pocketBalanceCircle.drag(movePocketCircle, startPocketCircle, upPocketCircle);
pocketBalanceText.drag(movePocketCircle, startPocketCircle, upPocketCircle);

littleTriangle.click(function(){
  spendDollarBubble.animate({r: 25}, 1000, "elastic");
  spendDollarText.animate({opacity: 1}, 200, "linear");
  //var pathStuff = ["M", pocketBalanceCircle.attr("cx") + pocketBalanceCircle.attr("r"), 
  //    pocketBalanceCircle.attr("cy"), "L", spendDollarBubble.attr("cx") - 25, pocketBalanceCircle.attr("cy")].join(",");
  //var lineToSpendBubble = paper.path(pathStuff);
  }
)

//Drag functionality for spendDollarBubble, allowing the user to adjust the dollar amount by dragging on the bubble
  //...put code here...//

}