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
