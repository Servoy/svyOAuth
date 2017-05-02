/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"16ED6D58-8EDD-418F-851B-C39C581F4AF7"}
 */
var clientID = '372224392272-bu8ursi3ics739cq328pdp1mqa73eh7h.apps.googleusercontent.com';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2263566B-9CCB-4FA3-9FF0-212F6AEF6A4B"}
 */
var clientSecret = 'Go6wQwj8rQdFnvIiEo7zgjTh';

/**
 * @properties={typeid:24,uuid:"F1067B9B-EE53-4591-B6B2-A3D47374FF1D"}
 */
function test(){
	var client = scopes.svyOAuth.createAuthorizationRequest()
		.setAuthServerURL(scopes.svyGoogleCalendar.AUTH_URI)
		.setTokenServerURL(scopes.svyGoogleCalendar.TOKEN_URI)
		.setClientSecret(clientSecret)
		.setClientID(clientID)
		.addScope(scopes.svyGoogleCalendar.CALENDAR_SCOPE)
		.execute('me'); // arbitrary user name
	
	var res = client.get(scopes.svyGoogleCalendar.ENDPOINTS.EVENTS).execute();
	var str = res.getContent();

	
	// dump data
	foundset.loadAllRecords();
	foundset.deleteAllRecords();
	
	/** @type {{items:Array<{id:String,summary:String,description:String,start:{dateTime:String},end:{dateTime:String}}>}} */
	var events = JSON.parse(str);
	var items = events.items;
	for(var i in items){
		var item = items[i]
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