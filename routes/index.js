const express = require('express');
const util = require('util');

const shotsPSQL = require('../models/shots-psql.js');
const { PSQLShotsStore } = shotsPSQL;
const shots = new PSQLShotsStore();

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
    	const daylist = await shots.getDayList();
	console.log(daylist);
	if (daylist) {
    	    res.render('index', { title: 'Shots', daylist: daylist });
	} else {
	    res.render('index', { title: 'Shots', daylist: null });
	}
    } catch (err) {
    	next(err);
    }
});

module.exports.router = router;
