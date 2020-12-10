import express from 'express';
import util from 'util';

//import { NotesStore as notes } from '../app.js';
import { NotesStore as notes } from '../models/notes-store.js';

export const router = express.Router();


/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
    	const keylist = await notes.keylist();
    	const notelist = [];
    	for (var ii = 0; ii < keylist.length; ii++) {
    	    let note = await notes.read(keylist[ii]);
    	    notelist.push({ key: note.key, title: note.title });
    	}
    	console.log(`notelist ${util.inspect(notelist)}`);
    	res.render('index', { title: 'Notes', notelist: notelist });
    } catch (err) {
    	next(err); }
});
