define( function (require) {

	"use strict";
	
	var $	= require('jquery'),
		   Marionette = require('marionette'),
		   SettingsModel = require('models/settings'),
		   WhsCollection = require('models/warehouses'),
		   LocationCollection = require('models/locations');
		  
	Backbone.emulateHTTP = true;
	Backbone.emulateJSON = true;

	Backbone.Marionette.TemplateCache.prototype.loadTemplate = function(templateId){
		var template;
		 if(templateId.charAt( 0 ) == "#"){										// if template is defined in script tag w/id in index.html
			template = $(templateId).html();
		} else {
			template = templateId
		}
		
		 if (!template || template.length === 0) {
			errorMessage = "Could not find template: '" + templateId + "'";
			throw (errorMessage);
		}
		return template;
	};


	 var app = new Marionette.Application();
     app.addRegions({
			  appRegion: "#appRegion",
 	 });

     var Controller = Marionette.Controller.extend({
    	 
			initialize: function() {
				var self = this,
					   dataToFetch = [];
	
				$('.nav a').on('click', function(e) {
					self.startModule($(e.currentTarget).data('module'));					
				});
				
				app.settingsModel 		= new SettingsModel();
				app.locationCollection 	= new LocationCollection();
				if (localStorage._settings) {
					app.settingsModel.fetch({async: false});
					dataToFetch.push(app.locationCollection.fetch({ WHS: app.settingsModel.get('WHS') }) );
				} else {
					app.settingsModel.save();
				}

				app.whsCollection = new WhsCollection();
				dataToFetch.push(app.whsCollection.fetch());

				// start settings module when data is fetched
				$.when.apply(null, dataToFetch).done(function() {
					self.startModule('settingsModule');
				});
			},	// end of init
     
     		startModule: function (appName, options) {
     			var options = options || {};
     			_.extend(options, {
     				region: 					app.appRegion,
			        settingsModel:	 		app.settingsModel,
			        locationCollection:	app.locationCollection,
			        whsCollection:			app.whsCollection,
     				pubSub:					this
     			});

     			var newApp = app.module(appName);
     			if (app.currentApp === newApp) { return; }

     			if (app.currentApp) {
     				app.currentApp.stop();
     			}
     			app.currentApp = newApp;
     			newApp.start(options);
     		}
     
     });	// end of controller

     
     $( window ).resize(function() {
    	 var h = parseInt(window.innerHeight * .75);
    	 $('.resize').css({'height': h});
     });
     
     app.on("start", function(){
        	app.controller = new Controller();
     });

	return app;

});

