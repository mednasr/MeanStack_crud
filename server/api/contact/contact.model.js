'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ContactSchema = new Schema({

  lastName:String,
  firstName:String,
  age:String,
  address: Object({ street : String, street_name: String}),
  country: Object({  name: String,
    dial_code: String,
    code: String}),
  updated: {type: Date, default: Date.now},
  slug: String

});

module.exports = mongoose.model('Contact', ContactSchema);


