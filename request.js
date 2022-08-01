let forecast = document.getElementById("forecast-el")
//const lat = document.getElementById("lat-el")
//onst long = document.getElementById("long-el")
const searchBtn = document.getElementById("search-btn")
//const locationUrl = document.getElementById("location-el")
//console.log(locationUrl)
//console.log(forecast)
clicked = false
//locationUrl = 'https://www.google.com/maps/@39.9472188,-75.1630782,16z'
//console.log(locationUrl.value)

searchBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        if(clicked === true){
            deleteRender()
        }
        let locationUrl = tabs[0].url
        let lat = locationUrl.substring(29,38)
        let long = locationUrl.substring(40, 50)
        console.log(lat)
        console.log(long)
        let link = `https://api.weather.gov/points/${lat},${long}`
        console.log(link)
        fetch(link)
            .then(res => res.json())
            .then(data => locationForecast(data))
        clicked = true
    })
})


function renderForecast(element) {
    for(let i = 0; i < 14; i++){
        let li = document.createElement("li")
        let forecastItem = `${element.periods[i].name}: ${element.periods[i].detailedForecast}`
        console.log(forecastItem)
        li.innerText = forecastItem
        forecast.appendChild(li)
    }
}

function locationForecast(location) {
    let url = location.properties.forecast
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => renderForecast(data.properties))
}

function deleteRender() {
    forecast.textContent = ""
}



//fetch('https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyBhIoMD_rT5gwci7zRQJPdkP9gvteBHEhE')
    //.then(res => console.log(res))
    //.then(data => console.log(data))
