const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocodeUtils')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

const  app =express();

const staticPagePath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath =path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewsPath)
app.use(express.static(staticPagePath))

hbs.registerPartials(partialsPath)

// app.get('',(req,res)=>{
//    // res.send(staticPagePath)
// })
// app.get('/about',(req,res)=>{
//     res.send([{
//         name:"Husain",
//         Age:30
// },
// {
//     name:"Susner",
//     Age:40 
// }
// ])
// })
// app.get('/help',(req,res)=>{
//     res.send('<h1>Help Page<h1>')
// })

app.get('',(req,res)=>{
    res.render('index.hbs',{
        name:"Weather App",
        title:"Weather Page",
        endTitle:"End"

    })
})

app.get('/about',(req,res)=>{
res.render('about',{
    title:"About Me",
    name:"Husain ",
    endTitle:"End"
})
})

app.get('/help',(req,res)=>{
    res.render('help',{
        help:"Will help you in next 2 hrs",
        title:"Help Page",
        endTitle:"End"
    })
    })

app.get('/weather',(req,res)=>{

    if(!req.query.address){
      return  res.send({
            "Error" : "You must provide address"
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location})=>{
        console.log(error)
        if(error){
           return  res.send('Address not proper')
        }

        forecast(latitude,longitude,(error,forecastData)=>{

            if(error){
             return   res.send(error)
            }

            res.send({
                temperature:forecastData,
              //  Weather: forecastData.weather[0],
                location:location
                
            })
    


        })

        

    })



})







app.get('/help/*',(req,res)=>{
    res.send('Help page not found')
})


app.get('/products',(req,res)=>{

    if(!(req.query.search)){
     return res.send({
         " Error":" No query String Present "
      })
        
    }
    console.log(" query String Present " + req.query)

    res.send({
        products:[]
    })

})


app.get('*',(req,res)=>{

    res.render('404',{
        title:'404 Page'
    })
})

app.listen(port,()=>{
    console.log('server is up on port '+ port)
})