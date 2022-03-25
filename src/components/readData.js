   
/*
 * @author <Pravin Prabhakaran> <ec20352@qmul.ac.uk> | <200272454>
 *
 * This method gets all the items stored in localStorage and adds them to an array which is then returned.
 * 
 * An array is declared and records of items stored in localStorage are pushed into it. A check is made so only records that do not start with null
 * are stored in the array since those refer to removed records.
 * 
 * 
 * @param  ()  
 * @return ([] readDataArray)
 */

export const readData = () => {
    var readDataArray = [];
    var retrievedData = "";

    for (var i = 1; i < localStorage.length + 1; i++) {
        retrievedData = JSON.parse(localStorage.getItem(i));
         if (retrievedData[0] !== null) {
            readDataArray.push(retrievedData);
        }
    }

    return readDataArray


}
