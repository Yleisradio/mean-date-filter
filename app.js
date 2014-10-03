'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var DateFilter = new Module('mean-date-filter');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
DateFilter.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  DateFilter.routes(app, auth, database);
  
  DateFilter.aggregateAsset('css', 'dateFilter.css');
  DateFilter.aggregateAsset('js', 'node_modules/moment/moment.js');
  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    DateFilter.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    DateFilter.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    DateFilter.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return DateFilter;
});
