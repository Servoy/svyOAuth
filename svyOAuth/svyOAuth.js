

/**
 * @private 
 * @type {Packages.com.google.api.client.util.store.FileDataStoreFactory}
 * @properties={typeid:35,uuid:"EF93391D-A662-413C-B45F-468C11A6CB5E",variableType:-4}
 */
var DATA_STORE_FACTORY = null;

/**
 * @private 
 * @type {java.io.File}
 *
 * @properties={typeid:35,uuid:"E4BA3384-6E30-4B54-B92A-D8202D9BB46D",variableType:-4}
 */
var DATA_STORE_DIR = null;

/**
 * @private 
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2B4AF662-1140-4D28-A272-B83164068E66"}
 */
var REDIRECT_HOST = 'localhost';

/**
 * @private 
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"7988C97A-1B2E-4978-87D2-EFF82F14C1B3",variableType:8}
 */
var REDIRECT_PORT = 9001;

/**
 * @private 
 * @type {Packages.com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver}
 * @properties={typeid:35,uuid:"6D371FB2-B39D-4FE8-8B92-CEAA8CE469BE",variableType:-4}
 */
var localServerReceiver = null;
/**
 * @private 
 * @type {Packages.com.google.api.client.http.HttpRequestFactory}
 * @properties={typeid:35,uuid:"B75F5F58-A1D7-43D2-BF17-E29352C7FEC8",variableType:-4}
 */
var requestFactory = new Packages.com.google.api.client.http.javanet.NetHttpTransport().createRequestFactory();

/**
 * @private 
 * @properties={typeid:35,uuid:"C647B8E0-FE16-4629-8EDE-94A8E9AC345C",variableType:-4}
 */
var jsonParser = Packages.com.google.api.client.json.jackson2.JacksonFactory.getDefaultInstance().createJsonObjectParser();

/**
 * @public 
 * @return {AuthorizationRequest}
 * @properties={typeid:24,uuid:"87637279-B6F7-42AA-9EC0-033FFA1009FC"}
 */
function createAuthorizationRequest(){
	return new AuthorizationRequest();
}

/**
 * @private   
 * @constructor 
 * @param {com.google.api.client.auth.oauth2.Credential} credential
 *
 * @properties={typeid:24,uuid:"4DCE39E7-D7B7-41A9-8E96-1B92A818F6BD"}
 */
function AuthorizedClient(credential){
	
	/**
	 * @protected 
	 * @return {com.google.api.client.auth.oauth2.Credential}
	 */
	this.getCredential = function(){
		return credential;
	}
	
	/**
	 * @public 
	 * @param {String} url
	 * @return {HttpRequest}
	 */
	this.get = function(url){
		
		var req = requestFactory.buildGetRequest(
			new Packages.com.google.api.client.http.GenericUrl(url));

		credential.initialize(req);
		return new HttpRequest(req);
	}
	
	/**
	 * @public 
	 * @param {String} url
	 * @param {String} jsonContent
	 * @return {HttpRequest}
	 */
	this.post = function(url,jsonContent){
		var req = requestFactory.buildPostRequest(
			new Packages.com.google.api.client.http.GenericUrl(url),
			Packages.com.google.api.client.http.ByteArrayContent.fromString('application/json', jsonContent));
		credential.initialize(req);
		return new HttpRequest(req);
	}
	
	/**
	 * @public 
	 * @param {String} url
	 * @param {String} jsonContent
	 * @return {HttpRequest}
	 */
	this.put = function(url,jsonContent){
		var req = requestFactory.buildPutRequest(
			new Packages.com.google.api.client.http.GenericUrl(url),
			Packages.com.google.api.client.http.ByteArrayContent.fromString('application/json', jsonContent));
		credential.initialize(req);
		return new HttpRequest(req);
	}
	
	/**
	 * @public 
	 * @param {String} url
	 * @return {HttpRequest}
	 */
	this.remove = function(url){
		var req = requestFactory.buildDeleteRequest(
			new Packages.com.google.api.client.http.GenericUrl(url));
		credential.initialize(req);
		return new HttpRequest(req);
	}
}

/**
 * @private 
 * @constructor 
 * @properties={typeid:24,uuid:"E585BCC2-8C26-4257-A399-ED2703C6AC2C"}
 */
