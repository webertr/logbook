import express from 'express';
import util from 'util';

//import { NotesStore as notes } from '../app.js';
import { PSQLShotsStore as shots } from '../models/shots-psql.js';

export const router = express.Router();

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
