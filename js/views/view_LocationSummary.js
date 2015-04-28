app.Views.LocationSummary = Backbone.View.extend({

		id: "divLocationsSummary",
		template: _.template(app.templates.locationSummary),
		
		initialize: function(summary) {
			var self = this;
			this.$el.html(this.template( this ));
			_.each(summary, function(sum) {
				var tableRow = new app.Views.LocationSummaryRow(sum);
				self.$('tbody').append(tableRow.el);
			});
			return this;
		},
				
		
		close:				function() {
//			this.stopListening();
			this.unbind();
			this.$el.remove();
		}
		
})
				
