var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName,
					   ['ngRoute', 'example']);

// Hashbang support for single page application which just helps with
// search engines.
mainApplicationModule.config(['$locationProvider',
			      function($locationProvider) {
				  $locationProvider.hashPrefix('!');
			      }
			     ]);

// Use jqlite to bind a function to the document ready event
// 
angular.element(document).ready(function() {
    angular.bootstrap(document, [mainApplicationModuleName]);
});
