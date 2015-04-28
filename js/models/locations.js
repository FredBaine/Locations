define(["backbone", "localStorage"], function(Backbone) {

	var LocationModel = Backbone.Model.extend({
		idAttribute:			"IDNO",
		local:					true,
		remote:				false,
		url:						"locations.cfc?method=getLocation",
		defaults:				{
			WHS:				"",
			LOCATION:		"",
			PBI:					"",
		},
		
		validate:		function(attrs, options) {
			var pattern = new RegExp("[0-9]{4}[a-zA-Z]");
			if (!pattern.test(attrs.LOCATION)) {
				return 'Invalid Location';
			}
			pattern = new RegExp("[0-9]{12}");
			if (!pattern.test(attrs.PBI)) {
				return 'Invalid PBI';
			}
		}
		

	});
	
	

	var LocationCollection = Backbone.Collection.extend({
		initialize: function() {
//			this.on('all', function(e) { console.log('LocationCollection: ' + e); });
		},
		model:					LocationModel,
		url:						"Locations.cfc?method=getLocations",
		localStorage: 		new Backbone.LocalStorage("_locations"),

		uploadServer:		function() {
			_.each(this.models, function(model) {
				$.ajax({
					url: 'locations.cfc?method=addLocation',
					type: "post",
					data: model.attributes,
					dataType: "json",
					success: function(resp) {
						console.log('success: destroying model...');
						model.destroy({remote: false});
					},
					error:  function() { 
						console.log('error') 
					}
				});	
			});
		},
		
		locSummary:		function() {
			var returnArray = [];
		    var summary = this.countBy(function(model) {
		    	var loc = model.get('LOCATION');
		    	return loc.substr(0,4);
		    });
		    _.map(summary, function(bales, loc) {
		    	returnArray.push({LOCATION: loc, BALES: bales});
		    });
		    
			return _.sortBy(returnArray, function(o) { return o.LOCATION; });
		},
		
		clear:				function() {
			_.each(this.models, function(model) {
				model.destroy();
			});
		}
		
	});

return LocationCollection;
});