define(["backbone", "localStorage"], function(Backbone) {
	var SettingsModel = Backbone.Model.extend({

		initialize:					function() {
//			this.on('all', function(e) { console.log('Settings Model: ' + e); });
		}, 
	
		localStorage: new Backbone.LocalStorage("_settings"),
	
		defaults:					{
			id:					1,
			WHS:				"999999",
			NAME:	'No Whs Selected',
			incrementBales:		2,
			incrementDirection:  1										// 1 = up, -1 = down
		}
	
	});

return SettingsModel;	
});	