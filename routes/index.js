import express from 'express';

import { NotesStore as notes } from '../app';

export const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
	const keylist = await notes.keylist();
	const notelist = [];
	for (key of keylist) {
	    let note = await notes.read(key);
	    notelist.push({ key: note.key, title: note.title });
	}
	// console.log(`keylist ${util.inspect(keylist)}`);
	// console.log(util.inspect(notelist));
	res.render('index', { title: 'Notes', notelist: notelist });
    } catch (err) {
	next(err); }
});
