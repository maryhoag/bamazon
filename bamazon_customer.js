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
	display: function() {
		connection.query('SELECT * FROM products', function (error, results) {
			if(error) throw error;
			//display all items in the inventory
			for(i = 0; i < results.length; i++) {
				console.log(results[i].item_id + ' | ' + results[i].name + ' | ' + results[i].department + ' | ' +  results[i].price);
				console.log('-----------------------------------------');
			}
	// body...
		})
	},
	//query what the customer wants and how many they want	
	want_what: function() {
		//inquirer function
		inquirer.prompt([
			{ type: 'input',
				name: 'purchase',
				question: 'What\'s the item id of the product you want to order?',
			},
			{ type: 'input',
				name: 'quantity',
				question: 'How many do you want to purchase?'
			}], function(answer) {
				//get the product info from the db
				connection.query('SELECT item_id FROM products', function(error, results) {
					if(error) throw error;
					else if(results.stock < answer.quantity) {
						return console.log('We don\'t have enough to compete your order.');
					} else {
						var new_stock = results. stock - answer.quantity;
						connection.query('UPDATE products SET ? WHERE ?' [{stock: new_stock}, {item_id: answer.purchase}], function(err) {
							if(err) throw err;
							var total_price = answer.quantity * results.price;
							console.log('Your total purchase price is $' + total_price);
						})
					}

				})

			})
	}
};