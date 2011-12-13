function drawPocketBubble(category_name, pocket_balance, order, startingCX, startingCY, newOrExisting){
//----------------------------------------//
//--------------POCKET-------------------//
//---------------------------------------//

var categoryNameText = paper.text(startingCX + pocket_balance, startingCY - 20, category_name).attr("font-size", "14");
categoryNameText.attr("text-anchor", "start");
categoryNameText.attr("font-family", "Courier New");
everythingRightOfBudget.push(categoryNameText);

var pocketBalanceText = paper.text(startingCX, startingCY, pocket_balance).attr("font-size", "28");
pocketBalanceText.attr({opacity: 0, fill: "#fff", cursor: "move"});
pocketBalanceText.attr("font-family", "Courier New");
pocketBalanceText.animate({opacity: 1}, 400, "easeInOut");
everythingRightOfBudget.push(pocketBalanceText);

var pocketBalanceCircle = paper.circle(startingCX, startingCY, 0).attr({fill: "#333", stroke: "#CCC", cursor: "move"});
pocketBalanceCircle.animate({r: Math.max(pocket_balance, 23)}, 1000, "elastic");
pocketBalanceText.toFront();
everythingRightOfBudget.push(pocketBalanceCircle);

var littleTriangle = paper.image("assets/blacktriangle.svg", startingCX + pocket_balance - 27, startingCY - 7, 35, 35)
everythingRightOfBudget.push(littleTriangle);

var spendDollarSet = paper.set();

var spendDollarBubble = paper.circle(pocketBalanceCircle.attr("cx"), pocketBalanceCircle.attr("cy"), 0).attr({fill: "#999", cursor: "e-resize"})
everythingRightOfBudget.push(spendDollarBubble);
spendDollarSet.push(spendDollarBubble);

var spendDollarText = paper.text(pocketBalanceCircle.attr("cx"), pocketBalanceCircle.attr("cy"), "0").attr("font-size", "28");
spendDollarText.attr({opacity: 0, cursor: "e-resize"});
spendDollarText.attr("font-family", "Courier New");
everythingRightOfBudget.push(spendDollarText);
spendDollarSet.push(spendDollarText);

var spendLittleTriangle = paper.image("assets/blacktriangle.svg", pocketBalanceCircle.attr("cx"), pocketBalanceCircle.attr("cy"), 35, 35)
everythingRightOfBudget.push(spendLittleTriangle);
spendDollarSet.push(spendLittleTriangle);
spendDollarSet.hide();

var centsBubble = paper.circle(pocketBalanceCircle.attr("cx") + 50, pocketBalanceCircle.attr("cy"), 0).attr({fill: "#999", cursor: "e-resize"});
centsBubble.hide();

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
  
  //pocketBalanceCircle.toFront();
  //littleTriangle.toFront();
  //pocketBalanceText.toFront();
};

var movePocketCircle = function (dx, dy) {
  // move will be called with dx and dy
  categoryNameText.attr({x: Math.min(Math.max(divider.attr("x") + 2*(pocket_balance), categoryNameText.ox + dx), divider.attr("x") + 400), y: Math.min(Math.max(pocket_balance - 20, categoryNameText.oy + dy), 475 - pocket_balance - 20)})
  pocketBalanceCircle.attr({cx: Math.min(Math.max(divider.attr("x") + pocket_balance, pocketBalanceCircle.ox + dx), divider.attr("x") + 400 - pocket_balance), cy: Math.min(Math.max(pocket_balance, pocketBalanceCircle.oy + dy), 475 - pocket_balance)});
  pocketBalanceText.attr({x: Math.min(Math.max(divider.attr("x") + pocket_balance, pocketBalanceText.ox + dx), divider.attr("x") + 400 - pocket_balance), y: Math.min(Math.max(pocket_balance, pocketBalanceText.oy + dy), 475 - pocket_balance)});
  littleTriangle.attr({x: Math.min(Math.max(divider.attr("x") + 2*(pocket_balance) - 27, littleTriangle.ox + dx), divider.attr("x") + 400 - 27), y: Math.min(Math.max(pocket_balance, littleTriangle.oy + dy), 475 - pocket_balance)});
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
  spendDollarSet.show();
  spendDollarBubble.animate({cx: pocketBalanceCircle.attr("cx") + pocketBalanceCircle.attr("r") + 35, cy: pocketBalanceCircle.attr("cy"), r: 25}, 1000, "elastic");
  spendDollarText.animate({x: pocketBalanceCircle.attr("cx") + pocketBalanceCircle.attr("r") + 35, y: pocketBalanceCircle.attr("cy"), opacity: 1}, 200, "linear");
  spendLittleTriangle.animate({x: pocketBalanceCircle.attr("cx") + pocketBalanceCircle.attr("r") + 35, y: pocketBalanceCircle.attr("cy")}, 200, "elastic");
  //var pathStuff = ["M", pocketBalanceCircle.attr("cx") + pocketBalanceCircle.attr("r"), 
  //    pocketBalanceCircle.attr("cy"), "L", spendDollarBubble.attr("cx") - 25, pocketBalanceCircle.attr("cy")].join(",");
  //var lineToSpendBubble = paper.path(pathStuff);
  }
);

