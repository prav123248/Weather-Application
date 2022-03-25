import { readData } from './readData';
import { trailSelect, position, setPosition } from './screen2Components/Dynamiccontainer';
import $ from 'jquery';

var daysBetween;
var key;
var retrievedData;
var scheduleDate;


/*
 * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
 *
 * This method is responsible for saving hike schedules. It obtains the date and if available, a forecast for that day and saves it into the record for the selected trail.
 * 
 * The name of the trail and date are retrieved. The days between today and the scheduled date is calculated. If less then 8, API data is available so a call is made to 
 * obtain a forecast for that day. This involves uses coordinates saved in the trails record. When the data is parsed, the trail record is updated in localStorage.
 * For dates further than a week away, the schedule is saved but the penultimate value is set to null since no forecast currently exists.
 * 
 * @param  ()  
 * @return ()
 */

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
} 

/*
 * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
 *
 * The method below saves a trail. It retrieves the name and position of a trail. After performing some validation, it is set into local Storage.
 * 
 * The method obtains the name from the input. It determines position from a global variable. Some validation checks are made including whether a name or position were
 * supplied and also whether a trail already exists with the provided name. If these tests are passed, a new key is created by incrementing the length of localStorage.
 * The values are then set into localStorage. The last two fields are null since they refer to the scheduling part and become relevant when a trail has been scheduled.
 * 
 * @param  ()  
 * @return ()
 */

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

/*
 * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
 *
 * The method below calls the API for the weather in the requested location.
 * 
 * The longitude and latitude are determined from the position passed into the function. Ajax in JQuery is used to make the API request. On success, another method is called
 * and on failure, a message is displayed.
 * 
 * 
 * @param  ()  
 * @return ()
 */


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

/*
 * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
 *
 * The data parsed is stored in a variable and the condition is extracted from it. This is then set into the record that was found before and stored in the global variable. 
 * 
 * The API data is saved into a variable called forecast from which the required data is extracted using the global variable daysBetween that was assigned a value
 * from the saveSchedule() method call earlier. The correct record and its details were also determined in that method and stored in global variables to access here
 * so that the schedule information can be set. The condition determined is set into the second last value and the scheduleDate, obtained previously is saved in the end.
 * 
 * @param  ()  
 * @return ()
 */

function parseForecast(parsed) {
    var forecast = parsed
    var condition = forecast['daily'][daysBetween]['weather'][0]['main']
    localStorage.setItem(key, JSON.stringify([retrievedData[0], retrievedData[1], retrievedData[2], retrievedData[3], condition, scheduleDate]));
    daysBetween = ""
    key = ""
    retrievedData = ""
    scheduleDate = ""
}