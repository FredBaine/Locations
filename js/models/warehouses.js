define(["backbone"], function(Backbone) {

	var WhsModel = Backbone.Model.extend({
		idAttribute:			"WHS",
		url:					"cpWhsMst.cfc?method=getWarehouse",
//		storeName:		'warehouse_',
	});

	var WhsCollection = Backbone.Collection.extend({
		initialize: function() {
//			this.on('all', function(e) { console.log('WhsCollection: ' + e); });
		},
		model:			WhsModel,
		url:				"cpWhsMst.cfc?method=getWarehouses",

	});

return WhsCollection;
});