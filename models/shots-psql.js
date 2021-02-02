import util from 'util';
import { Shot, AbstractShotsStore } from './Shots.mjs';
import { default as pg } from 'pg';
import { default as DBG } from 'debug';

const debug = DBG('notes:shots-psql');
const error = DBG('notes:error-psql');
let db;

const client = new pg.Client({
    user: psql.USER,
    host: psql.HOST,
    database: psql.DATABASE,
    password: psql.PASSWORD,
    port: psql.PORT,
});

async function connectDB() {
    if (db) return db;
    const dbfile = process.env.PSQL_FILE || "notes.psql";
    
    await new Promise((resolve, reject) => {
	db = new sqlite3.Database(dbfile,
				  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
				  err => {
				      if (err) return reject(err);
				      resolve(db);
				  });
    });
    
    return db;
}

export default class SQLITE3NotesStore extends AbstractNotesStore {

    async close() {
	const _db = db;
	db = undefined;
	return _db ?
	    new Promise((resolve, reject) => {
		_db.close(err => {
		    if (err) reject(err);
		    else resolve();
		});
	    }) : undefined;
    }

    async update(key, title, body) {
	const db = await connectDB();
	const note = new Note(key, title, body);
	await new Promise((resolve, reject) => {
	    db.run("UPDATE notes "+
		   "SET title = ?, body = ? WHERE notekey = ?",
		   [ title, body, key ], err => {
		       if (err) return reject(err);
		       resolve(note);
		   });
	});
	return note;
    }

    async create(key, title, body) {
	const db = await connectDB();
	const note = new Note(key, title, body);
	await new Promise((resolve, reject) => {
	    db.run("INSERT INTO notes ( notekey, title, body) "+
		   "VALUES ( ?, ? , ? );", [ key, title, body ], err => {
		       if (err) return reject(err);
		       resolve(note);
		   });
	});
	return note;
    }

    async read(key) {
	const db = await connectDB();
	const note = await new Promise((resolve, reject) => {
	    db.get("SELECT * FROM notes WHERE notekey = ?",
		   [ key ], (err, row) => {
		       if (err) return reject(err);
		       const note = new Note(row.notekey, row.title, row.body);
		       resolve(note);
		   });
	});
	return note;
    }

    async destroy(key) {
	const db = await connectDB();
	return await new Promise((resolve, reject) => {
	    db.run("DELETE FROM notes WHERE notekey = ?;", [ key ], err => {
		if (err) return reject(err);
		resolve();
	    });
	});
    }

    async keylist() {
	const db = await connectDB();
	const keyz = await new Promise((resolve, reject) => {
	    const keyz = [];
	    db.all("SELECT notekey FROM notes", (err, rows) => {
		if (err) return reject(err);
		resolve(rows.map(row => {
		    return row.notekey;
		}));
	    });
	});
	return keyz;
    }

    async count() {
	const db = await connectDB();
	const count = await new Promise((resolve, reject) => {
	    db.get("select count(notekey) as count from notes",
		   (err, row) => {
		       if (err) return reject(err);
		       resolve(row.count);
		   });
	});
	return count;
    }
    
}

