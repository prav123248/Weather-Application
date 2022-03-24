import { readData } from './readData';
import { trailSelect, position } from './Dynamiccontainer';
import { forecast } from '../../index';

export const saveSchedule = () => {

    const trailName = trailSelect;
    const scheduleDate = document.getElementById('dateSelector').value;


    for (var i = 1; i < localStorage.length + 1; i++) {
        var retrievedData = JSON.parse(localStorage.getItem(i));
        if (retrievedData[0] == trailName) {
            var lat = retrievedData[1]
            var lng = retrievedData[2]
            console.log(forecast)
            retrievedData[4] = "snow"
            retrievedData[5] = scheduleDate
        } 
        
    }  

    //const trailName = document.getElementById('trailSelector').value;
    //localStorage.setItem(key, JSON.stringify([trailName, 0, 0, "desc", "snow", scheduleDate]));

    readData();


    //localStorage.clear();

} 



export const saveTrail = () => {
    const name = document.getElementById('nameInput').value;
    const description = document.getElementById('descriptionInput').value;
    var key = localStorage.length + 1;
    localStorage.setItem(key, JSON.stringify([name, position['lat'], position['lng'], description, null, null]));
    readData();
}