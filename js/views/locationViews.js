define(["backbone", "marionette"
        , "text!templates/locationLayout.html" 
        , "text!templates/locationEntry.html"
        , "text!templates/locationList.html"
        , "text!templates/locationListItem.html"
        ], 
		function(Backbone, Marionette, LayoutTemplate, EntryTemplate, ListTemplate, ListItemTemplate) {

	var Layout       = Backbone.Marionette.LayoutView.extend({
		template:					LayoutTemplate,
		className:				'row',
		regions:			{
			entryRegion:				"#locationEntry",
			listRegion:				"#locationList"
		}
	
	});
	
	var EntryView = Backbone.Marionette.ItemView.extend({
		template: 		_.template( EntryTemplate ),

		events: {
			"click #btnSave":		  "addNew",
			"keyup #PBI":			  "checkPBI",
			"click #sectionDirection": 	  "toggleDirection"
		},
				
		initialize:		function(options) {
//			this.on('all', function(e) { console.log('Entry View: ' + e); });
			this.settingsModel = options.settingsModel;
			this.pubSub = options.pubSub;
			this.direction = 1;
			this.sectionBales = 0;
			this.model.on("invalid", this.invalid);
//			this.model.on("change:LOCATION", this.render);
		},

		templateHelpers:			function() {
			return {
				sectionBales: this.sectionBales
			}
		},
		
		checkPBI:						function(e) {
			if (e.which == 13) {
				this.addNew();	
			};
		},
		
		invalid:			function(model, error) {
			alert(error);
		},
		
		ui: {
			loc:	"#LOCATION",
			pbi:	"#PBI"
		},
		
		addNew:		function() {
			this.model.set({PBI: this.ui.pbi.val(), LOCATION: this.ui.loc.val().toUpperCase()});
			if (!this.model.isValid()) return;
			this.pubSub.trigger('location:add', this.model);
//			this.ui.pbi.val('');
			this.sectionBales++;
			if (this.sectionBales >= this.settingsModel.get('incrementBales'))
				this.incrementSection();
			this.$('#sectionBales').html(this.sectionBales);
		},
		
		toggleDirection:				function(e) {
		$(e.currentTarget).children(0).removeClass('glyphicon-triangle-top').removeClass('glyphicon-triangle-bottom');
			this.direction = this.direction * -1;
			if (this.direction > 0)
				$(e.currentTarget).children(0).addClass('glyphicon-triangle-top');
			else
				$(e.currentTarget).children(0).addClass('glyphicon-triangle-bottom');
			this.sectionBales = 0;
		},
		
	 	incrementSection:			function() {
			var loc = this.ui.loc.val().toUpperCase();
			var newLoc = loc.substr(0,4) + String.fromCharCode(loc.charCodeAt(4)+this.direction);
			this.model.set({LOCATION: newLoc});
			this.ui.loc.val(newLoc);
			this.sectionBales = 0;
		}	
		
	});

	var ListItemView = Backbone.Marionette.ItemView.extend({
		initialize:		function() {
//				this.on('all', function(e) { console.log('ListItemView: ' + e); });
		},
		
		template:		ListItemTemplate,
		tagName:		"tr"
	});


	var ListView = Marionette.CompositeView.extend({
		initialize:		function(options) {
			this.pubSub = options.pubSub;
//						this.on('all', function(e) { console.log('ListView: ' + e); });
		},
		template:						ListTemplate,
		childView:						ListItemView,
		childViewContainer:		"tbody",
		onShow:		function() {
			$(window).trigger('resize');						// trigger window resize event to adjust scrollable table data div
		},
		
		collectionEvents: {
			"add": "onRender"
		},
		
		onRender: function() {
			this.$('#numLocs').html(this.collection.length);
		},
		
		attachHtml: function(collectionView, childView, index) {
			collectionView.$(collectionView.childViewContainer).prepend(childView.$el);
  	    }
		
	});
	
return {
	Layout: Layout,
	EntryView: EntryView,
	ListView: ListView
	}	
});

