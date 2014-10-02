'use strict';

var dateFilter = require('../controllers/dateFilter');

// The Package is past automatically as first parameter
module.exports = function(DateFilter, app, auth, database) {

  app.route('/dateFilter')
    .get(dateFilter.load)
    .put(dateFilter.save);
};
