/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6C104767-635A-49E6-BD12-0C2D7E93FAC1"}
 */
var AUTH_URI = 'https://www.linkedin.com/uas/oauth2/authorization?state=abcdefg';
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"8B879D3A-38A0-4FDE-9795-8295621ED4C2"}
 */
var TOKEN_URI = 'https://www.linkedin.com/uas/oauth2/accessToken';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E086FD11-901D-424E-A617-73A427DB172F"}
 */
var PEOPLE = 'https://api.linkedin.com/v1/people/~?format=json'
/**
 * @type {scopes.svyOAuth.AuthorizationRequest}
 *
 * @properties={typeid:35,uuid:"8DA0AFEA-5012-4F07-BDFA-1E4499009485",variableType:-4}
 */
var auth;

/**
 * @type {scopes.svyOAuth.AuthorizedClient}
 *
 * @properties={typeid:35,uuid:"0B992A79-38ED-4F2E-A670-B9794B21D396",variableType:-4}
 */
var client;

/**
 * @public 
 * @enum 
 * @properties={typeid:35,uuid:"07B6FE3D-12F4-4E0A-8188-BA9DB03F5AE9",variableType:-4}
 */
var SCOPES = {
	BASIC_PROFILE:'r_basicprofile',
	EMAIL_ADDRESS:'r_emailaddress',
	SHARE:'w_share'
}
/**
 * @return {scopes.svyOAuth.AuthorizedClient}
 * @properties={typeid:24,uuid:"41A61CF4-FA63-473A-868A-8A2383FACB47"}
 */
function authorize(clientID, clientSecret, userName, scopeArray){
	auth = scopes.svyOAuth.createAuthorizationRequest()
		.setAuthServerURL(AUTH_URI)
		.setClientID(clientID)
		.setClientSecret(clientSecret)
		.setTokenServerURL(TOKEN_URI);
	if(scopeArray){
		for(var i in scopeArray){
			auth.addScope(scopeArray[i]);
		}
	}
	client = auth.execute(userName);
	return client;
}

/**
 * @properties={typeid:24,uuid:"447BE3DC-FB53-4AFE-A7DA-8D0B242328FF"}
 */
function getPeople(){
	var response = client.get(PEOPLE).execute();
	application.output(response.getContent());
}