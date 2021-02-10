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
process.env.PGUSER = "csa";
process.env.PGHOST = "localhost";
process.env.PGDATABASE = "fuzelogbooktest";
process.env.PGPORT = 5432;
process.env.PGPASSWORD = "csapsql";

const pgConfig = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,    
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
};

class PSQLShotsStore extends AbstractShotsStore {

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
	    client.end();
	    console.log(err.stack)
	}
	
    }

    async read(key) {

	const text = 'SELECT * FROM shots WHERE shotnumber=$1';
	let client;
	
	try {
	    client = new Client(pgConfig);
	    await client.connect();
	    const res = await client.query(text, key);
	    await client.end()
	    return res;
	} catch (err) {
	    await client.end();
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
	    client.end();
	    console.log(err.stack)
	}
	
    }

    async getDayList() {

	const text = 'SELECT shotnumber FROM shots ORDER BY shotnumber ASC';
	let client;
	let baseNumber;
	let baseNumberOld;
	let baseNumberList;
	let year;
	let month;
	let day;
	let date;
	
	try {
	    client = new Client(pgConfig);
	    await client.connect();
	    const res = await client.query(text);
	    await client.end();
	    baseNumberList = [];
	    baseNumber = (baseNumber-(baseNumber%1000))/1000;
    	    for (let ii = 0; ii < res.rows.length; ii++) {
		baseNumber = res.rows[ii].shotnumber;
		baseNumber = (baseNumber-(baseNumber%1000))/1000;
		year = (baseNumber-(baseNumber%10000))/10000;
		day = baseNumber%100;
		month = ((baseNumber-(baseNumber%100))/100)%100;
		    
		if (baseNumberOld == baseNumber) {
		    continue;
		} else {
		    date = new Date(2000+year, month, day);
		    console.log(date);
    		    baseNumberList.push( {basenumber: baseNumber, date: date.toDateString() } );
		    baseNumberOld = baseNumber;
		}
    	    }
	    return baseNumberList;
	} catch (err) {
	    await client.end();
	}
	
    }
    
    async keylist() {

	const text = 'SELECT shotnumber FROM shots';
	let client;
	
	try {
	    client = new Client(pgConfig);
	    await client.connect();
	    const res = await client.query(text);
	    await client.end()
	    return res.rows;
	} catch (err) {
	    await client.end();
	}
	
    }
    
}

module.exports.PSQLShotsStore = PSQLShotsStore;
