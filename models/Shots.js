/*
 * The original implementation used Symbol('key'), but that didn't seem to work.
 * Handlebars code couldn't access it
 */
const shot_data = "shotdata";

/* 
 * The Shot class describes a single note that our application will manage.
 * Using symbols will hide direct access to properties, and stop the adding
 * of fields of the same name. It effectively hides the information. Not private and public
 * in javascript so this is a way to hide class details. If not, you could change a field
 * name a potentially break other code that uses it.
 */
class Shot {
    constructor(shotData) {
	this[shot_data] = shotData;
    }
    getshotdata() { return this[shot_data]; }
    settitle(shotData) { this[shot_data] = shotData; }

}

class AbstractShotsStore {
    
    async close() {}
    async update(shotData) {}
    async read(shotData) {}
    async shotlist() {}

}

module.exports.Shot = Shot;
module.exports.AbstractShotsStore = AbstractShotsStore;