function AuthorizationRequest(){

	/**
	 * @protected  
	 */
	this.clientID = null;
	
	/**
	 * @protected 
	 */
	this.clientSecret = null;
	
	/**
	 * @protected 
	 */
	this.tokenServerURL = null;
	
	/**
	 * @protected 
	 */
	this.authServerURL = null;
	
	/**
	 * @protected 
	 */
	this.scopeArray = [];
	
	var flow = null;
	
	/**
	 * @public 
	 * @param {String} clientID
	 * @return {AuthorizationRequest}
	 */
	this.setClientID = function(clientID){
		this.clientID = clientID;
		return this;
	}
	
	/**
	 * @public 
	 * @param {String} clientSecret
	 * @return {AuthorizationRequest}
	 */
	this.setClientSecret = function(clientSecret){
		this.clientSecret = clientSecret;
		return this;
	}
	
	/**
	 * @public 
	 * @param {String} tokenServerURL
	 * @return {AuthorizationRequest}
	 */
	this.setTokenServerURL = function(tokenServerURL){
		this.tokenServerURL = tokenServerURL;
		return this;
	}
	
	/**
	 * @public 
	 * @param {String} authServerURL
	 * @return {AuthorizationRequest}
	 */
	this.setAuthServerURL = function(authServerURL){
		this.authServerURL = authServerURL;
		return this;
	}
	
	/**
	 * @public 
	 * @param {String} scope
	 * @return {AuthorizationRequest}
	 */
	this.addScope = function(scope){
		this.scopeArray.push(scope);
		return this;
	}
	
	/**
	 * TODO Error handling
	 * TODO Logging
	 * @public 
	 * @param {String} userName
	 * @return {AuthorizedClient}
	 */
	this.execute = function(userName){
		var app = new Packages.com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp(
			this.getFlow(), 
			getLocalServerReceiver());

		var credential = app.authorize(userName);
		return new AuthorizedClient(credential);
	}
	
	/**
	 * @protected   
	 * @return {Packages.com.google.api.client.auth.oauth2.AuthorizationCodeFlow}
	 */
	this.getFlow = function(){
		if(flow){
			return flow;
		}
	    // Build flow and trigger user authorization request.
		var method = Packages.com.google.api.client.auth.oauth2.BearerToken.authorizationHeaderAccessMethod()
		flow =
            new Packages.com.google.api.client.auth.oauth2.AuthorizationCodeFlow.Builder(
            		method,
            		new Packages.com.google.api.client.http.javanet.NetHttpTransport(), 
					Packages.com.google.api.client.json.jackson2.JacksonFactory.getDefaultInstance(), 
					new Packages.com.google.api.client.http.GenericUrl(this.tokenServerURL),
					new Packages.com.google.api.client.auth.oauth2.ClientParametersAuthentication(
						this.clientID, 
						this.clientSecret),
						this.clientID,
					new Packages.com.google.api.client.http.GenericUrl(this.authServerURL)
			)
			.setScopes(toList(this.scopeArray))
            .setDataStoreFactory(getDataStoreFactory())
//	        .setAccessType("offline") ???
            .build();
	     return flow; 
	}
}

/**
 * @private 
 * @constructor 
 * @param {Packages.com.google.api.client.http.HttpRequest} req
 * @properties={typeid:24,uuid:"BE7CE564-20C7-4043-A4B3-978698DCAACF"}
 */
function HttpRequest(req){
	
	/**
	 * @public 
	 * @param {String} url
	 * @return {HttpRequest}
	 */
	this.setURL = function(url){
		req.setUrl(
			new Packages.com.google.api.client.http.GenericUrl(url));
		return this;
	}
	
	/**
	 * @public 
	 * @param {String} json
	 * @return {HttpRequest}
	 */
	this.setContent = function(json){
		req.setContent(
			Packages.com.google.api.client.http.ByteArrayContent.fromString('application/json', json));
		return this;
	}
	
	/**
	 * @public 
	 * @param {String} name
	 * @param {String} value
	 * @return {HttpRequest}
	 */
	this.addHeader = function(name,value){
		req.getHeaders().put(name,value);
		return this
	}
	
	/**
	 * @public 
	 * @return {HttpResponse}
	 */
	this.execute = function(){
		req.setParser(jsonParser);
		var res = req.execute();
		return new HttpResponse(res);
	}
}

/**
 * @private 
 * @param {Packages.com.google.api.client.http.HttpResponse} res
 * @constructor 
 * @properties={typeid:24,uuid:"5E5F40CB-F233-4B2B-9133-A1A989E33EF9"}
 */
function HttpResponse(res){
	
	/**
	 * @public 
	 * @return {Number}
	 */
	this.getStatusCode = function(){
		return res.getStatusCode();
	}
	
	/**
	 * @public 
	 * @return {String}
	 */
	this.getStatusMessage = function(){
		return res.getStatusMessage();
	}
	
	/**
	 * @public 
	 * @return {String}
	 */
	this.getContent = function(){
		return res.parseAsString();
	}
}

/**
 * @private 
 * @return {Packages.com.google.api.client.util.store.FileDataStoreFactory}
 * @properties={typeid:24,uuid:"0C893D3F-212E-488C-A295-0973C3705109"}
 */
function getDataStoreFactory(){
	if(!DATA_STORE_FACTORY){
		DATA_STORE_FACTORY = new Packages.com.google.api.client.util.store.FileDataStoreFactory(getDataStoreDir());
	}
	return DATA_STORE_FACTORY;
}

/**
 * TODO Externalize for configuration ?
 * @private 
 * @return {java.io.File}
 * @properties={typeid:24,uuid:"A974AF3C-CBEF-48EE-8602-951B7C36DDC8"}
 */
function getDataStoreDir(){
	if(!DATA_STORE_DIR){
		DATA_STORE_DIR = new java.io.File(
			java.lang.System.getProperty("user.home"), ".servoy/oAuth-dataStore");
	}
	return DATA_STORE_DIR;
}

/**
 * TODO Use redirect settings
 * @private 
 * @return {Packages.com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver}
 * @properties={typeid:24,uuid:"1442E071-2530-4383-960B-3C875343B60B"}
 */
function getLocalServerReceiver(){
    if(localServerReceiver == null){
        localServerReceiver = new Packages.com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver.Builder()
        	.setHost(REDIRECT_HOST)
        	.setPort(REDIRECT_PORT)
			.build();
    }else{
        localServerReceiver.stop();
        localServerReceiver = new Packages.com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver.Builder().setPort(9001).build();
    }
    
    return localServerReceiver ;
}

/**
 * @private 
 * @param {Array<*>} array
 * @return {Packages.java.util.List}
 * @properties={typeid:24,uuid:"BE450D8F-36DF-48AB-8CB4-AE64AAD1B02F"}
 */
function toList(array){
	var list = Packages.java.util.Arrays.asList(array);
	return list
}
