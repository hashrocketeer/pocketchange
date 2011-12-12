
function drawTransaction(positionX, positionY, transactionAmount, category_name){
  var transAmountText = paper.text(positionX, positionY, transactionAmount).attr({fill: "#fff"});
  transAmountText.attr("font-size", "23");
  transAmountText.attr("font-family", "Lucida Grande");
  
  var transCategoryText = paper.text(positionX + 65, positionY, category_name).attr({fill: "#fff"});
  transCategoryText.attr("font-size", "20");
  transCategoryText.attr("font-family", "Lucida Grande");
};