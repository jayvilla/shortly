var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto-js');

// var User = mongoose.model('User', users);
var users = new Schema({
  username:  String,
  password: String
});

users.post('init', (next) => {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
    });
});

users.post('validate', (next) => {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
    });
});

users.post('init', (next) => {
  bcrypt.hash(this.password, null, null, (err, hash) => {
    this.password = hash;
  });
});

var User = mongoose.model('User', users);

module.exports = User;

// module.exports = User;
