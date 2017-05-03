/**
 * Hold user input for API client ID
 * @private 
 * @type {String}
 *
 * @properties={typeid:35,uuid:"16ED6D58-8EDD-418F-851B-C39C581F4AF7"}
 */
var clientID = '';

/**
 * Hold user input for API client secrect
 * @private 
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2263566B-9CCB-4FA3-9FF0-212F6AEF6A4B"}
 */
var clientSecret = '';

/**
 * OAuth provider authorization URL
 * @private 
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E176C238-CCB0-4794-BE88-7DC66D25C538"}
 */
var AUTH_URI = "https://accounts.google.com/o/oauth2/v2/auth";

/**
 * OAuth provider token URL
 * @private 
 * @type {String}
 *
 * @properties={typeid:35,uuid:"DEE95056-4C7B-435B-81BC-A8557390D0C3"}
 */
var TOKEN_URI = "https://www.googleapis.com/oauth2/v4/token";

/**
 * OAuth scope: Name of permision for calendar access
 * @private 
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F67E7390-159B-491F-8427-8BC49939251A"}
 */
var CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar";

/**
 * Some end-points for the service
 * @private 
 * @enum 
 * @properties={typeid:35,uuid:"D20E29C8-C630-4D20-99B1-FA0BE0F3BD2E",variableType:-4}
 */
var ENDPOINTS = {
	EVENTS:"https://www.googleapis.com/calendar/v3/calendars/primary/events"
};

/**
 * The AuthorizedClient session
 * @private 
 * @type {scopes.svyOAuth.AuthorizedClient}
 * @properties={typeid:35,uuid:"98B6406D-660A-4A48-827B-7420BC3D8948",variableType:-4}
 */
var client = null;

/**
 * Gets the AuthorizedClient session, creating it if it is not yet created
 * @private 
 * @return {scopes.svyOAuth.AuthorizedClient}
 * @properties={typeid:24,uuid:"536D6FD1-CD7C-44EE-B884-500205A4F759"}
 */
function getClient(){
	if(!client){
		client = scopes.svyOAuth.createAuthorizationRequest()
			.setAuthServerURL(AUTH_URI)
			.setTokenServerURL(TOKEN_URI)
			.setClientSecret(clientSecret)
			.setClientID(clientID)
			.addScope(CALENDAR_SCOPE)
			.execute('me'); // arbitrary user name
	}
	return client;
}

/**
 * Loads calendar events from service into table
 * @properties={typeid:24,uuid:"F1067B9B-EE53-4591-B6B2-A3D47374FF1D"}
 */
function loadCalendarEvents(){
	
	// drop (in-mem) data
	foundset.loadAllRecords();
	foundset.deleteAllRecords();
	
	// execute an HTTP GET request for calendar events
	var res = getClient()
		.get(ENDPOINTS.EVENTS)
		.execute();
	
	// parse the response
	var str = res.getContent();
	/**
	 * @type {{
	 * 		items:Array<{
	 * 			id:String,
	 * 			summary:String,
	 * 			description:String,
	 * 			start:{dateTime:String},
	 * 			end:{dateTime:String}
	 * 		}>}}
	 */
	var events = JSON.parse(str);
	
	
	// insert the events into a table
	for(var i in events.items){
		var item = events.items[i]
		foundset.newRecord();
		foundset.event_id = item.id;
		foundset.event_summary = item.summary;
		foundset.event_description = item.description ? item.description.substr(0,16)+'...' : null;
		foundset.event_start = parseDateTime(item.start.dateTime);
		foundset.event_end = parseDateTime(item.end.dateTime);
	}
	databaseManager.saveData();
	application.output('Loaded '+foundset.getSize()+' events');
	
}

/**
 * Utility to convert Google's date string
 * FIXME Doesn't handle time zone
 * 
 * @private 
 * @param {String} str
 * @return {Date}
 * @properties={typeid:24,uuid:"8A6C93F4-4CE9-4916-A82D-BEC047961946"}
 */
function parseDateTime(str){
	if(!str) return null;
	var info = str.split('T')
	var date = info[0];
	var time = info[1].substr(0,8);
	return utils.parseDate(date+time,'YYYY-MM-DDHH:mm:ss')
}