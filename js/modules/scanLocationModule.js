define(["app", "backbone", "marionette", "jquery", "underscore"
        , "views/locationViews"
        ],
function(app, Backbone, Marionette, jquery, underscore, Views) {
	
	app.module("scanLocationModule", function(scanLocationModule, app, Backbone, Marionette, $, _){

		'use strict';
		this.startWithParent=false;

/* --------------------------------------------------------------------------------- */		
/* ||||||||||||||||||||            Controller              ||||||||||||||||||||||||||| */
/* --------------------------------------------------------------------------------- */		
	scanLocationModule.Controller = Marionette.Controller.extend({

		initialize:	function(options) {
			
			  var self 						= this;
	  		  this.region 				= options.region;
	  		  this.whs 					= options.settingsModel.get('WHS');
	  		  this.collection				= options.locationCollection;

	  		  this.on('location:add', function(model) {
	  			  var newModel = model.clone();
	  			  this.collection.create(newModel);
	  			  console.log('adding model ');
	  		  });
	  		  
	  		  var layout 					= new Views.Layout();
	  		  var entryView				= new Views.EntryView({ 
	  			  model: new this.collection.model({WHS: this.whs}),
	  			  settingsModel: options.settingsModel,
	  			  pubSub: this
	  		  });
	  		  var listView				= new Views.ListView({ collection: this.collection, pubSub: this})
	  		  layout.on('show', function() {
	  			  layout.entryRegion.show(entryView);
	  			  layout.listRegion.show(listView);
	  		  });
			  this.region.show(layout);
	  	  },
		  
	});	// end of Controller

/* --------------------------------------------------------------------------------- */		
/* ||||||||||||                          Initializer                            ||||||||||| */
/* --------------------------------------------------------------------------------- */		
	  scanLocationModule.on('start', function (options) {
		  scanLocationModule.controller = new scanLocationModule.Controller({
		        region: 						options.region,
		        settingsModel:	 			options.settingsModel,
		        locationCollection: 		options.locationCollection
		    });
		});

	});  // end of Marionette module
	  
	  return; 
});  // end of require module
