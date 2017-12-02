//INITIALIZE THE NODE MODULES
let request = require('request');
let uuid = require("uuid");

//INITIALIZING THE VARIABLE
let FACEBOOK_ID=null;
let FACEBOOK_SECRET=null;
let FACEBOOK_REDIRECT_URI=null;
let FACEBOOK_FAILURE_URI=null;
let FACEBOOK_SCOPE=null;
let dataFlag=0;

//SETTING THE VALUES OF FACEBOOK APP
exports.init=function(data) {
	FACEBOOK_ID=data.ID;
    FACEBOOK_SECRET=data.SECRET;
    FACEBOOK_REDIRECT_URI=data.REDIRECT_URI;
    FACEBOOK_FAILURE_URI=data.FAILURE_URI;
    FACEBOOK_SCOPE=data.SCOPE;
    //PRINT IT IN CONSOLE
    dataFlag=1;
};

//INITIATE THE LOGIN PROCESS
exports.initLogin=function(req, res){
    	if (dataFlag==0) {
           res.redirect(FACEBOOK_FAILURE_URI);
    	}else{
	       res.redirect("https://www.facebook.com/dialog/oauth?client_id="+FACEBOOK_ID+"&redirect_uri="+FACEBOOK_REDIRECT_URI+"&auth_type=rerequest&scope="+FACEBOOK_SCOPE);
    	}
};

//AUTHENTICATE THE APP LOGIN
exports.authenticate=function(req, res, next){
	    let code=req.query.code;
	    request({url:"https://graph.facebook.com/v2.7/oauth/access_token?client_id="+FACEBOOK_ID+"&redirect_uri="+FACEBOOK_REDIRECT_URI+"&client_secret="+FACEBOOK_SECRET+"&code="+code},function(error, response ,body){
	       if (error) {
                res.redirect(FACEBOOK_FAILURE_URI);
                return;
           }
	       let obj=JSON.parse(body);
	       let access_token=obj.access_token;
	       request({url:"https://graph.facebook.com/me?fields=email,name,picture,first_name,last_name,gender&access_token="+access_token},function(error,response,body){
	           if (error) {
	                res.redirect(FACEBOOK_FAILURE_URI);
	                return;
	           }
	           let obj=JSON.parse(body);
	           req.user=obj;
	           next();
	       });
	    });
};