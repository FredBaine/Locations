app.Views.LocationSummaryRow = Backbone.View.extend({

	tagName: 		"tr",
	className: 	"locationSummaryRow",
	template: 		_.template(app.templates.locationSummaryRow),
	
	events: {
	},
	
	initialize:		function(sum) {		
		this.listenTo(app, "app:resetting", this.close, this);
		this.$el.html(this.template(sum));
		return this;
	},

	close:				function() {
		this.stopListening();
		this.unbind();
		this.$el.remove();
	}
	
});
