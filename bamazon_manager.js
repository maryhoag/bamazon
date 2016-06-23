var inquirer = require('inquirer');

//new and improved inquirer with syntax I can acutally remember
var inquirer_promise = require('inquirer-promise');
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
		inquirer.prompt([
			{
				name: 'chosen_option',
				type: 'list',
				message: 'Choose an option:', 
				choices: [
				//error = not a constructor?
					//new inquirer.Seperator(),
					{
						name: 'View Products'
					},
					{
					 	name: 'View Low Inventory'
					 },
					 {
					 	name: 'Replenish Inventory'
					 },
					 {
					 	name: 'Add New Products'
					 }]
			}])

			.then(function(answer) {
		 		// console.log('running');
		 		// console.log(answer);
		 	//cases
			 	//these aren't running fix this
				switch(answer.chosen_option) {
					case 'View Products':
						console.log('show');
						manager.show_products();
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
		console.log('show_products is working');
		//this and the inquirer were running but NOT NOW. I get a node module error. No idea. I didn't edit those!!
		//display all products available
		connection.query('SELECT * FROM products', function(error, results) {
			if(error) throw error;
			for(i = 0; i < results.length; i++) {
				console.log(results[i].item_id + ' | ' + results[i].name + ' | ' +  results[i].price + ' | ' + results[i].stock);
			}
			console.log('---------------------------------------------');
			//return to menu
			manager.question();
		})
	},

	low_inventory: function() {
		//console.log('test');
		//select items with qty < 5
		console.log(order);
		//what to select
		connection.query('SELECT * FROM products', function(error,results) {
		if(error) throw error;
		
		for(i = 0; i < results.length; i++) {
			console.log(results[i].name);
			if(parseInt(results[i].stock) < 5) {
				connection.query('UPDATE products SET ? WHERE ?', [{stock: (parseInt(results[i].stock) + 5)}, {item_id: i}], function(error, res) {
					if(error) throw error;
					console.log(rea.name + ' ordered. New quantitiy = ' + res.stock);
				})
				console.log(results[i]); 
			}
		}
		console.log('-------------------------------------------');
		})
		//return to menu
		manager.question();
	},

	// replenish: function() {
	// 	console.log('reorder');
	// 	inquirer.prompt([
	// 	{
	// 		name: 'product',
	// 		type: 'list',
	// 		message: "What do you want to reorder?", 
	// 		default: 'coffee'
	// 	}])
	// 	.then(function(answer) {
	// 		//fix this syntax
	// 		connection.query('UPDATE products SET ? WHERE ?', [{name = answer.product}], function(error, answer) {
	// 			if(error) throw error;
	// 			console.log('Product updated.');
	// 		})
	// 	})
	// 	manager.question();
	// },

	add_new: function() {
		var newProduct = {};
		inquirer_promise.input('New product name ?', {default: 'coffee'})
			.then(new_name => newProduct.name = new_name);

		inquirer_promise.input('New product department?')
			.then(department => newProduct.department = department);

		inquirer_promise.input('New product price?')
			.then(price => newProduct.price = price);

		inquirer_promise.input('New product quantity?')
			.then(quantity => newProduct.stock = quantity);

		//delay begining
		//make seperate function?
		connection.query('INSERT ? INTO products', function(error, response) {
			if(error) throw error;
			console.log('Product added.');
		})
		manager.question();
	}


};


//test
// inquirer_promise.input('Favorite animal?', {default: 'cheetah'})
// 	.then(animal => console.log(animal));

manager.show_products();

//manager.question();

//manager.add_new();


