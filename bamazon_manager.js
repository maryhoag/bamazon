//var inquirer = require('inquirer');

//new and improved inquirer with syntax I can acutally remember
var inquirer = require('inquirer-promise');
var mysql = require('mysql');

//connection deets
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'odette1',
	database: 'bamazon_db'
})

//make connection
connection.connect(function(error) {
	if(error) throw error;
	console.log('connected');
})

var manager = {
	question: function() {
		//options presented to user
		inquirer.checkbox('Choose an option:', ['View Products', 'View Low Inventory', 'Replenish Inventory', 'Add New Products']).then(answer => function(answer) {

			//cases
			//these aren't running fix this
			switch(answer) {
				case 'View Products':
					show_products();
				break;

				case 'View Low Inventory':
					low_inventory();
				break;

				case 'Replenish Inventory':
					replenish();
				break;

				case 'Add New Products':
					add_new();
				break;
			}//closes switch statement
		})//closes then
	},

	show_products: function() {
		//display all products available
		connection.query('SELECT * FROM products', function(error, results) {
			if(error) throw error;
			for(i = 0; i < results.length; i++) {
				console.log(results[i].item_id + ' | ' + results[i].name + ' | ' +  results[i].price + ' | ' + results[i].stock);
			}
			console.log('---------------------------------------------');
		})
		//return to menu
		manager.question();
	},

	low_inventory: function() {
		console.log('test');
		//select items with qty < 5
		connection.query('SELECT * FROM products WHERE stock < 5', function(error,results) {
			if(error) throw error;
			for(i = 0; i < results.length; i++) {
				console.log(results[i].name);
			}
			console.log('-------------------------------------------');
		})
		//return to menu
		manager.question();
	},

	replenish: function() {
		inquirer.prompt([{
			name: 'product',
			message: "What do you want to reorder?", 
			default: 'coffee'}])
		.then( answer => function(answer) {
			//fix this syntax
			connection.query('UPDATE products WHERE products.name = product', function(error) {
				if(error) throw error;
				console.log('Product updated.');
			})
		})
		manager.question();
	},

	add_new: function() {
		var newProduct = {};
		inquirer.input('New product name?', {default: 'coffee'})
			.then(new_name => newProduct.name = new_name);

		inquirer.input('New product department?')
			.then(department => newProduct.department = department);

		inquirer.input('New product price?')
			.then(price => newProduct.price = price);

		inquirer.input('New product quantity?')
			.then(quantity => newProduct.stock = quantity);

		//delay begining
		//make seperate function?
		connection.query('INSERT newProduct INTO products', function(error, response) {
			if(error) throw error;
			console.log('Product added.');
		})
		manager.question();
	}


}


//test
//inquirer.input('Favorite animal?', {default: 'cheetah'})
	//.then(animal => console.log(animal));

//manager.show_products();
manager.question();


