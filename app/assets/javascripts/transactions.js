
// function drawTransaction(positionX, positionY, transactionAmount, category_name, order, change_total){
//   var transAmountText = paper.text(positionX, positionY, transactionAmount.toFixed(2)).attr({fill: "#fff"});
//   transAmountText.attr("font-size", "32");
//   transAmountText.attr("font-family", "Lucida Grande");
//   transAmountText.attr("text-anchor", "end");
//   
//   var transCategoryText = paper.text(positionX + 65, positionY, category_name).attr({fill: "#fff"});
//   transCategoryText.attr("font-size", "20");
//   transCategoryText.attr("font-family", "Lucida Grande");
//   transCategoryText.attr("text-anchor", "start");
//   
//   var timestamp = new Date().getTime(); // current time as number
//   
//   //This calculates the change
//   var changeAmountToAdd = Math.ceil(transactionAmount) - transactionAmount;
//   changeAmountToAdd = Math.round(changeAmountToAdd * 100) / 100
// 
//   updateChange(change_total + (changeAmountToAdd*100), order);
// 
//   //var transTimestampText = paper.text(positionX + 165, positionY, timestamp).attr({fill: "#fff"});
//   //transTimestampText.attr("font-size", "20");
//   //transTimestampText.attr("font-family", "Lucida Grande");
// };


function drawTransaction(transaction, category) {
	var x = divider.attr("x") + 520;
  var y = 100;
  var transAmountText = paper.text(x, y, transaction.trans_amount).attr({fill: "#fff"});
  transAmountText.attr("font-size", "32");
  transAmountText.attr("font-family", "Lucida Grande");
  transAmountText.attr("text-anchor", "end");
  
  var transCategoryText = paper.text(x + 65, y, category.cat_name).attr({fill: "#fff"});
  transCategoryText.attr("font-size", "20");
  transCategoryText.attr("font-family", "Lucida Grande");
  transCategoryText.attr("text-anchor", "start");
  
  //This calculates the change
  var changeAmountToAdd = Math.ceil(transaction.trans_amount) - transaction.trans_amount;
  changeAmountToAdd = Math.round(changeAmountToAdd * 100) / 100

  updateChange(changeAmountToAdd);

  //var transTimestampText = paper.text(positionX + 165, positionY, timestamp).attr({fill: "#fff"});
  //transTimestampText.attr("font-size", "20");
  //transTimestampText.attr("font-family", "Lucida Grande");
};