const request = require('postman-request')

const forecast = (latitude,longitude,callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=edd4ad3f4ac5236095fe4f2679467dbf&query='+latitude+','+longitude+'&units=f'

    request({url,json:true},(error,{body})=>{

        if(error){
            
            callback('Error while processing request','undefined')
        }
        else if(body.error){
          
            callback('Error while fetching result','undefined')
        }
        else{
           
            callback(undefined, {
                temperature : body.current.temperature,
                Weather: body.current.weather_descriptions
                //         console.log(chalk.red("It is currently "+currently.temperature+" farenheit out. There is "+currently.cloudcover +
                //         " % chance of rain"))
            })
            
            
            
        }
        
    })

}

module.exports=forecast
