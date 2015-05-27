
'use strict';
var fs				= require('fs'),
	path            = require('path'),
	hapi            = require('hapi'),
	parser          = require('microformat-node'),
	config          = require('../config.js'),
	pack            = require('../package'),
	utils           = require('../lib/utilities.js');
	

// refines configure using server context
config = utils.processConfig( config )


function index(request, reply) {
	utils.getMarkDownHTML(__dirname.replace('/lib','') + '/README.md', function(err, data){
		reply.view('swagger.html', {
			title: pack.name,
			basepath: (config.server.basepath)? config.server.basepath + '/' : '/',
			markdown: data
		});
	});
}


function parseUrl(request, reply) {
	var options = {textFormat: 'normalised'},
		url = request.query.url;
		
	if(request.query.textformat){
		options.textFormat = request.query.textformat;
	}	

	parser.parseUrl(url, options, function(err, data){
    	renderJSON( request, reply, err, data );
	});
}


function parseHtml(request, reply) {
	var options = {textFormat: 'normalised'},
		html = request.query.html;

	if(request.query.baseurl){
		options.baseUrl = request.query.baseurl;
	}	
	if(request.query.textformat){
		options.textFormat = request.query.textformat;
	}	

	parser.parseHtml(html, options, function(err, data){
	    renderJSON( request, reply, err, data );
	});
}


// render json out to http stream
function renderJSON( request, reply, error, result ){
	if(error){
		if( utils.isString( error ) ){
			reply( utils.buildError( 400, error ) );
		}else{
			reply( error );
		}
	}else{
		reply(result).type('application/json; charset=utf-8');
	}
}


exports.index = index;
exports.parseUrl = parseUrl
exports.parseHtml = parseHtml;






