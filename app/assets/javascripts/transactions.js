
function drawTransaction(positionX, positionY, transactionAmount, category_name, change_total){
  var transAmountText = paper.text(positionX, positionY, transactionAmount.toFixed(2)).attr({fill: "#fff"});
  transAmountText.attr("font-size", "32");
  transAmountText.attr("font-family", "Lucida Grande");
  transAmountText.attr("text-anchor", "end");
  
  var transCategoryText = paper.text(positionX + 65, positionY, category_name).attr({fill: "#fff"});
  transCategoryText.attr("font-size", "20");
  transCategoryText.attr("font-family", "Lucida Grande");
  transCategoryText.attr("text-anchor", "start");
  
  var timestamp = Number(new Date()); // current time as number
  
  //This calculates the change
  var changeAmountToAdd = Math.round(transactionAmount) - transactionAmount;
  if(changeAmountToAdd < 0){changeAmountToAdd = changeAmountToAdd + 1};
  
  updateChange(change_total + (changeAmountToAdd*100))
  
  //var transTimestampText = paper.text(positionX + 165, positionY, timestamp).attr({fill: "#fff"});
  //transTimestampText.attr("font-size", "20");
  //transTimestampText.attr("font-family", "Lucida Grande");
};