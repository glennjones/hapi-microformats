
'use strict';


if(require.main === module) { 
	// if they want the app
    var app = require('../bin/hapi-microformats');
}else{ 
	// if they want a module interface
	var routes = require('../lib/routes'),
		parser = require('microformat-node');

	module.exports = {
		'routes': routes.routes,
		'parseUrl': parser.parseUrl,
		'parseHtml': parser.parseHtml
	}
}