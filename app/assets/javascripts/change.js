var changeText;

function drawChange(ChangeAmount){
  changeText = paper.text(divider.attr("x") + 800 + 667/2, 475/2 - 15, (ChangeAmount/100).toFixed(2));
  changeText.attr("font-size", "50");
  changeText.attr({fill: "#fff"});
};

function updateChange(addChangeAmount){
  changeText.attr({text: (addChangeAmount/100).toFixed(2)})
}