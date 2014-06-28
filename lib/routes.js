'use strict';
var hapi        = require('hapi'),
	joi 		= require('joi'),
	handlers    = require('../lib/handlers.js'),
	routes;


// adds the routes and validation for api
routes = [{
		method: 'GET',
		path: '/',
		config: {
			handler: handlers.index
		}
	},  {
		method: 'GET',
		path: '/images/{file*}',
		handler:{
		    directory:{
				path:'./node_modules/hapi-swagger/public/swaggerui/images'
		    }
		}
	}, {
		method: 'GET',
		path: '/parse/url/',
		config: {
			handler: handlers.parseUrl,
			description: 'Parse microformats from a URL',
			notes: [
				'Parses microformats found in the HTML of URL',
				'Error status codes',
				'400, bad request',
				'404, not found',
				'500, internal server error'
			],
			tags: ['api'],
			validate: { 
				query: {
					url: joi.string()
						.required()
						.description('the url to parse')
				}
			}
		}
	}, {
		method: 'GET',
		path: '/parse/html/',
		config: {
			handler: handlers.parseHtml,
			description: 'Parse microformats from HTML',
			notes: [
				'Parses microformats found in the HTML string',
				'Error status codes',
				'400, bad request',
				'500, internal server error'
			],
			tags: ['api'],
			validate: { 
				query: {
					html: joi.string()
						.required()
						.description('the HTML string to parse'),

					baseurl: joi.string()
						.description('a URL to resolve links in HTML')

				}
			},
			jsonp: 'callback'
		}
	},  {
		method: 'GET',
		path: '/{path*}',
		handler: {
			directory: {
				path: __dirname.replace('/lib','') + '/public',
				listing: false,
				index: true
			}
		}
	}];


exports.routes = routes;