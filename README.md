<h2><b>social-media-login</b></h2>
<hr/>
<p><i style="font-size:18px;"><b>social-media-login</b></i> is a NPM Module which allows developers to  implement OAuth 2 login of 3 major websites ( <i style="font-size:18px;"><b>Google</b></i>, <i style="font-size:18px;"><b>Facebook</b></i> & <i style="font-size:18px;"><b>Linkedin</b></i> ) with just some lines of code</p>
<hr/>
<h3><b>Steps</b></h3>
<ul>
	<li>
		<p>Initalize a variable which contains the social-media-login plugin</p>
		<pre>
		<code>
let socialMediaLogin = require('social-media-login');</code>
		</pre>
		<p>Or in ES 6/7</p>
		<pre>
		<code>
import socialMediaLogin from 'social-media-login';</code>
		</pre>
	</li>
	<li>
		<p>Now, initialize the credentials of the respected social media site you want to set OAuth 2 login for ( Facebook / Google /Linkedin )</p>
		<pre>
			<code>
socialMediaLogin.init("facebook",{
	ID:"XXXXXXXXXXX",
	SECRET:"XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	REDIRECT_URI:"http://website/oauth/facebook/callback",
	FAILURE_URI:"http://website/failure",
	SCOPE:"email"
});</code>
		</pre>
	</li>
	<li>
		<p>Now implement the OAuth 2 login</p>
		<p>Suppose your NodeJS application is running with Express</p>
		<pre>
			<code>
app.get('/facebook', socialMediaLogin.initLogin("facebook") );</code>
		</pre>
	</li>
	<li>
		<p>Now authenticate the Oauth 2 login</p>
		<p>Suppose your NodeJS application is running with Express</p>
		<pre>
			<code>
app.get('/oauth/facebook/callback', 			socialMediaLogin.authenticate("facebook") , function(req,res){
	//WRITE YOUR CODE
});</code>
		</pre>
	</li>
	<li>
		<p>Whoah Done ! Just a few tips from our side :</p>
		<p>* Remember to change the type "facebook" to "google" / "linkedin" as your case may be, and along with that change the SCOPE too</p>
	</li>
</ul>
<hr/>
<h3><b>Scopes</b></h3>
<p><b><i>facebook</i></b>: email</p>
<p><b><i>google</i></b>: https://www.googleapis.com/auth/userinfo.email</p>
<p><b><i>linkedin</i></b>: r_basicprofile%20r_emailaddress</p>
<hr/>
<p style="width: 100%;text-align: center;">Developed with ❤️ by <a href="http://www.soumodippaul.com/">Soumodip Paul</a></p>