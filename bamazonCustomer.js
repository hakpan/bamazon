//require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');
// const CFonts = require('cfonts');

//create connection to db
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
})


function start(){
//prints the items for sale and their details
connection.query('SELECT * FROM Products', function(err, res){
  if(err) throw err;


  console.log('|| ** ||||| ||| Bamazon ||| ||||| ** ||')
  console.log('----------------- List of Products for Sale --------------------')

  for(var i = 0; i<res.length;i++){
    console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
  }
  console.log('-----------------------------------------------------------------');
  console.log('|| ** ||||| ||| Customer View ||| ||||| ** || ');
  inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "Enter Product ID of the item you wish to purchase:",
      validate: function(value){
        if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
          return true;
        } else{
          return false;
        }
      }
    },
    {
      type: "input",
      name: "qty",
      message: "Please enter quantity needed:",
      validate: function(value){
        if(isNaN(value)){
          return false;
        } else{
          return true;
        }
      }
    }
    ]).then(function(ans){
      var whatToBuy = (ans.id)-1;
      var howMuchToBuy = parseInt(ans.qty);
      var grandTotal = parseFloat(((res[whatToBuy].price)*howMuchToBuy).toFixed(2));

      //check if quantity is sufficient
      if(res[whatToBuy].stock_quantity >= howMuchToBuy){
        //after purchase, updates quantity in Products
        connection.query("UPDATE Products SET ? WHERE ?", [
        {stock_quantity: (res[whatToBuy].stock_quantity - howMuchToBuy)},
        {item_id: ans.id}
        ], function(err, result){
            if(err) throw err;
            console.log("Your total is $" + grandTotal.toFixed(2));
        });

      } else{
        console.log("Sorry, not enough in stock.");
      }

      reprompt();
    })
})
}

//asks if they would like to purchase another item
function reprompt(){
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Would you like to purchase another item?"
  }]).then(function(ans){
    if(ans.reply){
      start();
    } else{
      console.log("See you soon!");
    }
  });
}

start();