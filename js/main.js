require.config({
	urlArgs: "bust=" + (new Date()).getTime(),

	paths: {
		jquery: 'lib/jquery-2.1.0.min',
		backbone: 'lib/backbone-1.1.2.min',
		bootstrap: 'lib/bootstrap.min',
		underscore: 'lib/underscore-1.5.2.min',
		templates: "../templates",
//		dualStorage: "lib/backbone.dualStorage",
		localStorage: "lib/backbone.localStorage",
		marionette: 'lib/backbone.marionette.min',
		modules: 'modules',
		models: 'models',
		common: 'common',
		commonTemplates: 'common\templates'
	},
	
	shim: {
		underscore: {
			exports: "_",
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: "Backbone"
		},
		marionette: {
			deps: ['backbone'],
			exports: "Marionette"
		},
		bootstrap: {
			deps: ['jquery'],
			exports: "Bootstrap"
		},
		localStorage: {
			deps: ["backbone"]
		}
	}
});

require(["app", "localStorage", "bootstrap"
         		, "modules/settingsModule"
         		, "modules/scanLocationModule"
             ], function(app) {
	app.start();
});
