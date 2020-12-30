import path from 'path';
import util from 'util';

import { default as express } from 'express';
import { default as passport } from 'passport';
import { default as passportLocal } from 'passport-local';

const LocalStrategy = passportLocal.Strategy;

import * as usersModel from '../models/users-superagent.js';
import { sessionCookieName } from '../app.js';

export const router = express.Router();

import DBG from 'debug';
const debug = DBG('notes:router-users');
const error = DBG('notes:error-users');

export function initPassport(app) {
    app.use(passport.initialize());
    app.use(passport.session());
}

export function ensureAuthenticated(req, res, next) {
    try {
	// req.user is set by Passport in the deserialize function
	if (req.user) next();
	else res.redirect('/users/login');
    } catch (e) { next(e); }
}

router.get('/login', function(req, res, next) {
    try {
	res.render('login', { title: "Login to Notes", user: req.user, });
    } catch (e) { next(e); }
});

router.post('/login',
	    passport.authenticate('local', { successRedirect: '/',
					     failureRedirect: 'login',})
	   );

router.get('/logout', function(req, res, next) {
    try {
	req.session.destroy();
	req.logout();
	res.clearCookie(sessionCookieName);
	res.redirect('/');
    } catch (e) { next(e); }
});

// This was old code.
// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
