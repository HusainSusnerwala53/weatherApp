
console.log("File is loaded")


fetch('http://puzzle.mead.io/puzzle').then((response)=>{

response.json().then((data)=>{

    console.log(data)

})

})



const weatherForm = document.querySelector('#mainForm')
const location1 = document.querySelector('#location')


weatherForm.addEventListener('submit',(e)=>{

    fetch('/weather?address='+location1.value).then((response)=>{

        response.json().then((data)=>{
        
            const test1 =   document.querySelector("#test1")
            if(data.error){
       // return console.log('error in console')
        test1.textContent=data.error
            }
          
           // console.log(data.location)
           // console.log(data.temperature)
            // data.temperature.json().then((res)=>{
            //     console.log(res)
            // })

          
          test1.textContent=data.location

          const test2 =   document.querySelector("#test2")
          test2.textContent=data
        
        })
        
        })



    e.preventDefault()
  //  console.log('dfw');
})