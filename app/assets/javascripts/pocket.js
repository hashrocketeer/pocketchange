function drawPocketBubble(category_name, pocket_balance, startingCX, startingCY){
//----------------------------------------//
//--------------POCKET-------------------//
//---------------------------------------//

var categoryNameText = paper.text(startingCX + pocket_balance*.75, startingCY - 20, category_name).attr("font-size", "14");
categoryNameText.attr("text-anchor", "start");
categoryNameText.attr("font-family", "Courier New");

var pocketBalanceText = paper.text(startingCX, startingCY, pocket_balance).attr("font-size", "28");
pocketBalanceText.attr({opacity: 0, fill: "#fff", cursor: "move"});
pocketBalanceText.attr("font-family", "Courier New");
pocketBalanceText.animate({opacity: 1}, 400, "easeInOut");

var pocketBalanceCircle = paper.circle(startingCX, startingCY, 0).attr({fill: "#333", stroke: "#CCC", cursor: "move"});
pocketBalanceCircle.animate({r: pocket_balance*.75}, 1000, "elastic");
pocketBalanceText.toFront();

var littleTriangle = paper.image("assets/blacktriangle.svg", startingCX + pocket_balance*.75 - 27, startingCY - 7, 35, 35)

var spendDollarBubble = paper.circle(pocketBalanceCircle.attr("cx") + 150, pocketBalanceCircle.attr("cy"), 0).attr({fill: "#999", cursor: "e-resize"})

var spendDollarText = paper.text(pocketBalanceCircle.attr("cx") + 150, pocketBalanceCircle.attr("cy"), "0").attr("font-size", "28");
spendDollarText.attr({opacity: 0, cursor: "e-resize"});
spendDollarText.attr("font-family", "Courier New");

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
  categoryNameText.attr({x: Math.max(divider.attr("x") + 2*(pocket_balance*.75), categoryNameText.ox + dx), y: Math.max(pocket_balance*.75 - 20, categoryNameText.oy + dy)})
  pocketBalanceCircle.attr({cx: Math.max(divider.attr("x") + pocket_balance*.75, pocketBalanceCircle.ox + dx), cy: Math.max(pocket_balance*.75, pocketBalanceCircle.oy + dy)});
  pocketBalanceText.attr({x: Math.max(divider.attr("x") + pocket_balance*.75, pocketBalanceText.ox + dx), y: Math.max(pocket_balance*.75, pocketBalanceText.oy + dy)});
  littleTriangle.attr({x: Math.max(divider.attr("x") + 2*(pocket_balance*.75) - 27, littleTriangle.ox + dx), y: Math.max(pocket_balance*.75, littleTriangle.oy + dy)});
};

var upPocketCircle = function (){
  
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