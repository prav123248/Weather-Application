import { readData } from './readData';
import { trailSelect, position, setPosition } from './Dynamiccontainer';
import $ from 'jquery';

var forecast;
var daysBetween;
var key;
var retrievedData;
var scheduleDate;

export const saveSchedule = () => {

    const trailName = trailSelect;
    scheduleDate = document.getElementById('dateSelector').value;

    if (scheduleDate === "") {
        return
    }

    const today = new Date();
    const scheduledDay = new Date(scheduleDate)
    const day = 24 * 60 * 60 * 1000;
    daysBetween = Math.round((scheduledDay.getTime() - today.getTime())/day) 

    if (daysBetween < 0) {
        return
    }


    for (var i = 1; i < localStorage.length + 1; i++) {
        retrievedData = JSON.parse(localStorage.getItem(i));
        if (retrievedData[0] == trailName) {
            if (daysBetween <= 7) {
                var lat = retrievedData[1]
                var lng = retrievedData[2]
                key = i
                forecastCall({lat,lng}, daysBetween)
            }
            else {
                localStorage.setItem(i, JSON.stringify([retrievedData[0], retrievedData[1], retrievedData[2], retrievedData[3], null, scheduleDate]));
            }
            break
        } 
        
    }  

    //const trailName = document.getElementById('trailSelector').value;
    //localStorage.setItem(key, JSON.stringify([trailName, 0, 0, "desc", "snow", scheduleDate]));

    readData();

    //localStorage.clear();

} 



export const saveTrail = () => {
    const name = document.getElementById('nameInput').value;
    if (position === undefined || name === "") {
        return
    }
    else {
        const description = document.getElementById('descriptionInput').value;
        var trailList = readData()
        for (var i=0; i<trailList.length; i++) {
            if (trailList[i][0] === name) {
                return
            }           
        }

        var identifier = localStorage.length + 1;
        
        localStorage.setItem(identifier, JSON.stringify([name, position['lat'], position['lng'], description, null, null]));
        setPosition(null, null)

    }
    
}

function forecastCall(scheduledPosition) {

    var longitude = scheduledPosition['lng']
    var latitude =  scheduledPosition['lat']
    
    const units = "metric";
    const API_KEY = "65159ed447f6c9057beb2bf1aa2bcd61";
    
    var url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=' + units + '&exclude=minutely,hourly,alerts&appid=' + API_KEY;
   
    $.ajax({
        url: url,
        dataType: "jsonp",
        success : parseForecast,
        error : console.log("API failed")
    })
}

function parseForecast(parsed) {
    forecast = parsed
    var condition = forecast['daily'][daysBetween]['weather'][0]['main']
    localStorage.setItem(key, JSON.stringify([retrievedData[0], retrievedData[1], retrievedData[2], retrievedData[3], condition, scheduleDate]));
    forecast = ""
    daysBetween = ""
    key = ""
    retrievedData = ""
    scheduleDate = ""

}