spendLittleTriangle.click(function(){
  spendLittleTriangle.rotate(180, spendLittleTriangle.attr("x") + 17, spendLittleTriangle.attr("y") + 17);
  if(spendLittleTriangle.attr("opacity") == 1) {
    spendLittleTriangle.attr({opacity: .9});
    spendDollarBubble.attr({fill: "#fff", cursor: "move"});
  }
  else{
    spendLittleTriangle.attr({opacity: 1});
    spendDollarBubble.attr({fill: "#999", cursor: "e-resize"})
  };
})

//Drag functionality for spendDollarBubble, allowing the user to adjust the dollar amount by dragging on the bubble

  var startSpendDollar = function () {
    // storing original coordinates
    if(spendLittleTriangle.attr("opacity") < 1){
      spendDollarBubble.ox = spendDollarBubble.attr("cx");
      spendDollarBubble.oy = spendDollarBubble.attr("cy");
      spendDollarText.ox = spendDollarText.attr("x");
      spendDollarText.oy = spendDollarText.attr("y");
      centsBubble.ox = centsBubble.attr("cx");
      centsBubble.oy = centsBubble.attr("cy");
    }
    else{
    //Spend Dollar stuff
    spendDollarBubble.r = spendDollarBubble.attr("r")
    spendDollarText.txt = spendDollarText.attr("text")
    
    //Pocket Balance stuff
    categoryNameText.ox = categoryNameText.attr("x");
    categoryNameText.oy = categoryNameText.attr("y");
    pocketBalanceCircle.r = pocketBalanceCircle.attr("r");
    pocketBalanceText.txt = pocketBalanceText.attr("text");
    littleTriangle.ox = littleTriangle.attr("x");
    littleTriangle.oy = littleTriangle.attr("y");
    }
  };

  var moveSpendDollar = function (dx, dy) {
    // move will be called with dx and dy
    if(spendLittleTriangle.attr("opacity") < 1){
      spendDollarBubble.attr({cx: spendDollarBubble.ox + dx, cy: spendDollarBubble.oy + dy});
      spendDollarText.attr({x: spendDollarText.ox + dx, y: spendDollarText.oy + dy});
      centsBubble.attr({cx: centsBubble.ox + dx, cy: centsBubble.oy + dy});
      spendDollarBubble.toFront();
      spendDollarText.toFront();
      centsBubble.toFront();
    }
    else{
    spendDollarBubble.attr({r: Math.min(Math.max(spendDollarBubble.r + dx/6, 25), pocket_balance + 25)});
    spendDollarText.attr({text: Math.round(spendDollarBubble.attr("r") - 25)});
    
    //Math is not right here. To be fixed!
    pocketBalanceCircle.attr({r: Math.min(Math.max(pocketBalanceCircle.r - (dx/6), 25), pocket_balance)});
    pocketBalanceText.attr({text: Math.min(Math.max(pocket_balance - Math.round(spendDollarBubble.attr("r") - 25), 0), pocket_balance)});
    
    //categoryNameText.attr({x: Math.min(categoryNameText.ox + dx), divider.attr("x") + 400), y: Math.min(Math.max(pocket_balance*.75 - 20, categoryNameText.oy + dy), 475 - pocket_balance*.75 - 20)})
    //pocketBalanceCircle.attr({cx: Math.min(Math.max(divider.attr("x") + pocket_balance*.75, pocketBalanceCircle.ox + dx), divider.attr("x") + 400 - pocket_balance*.75), cy: Math.min(Math.max(pocket_balance*.75, pocketBalanceCircle.oy + dy), 475 - pocket_balance*.75)});
    //pocketBalanceText.attr({x: Math.min(Math.max(divider.attr("x") + pocket_balance*.75, pocketBalanceText.ox + dx), divider.attr("x") + 400 - pocket_balance*.75), y: Math.min(Math.max(pocket_balance*.75, pocketBalanceText.oy + dy), 475 - pocket_balance*.75)});
    //littleTriangle.attr({x: Math.min(Math.max(divider.attr("x") + 2*(pocket_balance*.75) - 27, littleTriangle.ox + dx), divider.attr("x") + 400 - 27), y: Math.min(Math.max(pocket_balance*.75, littleTriangle.oy + dy), 475 - pocket_balance*.75)});
    } 
  };

  var upSpendDollar = function (){
    if(spendLittleTriangle.attr("opacity") < 1 && spendDollarBubble.attr("cx") > divider.attr("x") + 400){
      spendDollarBubble.animate({opacity: 0}, 400, "linear");
      spendDollarText.animate({opacity: 0}, 400, "linear");
      centsBubble.animate({opacity: 0}, 400, "linear");
      
      drawTransaction(divider.attr("x") + 490, 100, Math.round(spendDollarBubble.attr("r") - 25), category_name);
      
      // Grab the category that just changed
      var category = categories[order-1];

      // Update the category's pocket balance
      category.pocket_balance =  pocket_balance - Math.round(spendDollarBubble.attr("r") - 25);

      // Send the updated information to the server
      sendUpdate(category);
    }
    else{
      centsBubble.show();
      centsBubble.animate({cx: spendDollarBubble.attr("cx") + spendDollarBubble.attr("r"), cy: spendDollarBubble.attr("cy") + 20, r: 10}, 1000, "elastic");
    };
  }
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
  
  spendDollarBubble.drag(moveSpendDollar, startSpendDollar, upSpendDollar);
  spendDollarText.drag(moveSpendDollar, startSpendDollar, upSpendDollar);
  
  
    //--------------Adjusting the centsBubble-----------------//
       
}