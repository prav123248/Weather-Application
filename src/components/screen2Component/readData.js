export const readData = () => {
    var readDataArray = [];
    var retrievedData = "";
    for (var i = 1; i < localStorage.length + 1; i++) {
        retrievedData = JSON.parse(localStorage.getItem(i));
        readDataArray.push(retrievedData);
        
    }
    console.log(readDataArray);
    return readDataArray


}

