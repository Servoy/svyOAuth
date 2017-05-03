/**
 * Hold user input for API client ID
 * @private 
 * @type {String}
 *
 * @properties={typeid:35,uuid:"BAB6531E-4AD0-42E6-A0F5-9F00BE9FB377"}
 */
var clientID = '';

/**
 * Hold user input for API client secret
 * @private 
 * @type {String}
 *
 * @properties={typeid:35,uuid:"35332694-F164-429E-A1F2-4F141115F2B8"}
 */
var clientSecret = '';

/**
 * OAuth provider authorization URL
 * @private 
 * @type {String}
 *
 * @properties={typeid:35,uuid:"EBC4D581-791A-48B8-A746-E6259720A07F"}
 */
var AUTH_URI = "https://www.linkedin.com/uas/oauth2/authorization?state=abcdefg";

/**
 * OAuth provider token URL
 * @private 
 * @type {String}
 *
 * @properties={typeid:35,uuid:"9EAD332D-B1A7-4DCC-AD1F-A61AE31190D0"}
 */
var TOKEN_URI = "https://www.linkedin.com/uas/oauth2/accessToken";

/**
 * Service endpoint for accessing "people"
 * @private 
 * @properties={typeid:35,uuid:"FD9AA512-F219-45F4-A15B-947904EB1368",variableType:-4}
 */
var ENDPOINTS = {
	PEOPLE:"https://api.linkedin.com/v1/people/~?format=json",
	MORE_FIELDS:"https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,headline,summary,specialties,num-connections,picture-url)?format=json"
};

/**
 * The OAuth scopes that will be authorized
 * @private  
 * @enum 
 * @properties={typeid:35,uuid:"79E4C8F0-9500-42C3-BC19-AD6BBDBA9DCE",variableType:-4}
 */
var SCOPES = {
	BASIC_PROFILE:'r_basicprofile',
	EMAIL_ADDRESS:'r_emailaddress',
	SHARE:'w_share'
}

/**
 * The AuthorizedClient session
 * @private 
 * @type {scopes.svyOAuth.AuthorizedClient}
 * @properties={typeid:35,uuid:"DC13BB76-AF61-4454-A14F-9CF0B0C71686",variableType:-4}
 */
var client = null;

/**
 * Gets the AuthorizedClient session, creating it if it is not yet created
 * @private 
 * @return {scopes.svyOAuth.AuthorizedClient}
 * @properties={typeid:24,uuid:"6D123D7A-B166-4931-A195-7E1B75D9CDD8"}
 */
function getClient(){
	if(!client){
		client = scopes.svyOAuth.createAuthorizationRequest()
			.setAuthServerURL(AUTH_URI)
			.setTokenServerURL(TOKEN_URI)
			.setClientSecret(clientSecret)
			.setClientID(clientID)
			.addScope(SCOPES.BASIC_PROFILE)
			.addScope(SCOPES.EMAIL_ADDRESS)
			.addScope(SCOPES.SHARE)
			.execute('me'); // arbitrary user name
	}
	return client;
}

/**
 * @private 
 * @properties={typeid:24,uuid:"CF28CC7D-B133-4971-8D7E-A7ECDFB63A0A"}
 */
function connectLinkedIn(){
	
	// drop (in-mem) data
	foundset.loadAllRecords();
	foundset.deleteAllRecords();
	
	// execute an HTTP GET request for profile data
	var res = getClient()
		.get(ENDPOINTS.MORE_FIELDS)
		.execute();
	
	// parse the response
	var str = res.getContent();
	/**
	 * @type {{
	 *	id:String,
	 * 	firstName:String,
	 * 	lastName:String,	
	 * 	emailAddress:String,
	 *  headline:String,
	 *  numConnections:Number,
	 *  pictureUrl:String
	 * 	}}
	 */
	var profile = JSON.parse(str);
	
	// Copy profile into table
	foundset.newRecord();
	id = profile.id,
	first_name = profile.firstName;
	last_name = profile.lastName;
	email_address = profile.emailAddress;
	headline = profile.headline;
	num_connections = profile.numConnections;
	picture_url = profile.pictureUrl;
	
	databaseManager.saveData();
	
	// show profile components
	elements.linkedInLabel.visible = true;
	elements.linkedInPicture.visible = true;
	elements.linkedInProfile.visible = true;
}