var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName,
					   ['ngRoute', 'users', 'example']);

// Hashbang support for single page application which just helps with
// search engines.
mainApplicationModule.config(['$locationProvider',
			      function($locationProvider) {
				  $locationProvider.hashPrefix('!');
			      }
			     ]);

if (window.location.hash === '#_=_') window.location.hash = '#!';

// Use jqlite to bind a function to the document ready event
// 
angular.element(document).ready(function() {
    angular.bootstrap(document, [mainApplicationModuleName]);
});
