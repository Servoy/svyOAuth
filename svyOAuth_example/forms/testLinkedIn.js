/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B0421958-57E7-41E6-9D70-6B0FF5FA8AFF"}
 */
var userName = 'seanthomasdevlin';
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"80870D67-32CC-4B89-A60D-F21D68E65994"}
 */
var clientID = 'lmz1sx2i2c5t';
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"8BA5E5EA-3500-4CB6-9181-905C63CF06A7"}
 */
var clientSecret = '5e3vPXzP7XAaN8iB';

/**
 * @properties={typeid:24,uuid:"AC2BE026-6348-4BF1-9AEB-256BFF83B51F"}
 */
function authorize(){
	var scopeArray = [scopes.svyLinkedIn.SCOPES.BASIC_PROFILE];
	var client = scopes.svyLinkedIn.authorize(clientID,clientSecret,userName, scopeArray);
}

/**
 * @properties={typeid:24,uuid:"217C607C-EC68-4DF3-B059-DD9C9A928AE0"}
 */
function getPeople(){
	application.output(scopes.svyLinkedIn.getPeople());
}