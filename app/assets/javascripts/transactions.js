
function newTransaction(positionX, positionY, transactionAmount){
  var transAmountText = paper.text(positionX, positionY, transactionAmount).attr({fill: "#fff"});
  transAmountText.attr("font-size", "23");
};