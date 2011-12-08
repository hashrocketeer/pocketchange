var newTransactionAmount = 0;

function newTransaction(positionX, positionY){
  var transAmountText = paper.text(positionX, positionY, newTransactionAmount);
  var oneDollarButton = paper.rect(positionX, positionY + 30, 40, 20, 0).attr("fill","#000");
  var fiveDollarButton = paper.rect(positionX + 50, positionY + 30, 40, 20, 0).attr("fill","#666");
  
  oneDollarButton.click(function(){
    newTransactionAmount = newTransactionAmount + 1;
    transAmountText.attr({text: newTransactionAmount});
  });
  
  fiveDollarButton.click(function(){
    newTransactionAmount = newTransactionAmount + 5;
    transAmountText.attr({text: newTransactionAmount});
  });
};