const _note_key = Symbol('key');
const _note_title = Symbol('title');
const _note_body = Symbol('body');


/* 
 * The Note class describes a single note that our application will manage.
 * Using symbols will hide direct access to properties, and stop the adding
 * of fields of the same name. It effectively hides the information. Not private and public
 * in javascript so this is a way to hide class details. If not, you could change a field
 * name a potentially break other code that uses it.
 */
export class Note {
    constructor(key, title, body) {
	this[_note_key] = key;
	this[_note_title] = title;
	this[_note_body] = body;
    }
    getkey() { return this[_note_key]; }
    gettitle() { return this[_note_title]; }
    settitle(newTitle) { this[_note_title] = newTitle; }
    getbody() { return this[_note_body]; }
    setbody(newBody) { this[_note_body] = newBody; }
}

/*
 * The AbstractNotesStore class describes methods for managing some note instances
*/
export class AbstractNotesStore {
    async close() { }
    async update(key, title, body) { }
    async create(key, title, body) { }
    async read(key) { }
    async destroy(key) { }
    async keylist() { }
    async count() { }
}
