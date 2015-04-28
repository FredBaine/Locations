define(["backbone", "marionette", "text!templates/settings.html"], 
		function(Backbone, Marionette, template) {

	SettingsView = Backbone.Marionette.ItemView.extend({

		template: 		_.template( template ),
	
		events: {
			"click .ulWhs li a":			"saveSettings",
			"click #btnUpload":		"uploadData"
		},
	
		initialize:		function(options) {
//			this.on('all', function(e) { console.log('Detail View: ' + e); });
			this.whsCollection = options.whsCollection;
			this.locationCollection = options.locationCollection;
			this.listenTo(this.model, 'change', this.render);
			this.render();
		},
	
		render:			function() {
			this.$el.html(this.template({ 
				WAREHOUSES: this.whsCollection.toJSON(), 
				LOCATIONS: this.locationCollection.toJSON(),
				SETTINGS: this.model.toJSON() 
			}));
			return this;
		},

		saveSettings:		function(e) {
			var whs = $(e.currentTarget).attr('data-whs');
			var name = this.whsCollection.findWhere({WHS: whs}).get('NAME');
			this.model.set({WHS: whs });
			this.model.set({NAME: name });
			this.model.save();
//			$('#selectedWhs').html(this.model.get('NAME'));
		},
	
		uploadData:		function(e) {
			if (confirm('Are You Sure?')) {
				this.locationCollection.uploadServer();
				this.render();
			}
		},
	
		clearData:		function() {
			if (confirm('Are You Sure?')) {
//				app.locations.clear();
				this.render();
			}
		}
	
	});

return SettingsView;
});

