dataSource:"mem:calendar_events",
encapsulation:60,
items:[
{
labelFor:"clientSecret",
location:"30,120",
name:"clientSecret_label",
size:"550,20",
text:"Google API Client Secret",
transparent:true,
typeid:7,
uuid:"11267FA5-3001-4D2C-8D08-7A9F56C89130"
},
{
labelFor:"clientID",
location:"30,60",
name:"clientID_label",
size:"550,20",
text:"Google API Client ID",
transparent:true,
typeid:7,
uuid:"50D2030D-1862-46D5-A6C2-A149C2052B0A"
},
{
location:"390,180",
onActionMethodID:"F1067B9B-EE53-4591-B6B2-A3D47374FF1D",
onDoubleClickMethodID:"-1",
onRightClickMethodID:"-1",
size:"190,30",
styleClass:"btn btn-primary",
text:"Load Calendar Events",
typeid:7,
uuid:"6FDA5BB8-EFD5-40DD-ADED-7E4E7FD950BD"
},
{
anchors:13,
json:{
anchors:13,
columns:[
{
dataprovider:"event_summary",
headerText:"Summary",
svyUUID:"3B044133-98B6-4361-8D43-4171B720EC25"
},
{
dataprovider:"event_start",
format:"yyyy/MM/dd hh:mm",
headerText:"Start",
svyUUID:"811BA53A-D857-40F0-AB7D-B5E4E1DCF0EE"
},
{
dataprovider:"event_end",
format:"yyyy/MM/dd hh:mm",
headerText:"End",
svyUUID:"E80888B9-3A85-4D50-BD13-6B691E7D9E14"
}
],
foundset:{
foundsetSelector:""
},
location:{
x:30,
y:270
},
size:{
height:200,
width:550
},
styleClass:"table-striped",
visible:true
},
location:"30,270",
name:"calendarTable",
size:"550,200",
typeName:"servoyextra-table",
typeid:47,
uuid:"9EF78157-C77F-4A77-91D7-FB34E54BDBAE"
},
{
dataProviderID:"clientID",
location:"30,80",
name:"clientID",
placeholderText:"The ID of your application",
size:"550,30",
typeid:4,
uuid:"BEA154B6-75CB-40A7-A6B3-43567A8E341E"
},
{
displaysTags:true,
location:"30,230",
name:"calendarLabel",
size:"550,30",
styleClass:"label_header_2",
text:"Events loaded from Google Calendar (%%count_id%%)",
typeid:7,
uuid:"C2048C5B-8CDC-42CD-B77B-908FDDF16035"
},
{
dataProviderID:"clientSecret",
displayType:6,
location:"30,140",
name:"clientSecret",
placeholderText:"Your application's secret access code...shhh",
size:"550,30",
typeid:4,
uuid:"C5E08924-6ED4-426F-A54B-5A9CBC1ED983"
},
{
height:480,
partType:5,
typeid:19,
uuid:"D5EE63FA-A7D9-4597-AD55-46C275C95FF7"
},
{
location:"30,20",
size:"550,30",
styleClass:"label_header_2",
text:"Identify your application",
typeid:7,
uuid:"F4F3778F-EBDD-4108-B05B-EBA923430440"
}
],
name:"exampleGoogleCalendar",
showInMenu:true,
typeid:3,
uuid:"45843363-6F35-46BA-A52C-1B502AFC1815"