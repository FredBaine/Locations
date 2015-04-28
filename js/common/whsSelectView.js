define(["app", "backbone", "marionette", "jquery", "underscore"
        , "text!common/templates/whsSelect.html"
        , "text!common/templates/whsOption.html"
        ], 
		function(app, Backbone, Marionette, jquery, underscore, whsSelectTemplate, whsOptionTemplate) {
	
			var WhsOptionView = Backbone.Marionette.ItemView.extend({
				initialize:		function(options) {
					this.pubSub = options.pubSub;
					this.currentWhs = options.currentWhs;
//						this.on('all', function(e) { console.log('WhsOptionView: ' + e); });
				},
				events:			{
//					"click":	"triggerClicked"
				},
			
				triggerClicked: function(e) {
					this.pubSub.trigger('whs:changed', this.model);
				},
				
				template:		whsOptionTemplate,
				tagName:		"option",
				onRender: function() {
					if (this.model.get('WHS') == this.currentWhs)
						this.$el.attr('selected', true);
					this.$el.attr('value', this.model.get('WHS'));
				}
			});

			var whsSelectView = Marionette.CompositeView.extend({
				initialize:		function(options) {
					this.pubSub = options.pubSub;
					this.currentWhs = options.currentWhs;
//					this.model.on('all', function(e) { console.log('whsSelectView: ' + e); });
				},

				events:			{
					"change":	"triggerChange"
				},

				className: 'selectWhs form-group',
			
				triggerChange: function(e) {
					var whsModel = this.collection.findWhere({WHS: this.$('select').val()})
					this.pubSub.trigger('whs:changed', whsModel);
				},

				childViewOptions: function() {
					return {
						pubSub: this.pubSub,
						currentWhs: this.currentWhs
					}
				},
			
				template:					whsSelectTemplate,
				childView:					WhsOptionView,
				childViewContainer:		"select"

			});
			
		return whsSelectView;
		
	});
	
