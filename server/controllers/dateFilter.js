'use strict'

var mongoose = require('mongoose'),
  DateFilter = mongoose.model('DateFilter');

exports.save = function(req, res) {

  DateFilter.find({
    user: req.user.id
  }).exec(function(err, dateFilters) {
    if (dateFilters.length) {
      var dateFilter = dateFilters[0];
      dateFilter.startDate = req.body.startDate;
      dateFilter.endDate = req.body.endDate;
      dateFilter.mode = req.body.mode;
    } else {
      var dateFilter = new DateFilter(req.body);
    }

    dateFilter.user = req.user;
    dateFilter.save(function(err) {
      if (err) {
        return res.json(500, {
          error: 'Cannot save the dateFilter: ' + err
        });
      }
      res.json(dateFilter);
    });
  });
}

exports.load = function(req, res) {
  DateFilter.find({
    user: req.user.id
  }).exec(function(err, dateFilters) {
    if (err) {
      return res.json(500, {
        error: 'Cannot load the dateFilter: ' + err
      });
    }
    if (dateFilters.length) {
      res.json(dateFilters[0]);
    } else {
      res.json({});
    }
  });
}
