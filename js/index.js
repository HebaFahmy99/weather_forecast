
let myData;  
let timeDefaultStop;
async function getWeatherData(q) { 
    
    let myResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=572e08fb1d7547f58d8151525211205&q=${q}`)
    myData = await myResponse.json();
    document.getElementById("county-location").innerHTML = myData.location.name;
    document.getElementById("county-location_nextDay").innerHTML = myData.location.name;
    document.getElementById("county-location_dayAfterNext").innerHTML = myData.location.name;
    document.getElementById("degree").innerHTML = myData.current.temp_c + `&degC`;
    document.getElementById("weather-status").innerHTML = myData.current.condition.text;
    document.querySelector(".inner-data img").setAttribute("src", `${myData.current.condition.icon}`)
}
getWeatherData("cairo");
async function getWeatherDate(q) { 
    let myResponse = await fetch(`https://api.weatherapi.com/v1/timezone.json?key=572e08fb1d7547f58d8151525211205&q=${q}`)
    let myTime = await myResponse.json();  
    let rightNow = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayName = days[rightNow.getDay()];
    const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    let monthName = months[rightNow.getMonth()]; 
    document.getElementById("fullDate").innerHTML = `${dayName}, ${monthName} ${rightNow.getDate()}, ${rightNow.getFullYear()}`;
    
    timeNow = rightNow.toLocaleTimeString('en-GB', { hour12: true, timeZone: `${myTime.location.tz_id}` });  
    var hours =  timeNow.split(":")[0]   
    if(hours == "0"){ 
    hours = parseInt(hours) 
    hours+=12;
    } 

    var minutes = timeNow.split(":")[1]  
    var secondsStatus = timeNow.split(":")[2]  
    var seconds = secondsStatus.split(" ")[0];   
    seconds = parseInt(seconds);    
    var timeZ = secondsStatus.split(" ")[1];

    document.getElementById("timeZone").innerHTML =`${hours}:${minutes}:${seconds} ${timeZ}`;


}  

async function getNextDays(q) {
    let myResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${q}&days=3`);
    let NextDays = await myResponse.json();
    let forecastArr = NextDays.forecast.forecastday
    document.getElementById("degreeOne").innerHTML = `${forecastArr[1].day.maxtemp_c} &deg `
    document.getElementById("statusOne").innerHTML = forecastArr[1].day.condition.text
    document.getElementById("imgStatusOne").setAttribute("src", `${forecastArr[1].day.condition.icon}`);
    document.getElementById("dateOne").innerHTML = forecastArr[1].date

    document.getElementById("degreeTwo").innerHTML = `${forecastArr[2].day.maxtemp_c} &deg `
    document.getElementById("statusTwo").innerHTML = forecastArr[2].day.condition.text
    document.getElementById("imgStatusTwo").setAttribute("src", `${forecastArr[2].day.condition.icon}`);
    document.getElementById("dateTwo").innerHTML = forecastArr[2].date
}
getNextDays("cairo");


document.getElementById("searchInput").addEventListener("keyup", function () { 
    search() 
})

let CairoTimeStop = setInterval(function(){getWeatherDate("cairo");},1000)
function search() {
    let q = searchInput.value  
    clearInterval(CairoTimeStop);   
    clearInterval(timeDefaultStop);
    timeDefaultStop = setInterval(function(){getWeatherDate(q);},1000)
    getWeatherData(q);  
    getNextDays(q);     
} 