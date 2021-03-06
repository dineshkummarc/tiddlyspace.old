config.defaultCustomFields['server.type'] = 'tiddlyweb';
config.macros.ccLogin.sha1 = false;

config.adaptors.tiddlyweb.prototype.login = function(context,userParams,callback){
	if(window.location.search.substring(1))
		var uriParams = window.location.search.substring(1);
	else
		var uriParams = "";
	context = this.setContext(context,userParams,callback);
	var uriTemplate = '%0/challenge/cookie_form?'+uriParams;
	var uri = uriTemplate.format([context.host]);
	var req = httpReq("POST", uri, config.adaptors.tiddlyweb.loginCallback,
	context, null, 'user='+context.username+'&password='+context.password, null, null, null, true);
};

config.adaptors.tiddlyweb.loginCallback = function(status,context,responseText,uri,xhr){
	if(xhr.status!=200){
		alert('login failed!');
		context.status = false;
	}else{
		alert('Login OK!');
		context.status = true;
	}
	if(context.callback)
		context.callback(context,context.userParams);
};

config.adaptors.tiddlyweb.prototype.logout = function(context,userParams,callback){
	jQuery.cookie('tiddlyweb_user', null, {path:'/'});
	config.options.txtUsername = "GUEST";	
	window.location = window.location;
};

config.adaptors.tiddlyweb.checkLoginStatus= function() {
	if(config.options.txtUserName === "GUEST" || config.options.txtUserName === null )
		return false;
	else
		return true;
};

config.adaptors.tiddlyweb.doRegister = function(context) {
	var uriTemplate = '%0users';
	var uri = uriTemplate.format([config.defaultCustomFields['server.host']]);
	var req = httpReq("POST", uri, config.adaptors.tiddlyweb.registerCallback, null, null, '{"username":"'+context.username+'","password":"'+context.password+'"}', 'application/json', null, null, true); 
}

config.adaptors.tiddlyweb.registerCallback = function(username) {
	console.log('done register stuff');
}

config.adaptors.tiddlyweb.isUsernameAvaliable = function(context,userParams,callback) {
	context.callback = callback;
	context.userParams = userParams;
	var req = httpReq("GET", "/users/"+context.username, config.adaptors.tiddlyweb.isUsernameAvaliableCallback, context); 
}

config.adaptors.tiddlyweb.isUsernameAvaliableCallback = function(status,context,responseText,uri,xhr) {
	if(xhr.status===200){
		context.status = true;	
	}else{
		context.status = false;	
	}
	if(context.callback){
		context.callback(status, context, context.userParams);
	}
}
