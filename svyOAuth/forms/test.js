/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C128F314-D1BD-4FB6-883C-27B04C5BD76B"}
 */
var clientID = '298a52f265ddb9261df077cbdf23e68b006e9a0eb13dfdb9e0fe628718320003';
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D12CAFDC-5A3D-4761-86E7-8CF9FA052AF6"}
 */
var clientSecret = 'f3322cf176e7983de9e672669cbd7456acf7c9ef92af48a37aa9d5f599758475';
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C2C50AD3-A666-4987-B968-B382E9E7C2D3"}
 */
var tokenServerURL = 'https://api.resourceguruapp.com/oauth/token';
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"24BF8B23-BF53-44C1-8819-9AFE0E94B568"}
 */
var authServerURL = 'https://api.resourceguruapp.com/oauth/authorize';
/**
 * @properties={typeid:35,uuid:"45CF1261-7B60-4EF3-948A-908A60FF7BF6",variableType:-4}
 */
var scopeArray = [];
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"96D451F4-A5BF-47A4-8D09-5BBE1975A789"}
 */
function test(event) {
//	var code = scopes.svyGoogle.authorize(['https://www.googleapis.com/auth/calendar'])
//	scopes.svyGoogleCalendar.list()
//	scopes.svyGoogleCalendar.test();
//	var authorization = scopes.svyGoogle.createAuthorization()
//		.setClientID(clientID)
//		.setClientSecret(clientSecret)
//		.setTokenServerURL(tokenServerURL)
//		.setAuthServerURL(authServerURL);
//	
	var authorization = scopes.svyGoogle.createAuthorizationRequest()
		.setClientID(scopes.svyGoogleCalendar.OAUTH.web.client_id)
		.setClientSecret(scopes.svyGoogleCalendar.OAUTH.web.client_secret)
		.setTokenServerURL(scopes.svyGoogleCalendar.OAUTH.web.token_uri)
		.setAuthServerURL(scopes.svyGoogleCalendar.OAUTH.web.auth_uri)
		.addScope('https://www.googleapis.com/auth/calendar')
	var client = authorization.execute('seanandnaila');
	
	var get = client.get('https://www.googleapis.com/calendar/v3/users/me/calendarList');
	var res = get.execute();
	application.output(res.getStatusCode());
}
