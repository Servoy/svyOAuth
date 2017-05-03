dataSource:"mem:linkedin_profile",
encapsulation:60,
items:[
{
location:"30,20",
size:"550,30",
styleClass:"label_header_2",
text:"Identify your application",
typeid:7,
uuid:"04998C65-35D3-4217-ADD9-57A6745C9B04"
},
{
location:"390,180",
onActionMethodID:"CF28CC7D-B133-4971-8D7E-A7ECDFB63A0A",
onDoubleClickMethodID:"-1",
onRightClickMethodID:"-1",
size:"190,30",
styleClass:"btn btn-primary",
text:"Sign in with LinkedIn",
typeid:7,
uuid:"07DC3575-5491-413D-8AE8-C1091B6CC92D"
},
{
dataProviderID:"clientID",
location:"30,80",
name:"clientID",
placeholderText:"The ID of your application",
size:"550,30",
typeid:4,
uuid:"0BBDB035-EABD-4E95-A83B-14DB732306A4"
},
{
labelFor:"clientSecret",
location:"30,120",
name:"clientSecret_label",
size:"550,20",
text:"LinkedIn API Client Secret",
transparent:true,
typeid:7,
uuid:"2E6B4C53-7DA9-4A17-97E3-9D0EF49440F3"
},
{
displaysTags:true,
formIndex:1,
horizontalAlignment:0,
labelFor:"picture",
location:"490,300",
name:"linkedInPicture",
size:"80,80",
styleClass:"circle",
text:"<img src=\"%%picture_url%%\" />",
transparent:true,
typeid:7,
uuid:"3EB315BF-26FB-47D9-97F2-81B687C4F572",
visible:false
},
{
dataProviderID:"clientSecret",
displayType:6,
location:"30,140",
name:"clientSecret",
placeholderText:"Your application's secret access code...shhh",
size:"550,30",
typeid:4,
uuid:"5A4B22FC-8977-49B7-AEA2-81B22CB14D8B"
},
{
location:"30,230",
name:"linkedInLabel",
size:"550,30",
styleClass:"label_header_2",
text:"Your LinkedIn Profile",
typeid:7,
uuid:"7E81EA32-4F63-436A-9F13-139E7CC49FEC",
visible:false
},
{
height:480,
partType:5,
typeid:19,
uuid:"DAC8914D-9172-429D-A7EB-8CD748E5E963"
},
{
labelFor:"clientID",
location:"30,60",
name:"clientID_label",
size:"550,20",
text:"LinkedIn API Client ID",
transparent:true,
typeid:7,
uuid:"F47D32A9-B994-4E41-9360-CB2426999611"
},
{
displaysTags:true,
location:"30,270",
name:"linkedInProfile",
size:"550,140",
styleClass:"label_info_panel",
text:"<br/>\r\
<b>%%first_name%% %%last_name%%<\/b><br/>\r\
%%headline%%<br/><br/>\r\
%%email_address%%<br/>\r\
%%num_connections%% connections",
transparent:true,
typeid:7,
uuid:"F9C400A7-A79A-4B50-84BD-B0D11F38F53C",
verticalAlignment:1,
visible:false
}
],
name:"exampleLinkedIn",
showInMenu:true,
typeid:3,
uuid:"9DE39BEF-8FA6-4F93-B8F8-CF04EDA2559A"