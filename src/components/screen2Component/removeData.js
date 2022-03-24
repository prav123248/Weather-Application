import { readData } from './readData';
import { trailSelect } from './Dynamiccontainer';
import {hikeSelected} from '../screen3Component/Screen3'

export const removeTrail = () => {
    const trailName = trailSelect;

    for (var i = 1; i < localStorage.length + 1; i++) {
        var retrievedData = JSON.parse(localStorage.getItem(i));
        

        if (retrievedData[0] == trailName) {
            localStorage.setItem(i, JSON.stringify([null, null, null, null, null, null]));
            break
        } 

    }
}

export const removeHike = () => {
    const trailName = hikeSelected;

    for (var i = 1; i < localStorage.length + 1; i++) {
        var retrievedData = JSON.parse(localStorage.getItem(i));
        
        if (retrievedData[0] == trailName) {
            localStorage.setItem(i, JSON.stringify([retrievedData[0], retrievedData[1], retrievedData[2], retrievedData[3], null, null]));
            break
        } 

    }
}