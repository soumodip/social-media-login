//INITIALIZING THE VARIABLE
var GOOGLE_ID=null;
var GOOGLE_SECRET=null;
var GOOGLE_REDIRECT_URI=null;
var GOOGLE_FAILURE_URI=null;
var GOOGLE_SCOPE=null;
var dataFlag=0;

//SETTING THE VALUES OF GOOGLE APP
exports.init=function(data) {
	GOOGLE_ID=data.ID;
    GOOGLE_SECRET=data.SECRET;
    GOOGLE_REDIRECT_URI=data.REDIRECT_URI;
    GOOGLE_FAILURE_URI=data.FAILURE_URI;
    GOOGLE_SCOPE=data.SCOPE;
    //PRINT IT IN CONSOLE
    dataFlag=1;
    console.log("--GOOGLE APP CREDENTIALS HAVE BEEN SAVED--");
};

//INITIATE THE LOGIN PROCESS
exports.initLogin=function(req, res){
    	if (dataFlag==1) {
           res.redirect("https://accounts.google.com/o/oauth2/auth?client_id="+GOOGLE_ID+"&redirect_uri="+GOOGLE_REDIRECT_URI+"&scope="+GOOGLE_SCOPE+"&response_type=code");
        }else{
    	   res.redirect(GOOGLE_FAILURE_URI);
    	}
};

//AUTHENTICATE THE APP LOGIN
exports.authenticate=function(req, res, next){
	    request.post({
          headers: {'content-type' : 'application/x-www-form-urlencoded'},
          url:     'https://www.googleapis.com/oauth2/v4/token',
          body:    "code="+req.query.code+"&client_id="+GOOGLE_ID+"&client_secret="+GOOGLE_SECRET+"&redirect_uri="+GOOGLE_REDIRECT_URI+"&grant_type=authorization_code"
        }, function(error, response, body){
            if (error) {
                res.redirect(GOOGLE_FAILURE_URI);
                return;
            }
            var obj=JSON.parse(body);
            request.get('https://www.googleapis.com/oauth2/v2/userinfo', {
              'auth': {
                'bearer': obj.access_token
              }
            },function(error, response, body){
                if (error) {
                    res.redirect(GOOGLE_FAILURE_URI);
                    return;
                }
                var obj=JSON.parse(body);
                req.user=obj;
                next();
            });
        });
};