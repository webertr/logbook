const util = require('util');
const Shots = require('./Shots.js');

const { Shot, AbstractShotsStore } = Shots;

const pg = require('pg');
const { Client } = pg;

const debugModule = require('debug');
const DBG = debugModule();

const debug = DBG('shots:shots-psql');
const error = DBG('shots:error-psql');

// Setting environment variables like this, for now
process.env.PGUSER = dbuser;
process.env.PGHOST = locahost;
process.env.PGDATABASE = mydb;
process.env.PGPORT = PORT;
process.env.PGPASSWORD = "password";

const pgConfig = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,    
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
};

const client = new Client(pgConfig);

class PSQLShotsStore extends AbstractShotsStore {

    async close() {
	try {
	    client.close();
	} catch (err) {
	    client.close();
	    console.log(err.stack);
	}
    }
    
    // Called with "await shots.update(shotData)". Needs to return a promise.
    async update(shotData) {
	
	const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *';
	const values = ['brianc', 'brian.m.carlson@gmail.com'];
	
	try {
	    await client.connect();
	    await client.query(text, values);
	    await client.end()
	    console.log(res.rows[0])
	    return res.rows[0];
	} catch (err) {
	    client.close();
	    console.log(err.stack)
	}
	
    }

    async read(key) {

	const text = 'SELECT * FROM users WHERE id = $1';
	const values = ['brianc'];
	
	try {
	    await client.connect();
	    await client.query(text, values);
	    await client.end()
	    console.log(res.rows[0])
	    return res.rows[0];
	} catch (err) {
	    client.close();
	    console.log(err.stack)
	}
	
    }

    async getShotList(key) {

	const text = 'SELECT * FROM users WHERE id = $1';
	const values = ['brianc'];
	
	try {
	    await client.connect();
	    await client.query(text, values);
	    await client.end()
	    console.log(res.rows[0])
	    return res.rows[0];
	} catch (err) {
	    client.close();
	    console.log(err.stack)
	}
	
    }
    
    async keylist() {

	const text = 'SELECT shotnumber FROM shots';
	
	try {
	    await client.connect();
	    await client.query(text);
	    await client.end()
	    console.log(res.rows[0])
	    return res.rows[0];
	} catch (err) {
	    client.close();
	    console.log(err.stack)
	}
	
    }
    
}

module.exports = PSQLShotsStore;
