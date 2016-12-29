'use strict'

const schema = require('validate')

module.exports = function(config) {
	let validation = schema({
		domain: {
			type: 'string',
			required: true,
			match: /^\w+[\.]?\w.\.auth0\.com/,
			message: 'login-bro must recieve domain name'
		},
		clientID: {
			type: 'string',
			required: true,
			message: 'login-bro must recieve clientID'
		},
		clientSecret: {
			type: 'string',
			required: true,
			message: 'login-bro must recieve clientSecret'
		},
		callbackURL: {
			type: 'string',
			required: true,
			match: /https?:\/\/.+(:\d+)?\/\w+/,
			message: 'login-bro - callbackURL must be full url and not relative'
		},
		appGet: {
			type: 'string',
			required: true,
			match: /\/.+/,
			message: 'login-bro - appGet must be relative'
		}
	})

	let result = validation.validate(config)

	if (result.length) { throw result }

	return
}