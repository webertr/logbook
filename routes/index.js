const express = require('express');
const util = require('util');

const shotsPSQL = require('../models/shots-psql.js');
const { PSQLShotsStore } = shotsPSQL;
const shots = new PSQLShotsStore();

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
    	const keylist = await shots.keylist();
	let key;
	const shotlist = [];
	if (keylist) {
    	    for (let ii = 0; ii < keylist.rows.length; ii++) {
		key = keylist.rows[ii];
    		shotlist.push({ shotnumber: key.shotnumber});
    	    }
    	    res.render('index', { title: 'Shots', shotlist: shotlist });
	} else {
	    shotlist.push({ shotnumber: -1, shotData: "N/A" });
	}
    } catch (err) {
    	next(err);
    }
});

module.exports.router = router;
