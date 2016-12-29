const rc = require('rc')

var config = rc('express-app', {
	env: 'development',

	strategy: {
		domain:				'valoster.eu.auth0.com',
		clientID:				'ViQ8A8rsnQ2WxQn23CTcTWgMfkBzLh2K',
		clientSecret:		'm_AntTsN0X1hYD_KN1Dg42T1dOO5cni9nC42us1osvOUBy-PZQ8wnsi6BKuZiGss',
		callbackURL:	'/authCallback'
	}
})

module.exports = config