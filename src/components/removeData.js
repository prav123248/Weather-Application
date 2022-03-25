import { trailSelect } from './screen2Components/Dynamiccontainer';
import {hikeSelected} from './screen3Component/Screen3'


/*
 * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
 *
 * The method below removes a trail. It gets the name specified and the record for it is found and its values set to null.
 * 
 * The trail to be removed is obtained by using the global variable that always stores the name of a trail to be removed. This method is only accessible when a trail has been
 * selected. With the trail name, records in localStorage are iterated through until the right record for the selected trail is found. The values of this record are set to null
 * which the system regards as removed trails.
 * 
 * @param  ()  
 * @return ()
 */

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

/*
 * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
 *
 * A hike is removed by the method below. It must not remove the trail, only the hike that was scheduled for that trail.
 * 
 * The hike selected for removal is obtained through the global variable hikeSelected. This method is only accessible when a hike has been selected and the variable itself
 * refers to the trail name for that hike. This is used to find the correct record in localStorage. Once it is found, the items of the record are reset. The first four values
 * remain the same but the last two are set to null. This is because they refer to the scheduled part of a trail, being forecast for scheduled date and the date itself.
 * 
 * @param  ()  
 * @return ()
 */

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