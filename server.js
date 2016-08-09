//INITIALIZE THE NODE MODULES
request= require('request');
uuid=require("uuid");

//INITIALIZE THE SOCIAL MEDIA FILES
var facebook=require('./socialMediaController/facebook.js');
var google=require('./socialMediaController/google.js');
var linkedin=require('./socialMediaController/linkedin.js');

//INITIALIZING THE ROUTES
//INITIALIZE THE APP CREDENTIAL
exports.init=function(option,data){
	switch(option){
		case "facebook":
            facebook.init(data);
		    break;
		case "google":
		    google.init(data);
		    break;
		case "linkedin":
		    linkedin.init(data);
		    break;
		default:
		    break;
	};
};

//INITIALIZE THE APP LOGIN
exports.initLogin=function(option,callback){
    switch(option){
		case "facebook":
		    return function callback(req, res, next){
                facebook.initLogin(req, res);
            };
		    break;
		case "google":
		    return function callback(req, res, next){
                google.initLogin(req, res);
            };
		    break;
		case "linkedin":
		    return function callback(req, res, next){
                linkedin.initLogin(req, res);
            };
		    break;
		default:
		    break;
	};
};

//AUTHENTICATE THE APP LOGIN
exports.authenticate=function(option,callback){
    switch(option){
		case "facebook":
		    return function callback(req, res, next){
                facebook.authenticate(req, res, next);
            };
		    break;
		case "google":
		    return function callback(req, res, next){
                google.authenticate(req, res, next);
            };
		    break;
		case "linkedin":
		    return function callback(req, res, next){
                linkedin.authenticate(req, res, next);
            };
		    break;
		default:
		    break;
	};
};
//END OF INITIALIZATIND THE ROUTES