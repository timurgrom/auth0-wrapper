'use strict'

const fs = require('fs')
const log = require('./lib/log')
const path = require('path')
const passport = require('passport')
const Auth0Strategy = require('passport-auth0')
const debug = require('debug')('login-bro')
const template = require('./lib/template')
const validateConfig = require('./lib/validateConfig')

module.exports.use = (app, path) => {
	return {
		with: (config) => {
			validateConfig(config)
			return initialize(app, config)
		},
		render: (config) => {
			validateConfig(config.strategy)
			return render(config)
		}
	}
}

function initialize(app, config) {
	debug('initializing: ', config)

	let callbackUrl = config.appGet || '/authCallback'

	if (callbackUrl[0] !== '/') {
		callbackUrl = '/' + callbackUrl
	}

	app.use((req, res, next) => {
		if (req.path !== callbackUrl) {
			req.session.returnTo = req.url
		}

		debug('returnTo: %s', req.path)
		next()
	})

	passport.use(new Auth0Strategy(config, strategyCallback))
	passport.serializeUser(function(user, done) { done(null, user) })
	passport.deserializeUser(function(user, done) { done(null, user) })

	// initializing passport required items for authentication
	app.use(passport.initialize());
	app.use(passport.session());

	// passport required functions to register user to request
	app.get(callbackUrl, 
	  passport.authenticate('auth0', { failureRedirect: config.failUrl || '/url-if-something-fails' }),
	  function(req, res) {
	    // req.session.returnTo doesn't actually work, it never gets populated, check it or make something new
	    // if authentication is successful which it is cause we are here, user will be moved to the redirect page
	    res.redirect(req.session.returnTo || '/user')
	})

	app.use(authentication)
}

function render(config) {
	debug('login-bro: rending html file', config)
	var name = path.join(__dirname, 'html', 'login.html')
	var stream = fs.createWriteStream(name)

	stream.once('open', function(fd) {
		var html = template(config)
		stream.end(html)
	})
}

function authentication(req, res, next) {
	if (req.isAuthenticated()) { return next() }
	res.sendFile(path.join(__dirname, 'html', 'login.html'))
}

function strategyCallback(accessToken, refreshToken, extraParams, profile, done) {
	// accessToken is the token to call Auth0 API (not needed in the most cases)
	// extraParams.id_token has the JSON Web Token
	// profile has all the information from the user
	return done(null, profile)
}