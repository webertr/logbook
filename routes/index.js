import express from 'express';
import util from 'util';

//import { NotesStore as notes } from '../app.js';
import { PSQLShotsStore as shots } from '../models/shots-psql.js';

export const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
    	const keylist = await shots.keylist();
    	const shotlist = [];
    	for (var ii = 0; ii < keylist.length; ii++) {
    	    let shot = await shots.read(keylist[ii]);
    	    shotlist.push({ shotNumber: keylist[ii], shotData: shot.shotData });
    	}
    	res.render('index', { title: 'Shots', shotlist: shotlist });
    } catch (err) {
    	next(err);
    }
});
