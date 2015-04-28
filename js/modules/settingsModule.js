define(["app", "backbone", "marionette", "jquery", "underscore"
        , "views/settingsView"
		, "common/whsSelectView"
        ],
function(app, Backbone, Marionette, jquery, underscore, SettingsView, WhsSelectView) {
	
	app.module("settingsModule", function(settingsModule, app, Backbone, Marionette, $, _){

		'use strict';
		this.startWithParent=false;

/* --------------------------------------------------------------------------------- */		
/* ||||||||||||||||||||            Controller              ||||||||||||||||||||||||||| */
/* --------------------------------------------------------------------------------- */		
	settingsModule.Controller = Marionette.Controller.extend({

		initialize:	function(options) {
			  var self 					= this;
	  		  this.region 				= options.region;
	  		  this.settingsModel 		= options.settingsModel;
	  		  this.whsCollection 		= options.whsCollection;
	  		  this.locationCollection 	= options.locationCollection;
	  		  this.whs 					= '476512';
	  		  
	  		  this.whsModel			= new Backbone.Model();
	  		  this.whsModel.set(this.whsCollection.findWhere({WHS: this.whs}).attributes);
	  		  
  	  		  this.on('whs:changed', function(whsModel) {self.changeWhs(whsModel)});

// 	  		  var layout 				= new CalendarView.Layout();
			  var settingsView	 	   = new SettingsView({ 
				  model: this.settingsModel, 
				  whsCollection: this.whsCollection, 
				  locationCollection: this.locationCollection, 
				  pubSub: self });
//			  var whsSelectView    = new WhsSelectView({ collection: self.whsCollection, model: self.whsModel, pubSub: self });
			  
			  this.region.show(settingsView);
	  	  },
		  
		  changeWhs: function(whsModel){
			  this.whs = whsModel.get('WHS');
	  		  this.whsModel.set(this.whsCollection.findWhere({WHS: this.whs}).attributes);
	  		  this.collection.reset(); 
			  this.startDate = Date.parse(this.firstDate);
			  this.summaryModel.set({startDate: this.startDate});
			  this.getCalendar();
		  }

	});	// end of Controller

/* --------------------------------------------------------------------------------- */		
/* ||||||||||||                          Initializer                            ||||||||||| */
/* --------------------------------------------------------------------------------- */		
	  settingsModule.on('start', function (options) {
		  settingsModule.controller = new settingsModule.Controller({
		        region: 					options.region,
		        settingsModel: 			options.settingsModel,
		        locationCollection: 	options.locationCollection,
		        whsCollection: 			options.whsCollection
		    });
		});

	});  // end of Marionette module
	  
	  return; 
});  // end of require module
