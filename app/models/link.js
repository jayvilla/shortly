var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urls = new Schema({
  url:  String,
  baseUrl: String,
  code:   String,
  title: String,
  visits: Number
});

mongoose.model('Link', urls);

// module.exports = urls;
