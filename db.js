const knex = require('knex')

const db = knex({
	client: 'mysql',
	connection: {
		host: 'us-cdbr-iron-east-05.cleardb.net',
		user: 'beb980f8625a1d',
		database: 'heroku_891bcc9cada63c8',
		password: '8ab28d39'
	}
})

module.exports = db

/*
host: 'us-cdbr-iron-east-05.cleardb.net',
user: 'beb980f8625a1d',
database: 'heroku_891bcc9cada63c8',
password: '8ab28d39'
*/