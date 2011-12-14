function drawChange(ChangeAmount){
  var changeText = paper.text(divider.attr("x") + 1200, 225, ChangeAmount.toFixed(2)/100);
  changeText.attr("font-size", "50")
};