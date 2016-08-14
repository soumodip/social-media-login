Social Media Login makes OAUTH Login procedure very easy which has been explained in the steps below:

1. Initalize a variable which contains the social-media-login plugin - 

var social_media_login=require('social-media-login');

2. Now, initialize the credentials of the respected social media site you want to set OAUTH Login for ( Facebook / Google /Linkedin )
Here the implementation for facebook is shown:

social_media_login.init("facebook",{

	ID:"XXXXXXXXXXX",

	SECRET:"XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",

	REDIRECT_URI:"http://something.com/oauth/facebook/callback",

	FAILURE_URI:"http://something.com/failure",

	SCOPE:"email"

});

3. Now implement the OAUTH Login
Suppose app is the express server

app.get('/facebook', social_media_login.initLogin("facebook") );

4. Now authenticate the OAUTH Login
Suppose app is the express server

app.get('/oauth/facebook/callback', social_media_login.authenticate("facebook") , function(req,res){

    //WRITE YOUR CODE

});

NOTE : For google just change the value "facebook" to "google"
Example social_media_login.initLogin("google");

NOTE : For linkedin just change the value "facebook" to "linkedin"
Example social_media_login.initLogin("linkedin"); 

Additional Help : 

Scope ( FACEBOOK ) : email

Scope ( GOOGLE ) : https://www.googleapis.com/auth/userinfo.email

Scope ( LINKEDIN ) : r_basicprofile%20r_emailaddress




