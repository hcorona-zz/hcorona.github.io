/* some functions to manage the ratings, that's all*/



function post_to_url(path, access_token) {
	method = "post"; 
	// The rest of this code assumes you are not using a library.
	// It can be made less wordy if you use one.
	var form = document.createElement("form");
	form.setAttribute("method", method);
	form.setAttribute("action", path);
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("name", "access_token");
    hiddenField.setAttribute("value", access_token);
    hiddenField.setAttribute("type", "text");

	form.appendChild(hiddenField);
	document.body.appendChild(form);
	form.submit();
	console.log("form sent");
}

function login() {
    FB.login(function(response) {
    	if (response.authResponse) {
    	     var access_token =   FB.getAuthResponse()['accessToken'];
    	  
    	   
    	     post_to_url("index.jsp",access_token);
            // connected
            testAPI();
        } else {
            // cancelled
        }
    
    }, {scope: 'email,user_likes'});
  
}

	function check() {
		FB.getLoginStatus(function(response) {
			console.log('checked login status');
		});
	}

	function logout() {
		FB.logout(function(response) {
			console.log('User is now logged out');
		});
	}

	function testAPI() {
		console.log('Welcome!  Fetching your information.... ');
		FB.api('/me', function(response) {
			console.log('Good to see you, ' + response.name + '.');
		});
	}
	
	// Load the SDK's source Asynchronously
	(function(d, debug) {
		var js, id = 'facebook-jssdk', ref = d
				.getElementsByTagName('script')[0];
		if (d.getElementById(id)) {
			return;
		}
		js = d.createElement('script');
		js.id = id;
		js.async = true;
		js.src = "//connect.facebook.net/en_US/all"
				+ (debug ? "/debug" : "") + ".js";
		ref.parentNode.insertBefore(js, ref);
	}(document, /*debug*/false));







