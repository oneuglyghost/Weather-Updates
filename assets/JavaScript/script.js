
// taking the text in the input and saving to local storage
document.getElementById("searchButton").addEventListener("click", function() {
    //get the input
    var cityInputValue = document.getElementById("cityInput").value;

    //check if the input value is not empty
    if (cityInputValue.trim() !== "") {
        // save the input to local storage with a specific key
        localStorage.setItem(cityInputValue ,cityInputValue)

        // clear the input field
        document.getElementById('cityInput').value = '';
    }
})