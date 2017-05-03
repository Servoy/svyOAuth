/**
 * @properties={type:-4,typeid:36,uuid:"4CC2CB19-DF45-4621-9717-E2C2CCB026E1"}
 */
function picture()
{
	if(picture_url){
		return plugins.http.getPageData(picture_url)
	}
	return null;
}
