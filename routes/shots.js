const express = require('express');
const util = require('util');

const shotsPSQL = require('../models/shots-psql.js');
const { PSQLShotsStore } = shotsPSQL;
const shots = new PSQLShotsStore();

const router = express.Router();

// View base list
router.get('/view-base/:baseNumber', async (req, res, next) => {
    try {
	let shotList = await shots.getShotList(baseNumber);
	//let colList = await accounts.getUserColList(req.user);

	res.render('dayview', {
	    baseNumber: baseNumber,
	    //colList : colList,
	    shotList : shotList,
	});
	
    } catch (err) {
	next(err);
    }
});

module.exports.router = router;
