/*
 * The original implementation used Symbol('key'), but that didn't seem to work.
 * Handlebars code couldn't access it
 */
const keyKey = "key";
const titleKey = "title";
const bodyKey = "body";

/* 
 * The Note class describes a single note that our application will manage.
 * Using symbols will hide direct access to properties, and stop the adding
 * of fields of the same name. It effectively hides the information. Not private and public
 * in javascript so this is a way to hide class details. If not, you could change a field
 * name a potentially break other code that uses it.
 */
export class Note {
    constructor(key, title, body) {
	this[keyKey] = key;
	this[titleKey] = title;
	this[bodyKey] = body;
    }
    getkey() { return this[keyKey]; }
    gettitle() { return this[titleKey]; }
    settitle(newTitle) { this[titleKey] = newTitle; }
    getbody() { return this[bodyKey]; }
    setbody(newBody) { this[bodyKey] = newBody; }

    get JSON() {
	return JSON.stringify({
	    key: this.key, title: this.title, body: this.body
	});
    }
    
    static fromJSON(json) {
	const data = JSON.parse(json);
	if (typeof data !== 'object'
	    || !data.hasOwnProperty('key')
	    || typeof data.key !== 'string'
	    || !data.hasOwnProperty('title')
	    || typeof data.title !== 'string'
	    || !data.hasOwnProperty('body')
	    || typeof data.body !== 'string') {
	    throw new Error(`Not a Note: ${json}`);
	}
	const note = new Note(data.key, data.title, data.body);
	return note;
    }
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
