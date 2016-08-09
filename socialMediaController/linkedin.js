//INITIALIZING THE VARIABLE
var LINKEDIN_ID=null;
var LINKEDIN_SECRET=null;
var LINKEDIN_REDIRECT_URI=null;
var LINKEDIN_FAILURE_URI=null;
var LINKEDIN_SCOPE=null;
var dataFlag=0;

//SETTING THE VALUES OF LINKEDIN APP
exports.init=function(data) {
	  LINKEDIN_ID=data.ID;
    LINKEDIN_SECRET=data.SECRET;
    LINKEDIN_REDIRECT_URI=data.REDIRECT_URI;
    LINKEDIN_FAILURE_URI=data.FAILURE_URI;
    LINKEDIN_SCOPE=data.SCOPE;
    //PRINT IT IN CONSOLE
    dataFlag=1;
    console.log("LINKEDIN APP CREDENTIALS HAVE BEEN SAVED.");
};

//INITIATE THE LOGIN PROCESS
exports.initLogin=function(req, res){
    	if (dataFlag==1) {
          var crypto=uuid.v4();
          res.redirect("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id="+LINKEDIN_ID+"&redirect_uri="+LINKEDIN_REDIRECT_URI+"&state="+crypto+"&scope="+LINKEDIN_SCOPE+"");
      }else{
    	   res.redirect(LINKEDIN_FAILURE_URI);
    	}
};

//AUTHENTICATE THE APP LOGIN
exports.authenticate=function(req, res, next){
	    request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     'https://www.linkedin.com/oauth/v2/accessToken',
        body:    "grant_type=authorization_code&code="+req.query.code+"&redirect_uri="+LINKEDIN_REDIRECT_URI+"&client_id="+LINKEDIN_ID+"&client_secret="+LINKEDIN_SECRET+""
      }, function(error, response, body){
          if (error) {
            res.redirect(LINKEDIN_FAILURE_URI);
            return;
          }
          var obj=JSON.parse(body);
          request.get('https://api.linkedin.com/v1/people/~:(id,headline,first-name,last-name,email-address,picture-url)?format=json', {
          'auth': {
            'bearer': obj.access_token
          }
        },function(error, response, body){
                if (error) {
                  res.redirect(LINKEDIN_FAILURE_URI);
                  return;
                }
                var obj=JSON.parse(body);
                req.user=obj;
                next();
        });
      });
};