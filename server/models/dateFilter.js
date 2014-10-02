'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DateFilterSchema = new Schema({
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  mode: {
  	type: String,
  	required: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

mongoose.model('DateFilter', DateFilterSchema);