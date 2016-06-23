var inquirer = require('inquirer');
var mysql = require('mysql');
//establish connection
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'odette1',
	database: 'bamazon_db'
});
//verify connection
connection.connect(function(error) {
	if(error) {
		console.log(error);
	}
	console.log('connected');
})
//customer functions object
var customer = {
	//display products to customer
	//this was running like 5 minutes ago. NOT NOW. idek
	display: function() {
		connection.query('SELECT * FROM products', function (error, results) {
			if(error) throw error;
			//display all items in the inventory
			for(i = 0; i < results.length; i++) {
				console.log(results[i].item_id + ' | ' + results[i].name + ' | ' + results[i].department + ' | ' +  results[i].price);
				console.log('-----------------------------------------');
			}
			//pass results and then no need to call a seacond time
			customer.want_what(results);
		})
	},


	//query what the customer wants and how many they want	
	want_what: function(results) {
		//inquirer function
		console.log('i run');
		inquirer.prompt([
			{ //queries item id of purchase
				type: 'input',
				name: 'purchase_id',
				message: 'What\'s the item id of the product you want to order?'
		},
			{ //queries quantity of purchase
				type: 'input',
				name: 'quantity',
				message: 'How many do you want to purchase?'
		}]).then(function(answer) {
				//get the product info from the db

				console.log('still running');

				var ordered_item = {};

				for(var i = 0; i < results.length; i++) {
					if(results[i].item_id == answer.purchase_id) {
						ordered_item.item_id = results[i].item_id;
						ordered_item.name = 	results[i].name;
						ordered_item.price = results[i].price;
						ordered_item.stock = results[i].stock;
					}
				};
				//console.log(ordered_item);
				console.log(ordered_item.stock);
				console.log(answer.quantity);
				console.log(parseInt(ordered_item.stock) === 12);
				console.log(parseInt(answer.quantity) === 1);
				
			 	if(parseInt(ordered_item.stock) < parseInt(answer.quantity)) {
						return console.log('We don\'t have enough to compete your order.');

					} else {
						//this.purchase(results.stock, answer.quantity, results.price);

						var new_stock = ordered_item.stock - answer.quantity;
						console.log(new_stock);

						connection.query('UPDATE products SET ? WHERE ?', [{stock: new_stock}, {item_id: answer.purchase_id}], function(err) {
								if(err) throw err;
								var total_price = ordered_item.price * answer.quantity;
								console.log('Your total purchase price is $' + total_price);
						})//closes query
					}//closes else
		})//closes then function

	}//closes function

// 	purchase: function(in_stock, amount, cost) {
// 		var new_stock = in_stock - amount;
// 		connection.query('UPDATE products SET ? WHERE ?' [{stock: new_stock}, {item_id: answer.purchase}], function(err) {
// 				if(err) throw err;
// 			})
// 		var total_price = amount * cost;
// 		console.log('Your total purchase price is $' + total_price);
// 	}	
// };
}; //closes var declaration

customer.display();
//this runs before the connection is complete but the functions are structured like the ebay example
//customer.want_what();
