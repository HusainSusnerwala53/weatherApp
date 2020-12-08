const request = require('postman-request')


const geocodeFun = (address, callback)=>{

    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiaHVzYWluNTMiLCJhIjoiY2todDlieHdjMWw2cjJ0cDVhamYxb2Z4ZCJ9.QtgyeF72oU2Jzwdap849gw'
   
    request({url, json:true},(error,{body})=>{
   
       if(error){
           callback("Error while processing request",undefined)
       }
       else if (body.features.length==0)
       {
           callback("no lat or lang available",0,0,0)
       }
       else 
       {
           
           callback(undefined ,{
           longitude:body.features[0].center[0],
           latitude:body.features[0].center[1],
           location:body.features[0].place_name
           })
       }
   
    })
   
   }
   
   module.exports = geocodeFun