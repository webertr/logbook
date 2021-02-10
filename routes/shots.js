const express = require('express');
const util = require('util');

const shotsPSQL = require('../models/shots-psql.js');
const { PSQLShotsStore } = shotsPSQL;
const shots = new PSQLShotsStore();

const router = express.Router();

// View base list
router.get('/view-base/:baseNumber', async (req, res, next) => {
    try {
	let shotlist = await shots.getShotList(req.params.baseNumber);
	//let colList = await accounts.getUserColList(req.user);

	console.log(shotlist);
	res.render('dayview', {
	    baseNumber: req.params.baseNumber,
	    //colList : colList,
	    shotList : shotlist,
	});
	
    } catch (err) {
	next(err);
    }
});

module.exports.router = router;
