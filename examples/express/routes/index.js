// var express = require('express');
// var passport = require('passport')
// var router = express.Router();

/* GET home page. */
exports.index = function(req, res) {
	res.render('index', { title: 'Express' })
}

exports.user = function(req, res) {
	res.render('user', { user: req.user })
}

exports.random = function(req, res) {
	res.render('random', { user: req.user })
}

exports.logout = function(req, res) {
	req.logout()
	res.redirect('/')	
}