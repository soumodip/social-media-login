//INITIALIZE THE SOCIAL MEDIA FILES
var Facebook = require('./SocialMediaController/Facebook.js');
var Google = require('./SocialMediaController/Google.js');
var Linkedin = require('./SocialMediaController/Linkedin.js');

//INITIALIZING THE ROUTES
//INITIALIZE THE APP CREDENTIAL
exports.init=function(option,data){
	switch(option){
		case "facebook":
			Facebook.init(data);
		    break;
		case "google":
			Google.init(data);
		    break;
		case "linkedin":
			Linkedin.init(data);
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
                Facebook.initLogin(req, res);
            };
		    break;
		case "google":
		    return function callback(req, res, next){
                Google.initLogin(req, res);
            };
		    break;
		case "linkedin":
		    return function callback(req, res, next){
                Linkedin.initLogin(req, res);
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
                Facebook.authenticate(req, res, next);
            };
		    break;
		case "google":
		    return function callback(req, res, next){
                Google.authenticate(req, res, next);
            };
		    break;
		case "linkedin":
		    return function callback(req, res, next){
                Linkedin.authenticate(req, res, next);
            };
		    break;
		default:
		    break;
	};
};
//END OF INITIALIZATING THE ROUTES