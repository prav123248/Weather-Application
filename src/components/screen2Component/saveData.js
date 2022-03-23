import { readData } from './readData';
import { trailSelect } from './Dynamiccontainer';

export const saveData = () => {

    //const trailName = document.getElementById('trailSelector').value;
    const trailName = trailSelect;
    const scheduleDate = document.getElementById('dateSelector').value;
    var key = localStorage.length + 1;

    localStorage.setItem(key, JSON.stringify([trailName, 0, 0, "desc", "snow", scheduleDate]));

    readData();


    //localStorage.clear();

} 