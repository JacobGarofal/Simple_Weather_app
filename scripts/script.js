// define some variables such that on click of the check forecasts button weather data is fetched from an api

let check_forecasts = document.querySelector(".btn-primary");

const text_input = document.querySelector("#cityinput");


// redirect the user to the main.html page and store the text input value to be used in the api call 
if (check_forecasts) {
    check_forecasts.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission
        let city = text_input.value;
        window.location.href = `./main.html?city=${city}`;
    });


}
