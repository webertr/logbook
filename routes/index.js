import express from 'express';
import util from 'util';

import { NotesStore as notes } from '../app.js';

export const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
    	const keylist = await notes.keylist();
    	console.log(`keylist ${util.inspect(keylist)}`);
    	const keyPromises = keylist.map(key => {
    	    return notes.read(key);
    	});
    	const notelist = await Promise.all(keyPromises);
    	console.log(`note list: ${util.inspect(notelist)}`);
	arryTest = notelist[0]
    	res.render('index', { title: 'Notes', notelist: notelist });
    } catch (err) {
    	next(err);
    }
    // try {
    // 	const keylist = await notes.keylist();
    // 	const notelist = [];
    // 	for (var ii = 0; ii < keylist.length; ii++) {
    // 	    //console.log("Key: " + keylist[ii]);
    // 	    let note = await notes.read(keylist[ii]);
    // 	    //console.log("Returned note.key " + note.key);
    // 	    //console.log("Returned title " + note.title);
    // 	    notelist.push({ key: note.key, title: note.title });
    // 	}
    // 	//console.log(notelist);
    // 	console.log(`keylist ${util.inspect(keylist)}`);
    // 	console.log(`notelist ${util.inspect(notelist)}`);
    // 	res.render('index', { title: 'Notes', notelist: notelist });
    // } catch (err) {
    // 	next(err); }
});
