//BUG! -> Something is off with the math, probably with the rounding. Ocassionally a few cents more than it should be.

var changeText;

function drawChange(ChangeAmount){
  changeText = paper.text(divider.attr("x") + 800 + 667/2, 475/2 - 15, (ChangeAmount/100).toFixed(2));
  changeText.attr("font-size", "50");
  changeText.attr({fill: "#fff"});
};

function updateChange(addChangeAmount, order){
  changeText.attr({text: (addChangeAmount/100).toFixed(2)});
  
  //=============Updating the database=================//
  // Grab the category that just changed
  //var category = categories[order-1];

  // Update the category's change balance
  //category.change_balance =  change_balance + addChangeAmount;

  // Send the updated information to the server
  //sendUpdate(category);
  //=================================================//
  
  //=============function that updates the database=================//
  //var sendUpdate = function(category) {
    // Callback for after the server responds
    //var onSuccess = function(data) {
     // console.log(data);
    //};

    // Our hand-rolled parameter to post
    // Ends up looking like:
    //
    // category[pocket_balance]=123
    // category[current_balance]=321
    // ... etc ...
    //var changes = { category: category, _method: 'put' }

    // Post the changes, jQuery-style
    //$.post('/categories/'+category.id, changes, onSuccess, 'json');
  //}
  //=================================================//
}