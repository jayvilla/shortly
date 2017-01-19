var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var User = mongoose.model('User', users);
var users = new Schema({
  username:  String,
  password: String
});

mongoose.model('User', users);

// module.exports = User;
