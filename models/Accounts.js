const account_data = "accountdata";

const account_names = [
    "realname",
    "accounpk",
    "password",
    "username",
    "accesslevel",
    "shotsperpage",
    "lastlogin",
    "commencap",
    "showshot",
    "pagelimit",
    "expanded_categories",
    "fontsize",
    "col_number",
    "col_list",
    "showshotsbyday",
    "changedcolor",
    "confirmation",
    "showcomments",
    "singlelinemode",
];

/* 
 * The Shot class describes a single note that our application will manage.
 * Using symbols will hide direct access to properties, and stop the adding
 * of fields of the same name. It effectively hides the information. Not private and public
 * in javascript so this is a way to hide class details. If not, you could change a field
 * name a potentially break other code that uses it.
 */
class Account {
    constructor(accountData) {
	this[account_data] = accountData;
    }
    getshotdata() { return this[account_data]; }
    settitle(accountData) { this[account_data] = accountData; }

}

class AbstractAccountsStore {
    
    async close() {}
    async update() {}
    async read() {}
    async shotlist() {}

}

module.exports.Account = Account;
module.exports.AbstractAccountsStore = AbstractAccountsStore;
