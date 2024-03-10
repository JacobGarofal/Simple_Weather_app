
const urlParams = new URLSearchParams(window.location.search);
const city = urlParams.get('city');
const api_url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9309bf1cc40e9f168b574af5579b1d79&units=metric`


let card_click = document.querySelector('.card');

// define a object to assign strings to the months integers determined by the date and time instance
const Months = {
    1: 'Jan',
    2: 'Feb',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
}


// define a object to assign strings to the months integers determined by the date and time instance
const Days = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tues',
    3: 'Wed',
    4: 'Thurs',
    5: 'Fri',
    6: 'Sat'
}


var get_date_time = function () {
    // retrieve the current date and time;
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    let hour = today.getHours();
    let Days_of_the_week = today.getDay();
    let minutes = today.getMinutes();

    let am_or_pm;

    if (hour >= 12) {
        am_or_pm = 'PM';
    } else {
        am_or_pm = 'AM';
    }

    // define a string to hold the month
    let str_month = '';
    if (mm) {
        str_month = Months[mm];
    }

    // define a string to hold the Day
    let str_Day = '';
    if (dd) {
        str_Day = Days[Days_of_the_week];
    }

    let todays_date_time = `${hour}:${minutes}${am_or_pm}, ${str_Day}, ${str_month}, ${dd}, ${yyyy} `

    const para_text = document.querySelector('.text-muted');
    const markup_date_time = `<p style="padding-left: 2rem;">${todays_date_time}</p>`
    para_text.insertAdjacentHTML('beforeend', markup_date_time);



}
get_date_time();


var selected_date_time = function (forecastDate) {
    // retrieve the current date and time;
    let selectedDay = new Date(forecastDate);
    let dd = selectedDay.getDate();
    let mm = selectedDay.getMonth() + 1;
    let yyyy = selectedDay.getFullYear();
    let hour = selectedDay.getHours();
    let Days_of_the_week = selectedDay.getDay();
    let minutes = selectedDay.getMinutes();

    let am_or_pm;

    if (hour >= 12) {
        am_or_pm = 'PM';
    } else {
        am_or_pm = 'AM';
    }

    // define a string to hold the month
    let str_month = '';
    if (mm) {
        str_month = Months[mm];
    }

    // define a string to hold the Day
    let str_Day = '';
    if (dd) {
        str_Day = Days[Days_of_the_week];
    }

    // pad hour and minutes with leading zeros if needed
    let paddedHour = hour.toString().padStart(2, '0');
    let paddedMinutes = minutes.toString().padStart(2, '0');

    let selected_date_time = `${paddedHour}:${paddedMinutes}${am_or_pm}, ${str_Day}, ${str_month}, ${dd}, ${yyyy} `

    const para_text = document.querySelector('.text-muted');
    para_text.innerHTML = ''
    const markup_date_time = `<p style="padding-left: 2rem;">${selected_date_time}</p>`
    para_text.insertAdjacentHTML('beforeend', markup_date_time);



}


document.addEventListener('DOMContentLoaded', function () {
    fetch(api_url)
        .then(function (response) {
            // The API call was successful!
            console.log('success!', response);
            return response.json(); // Parse JSON from response
        })

        .then(function (data) {
            // Handle the JSON data here
            // log the retrieved api data to the console 
            console.log('Weather data:', data);

            // insert the city name into the specified div
            const city_name = data.city.name;
            const cityDiv = document.querySelector('.city_box');
            const markup_city = `<p>${city_name}</p>`;
            cityDiv.insertAdjacentHTML('beforeend', markup_city);


            // insert the weather description into the specified subheading
            const weather = data.list[0].weather[0].description;
            const subheading = document.querySelector('.weather_description');
            const markup_description = `<h4 style="padding-left: 4vmin; font-weight: bold; font-size: 3vmin;">${weather}</h4>`;
            subheading.insertAdjacentHTML('beforeend', markup_description);

            // insert the humidity into the specified paragraph tag
            const humidity = data.list[0].main.humidity
            const humidity_p = document.querySelector('.humidity');
            const markup_humidity = `<p>${humidity}%<p>`;
            humidity_p.insertAdjacentHTML('beforeend', markup_humidity);



            // insert the Windspeed into the specified paragraph tag
            const Windspeed = data.list[0].wind.speed
            const Windspeed_p = document.querySelector('.Windspeed');
            const markup_WindSpeed = `<p>${Windspeed}km/h<p>`;
            Windspeed_p.insertAdjacentHTML('beforeend', markup_WindSpeed);

            // insert the temperature into the specified subheading tag
            const temperature = data.list[0].main.temp;
            const temp_p = document.querySelector('.current_temp');
            const markup_temp = `<h2 style="font-weight: bold; padding-top: 2.5rem;">${temperature}°C</h2>`;
            temp_p.insertAdjacentHTML('beforeend', markup_temp);

            // insert the weather icon into the html page
            const iconcode = data.list[0].weather[0].icon;
            const icon_url = `http://openweathermap.org/img/wn/${iconcode}.png`;
            const img_tag = document.querySelector('.icon_image');
            const markup_image = `<img src="${icon_url}" alt="Weather icon">`
            img_tag.insertAdjacentHTML('beforeend', markup_image);

        })

        .catch(function (err) {
            // There was an error
            console.warn('Something went wrong.', err);
        });

});



// function to display the next 3 dates weather data autonomously 
document.addEventListener('DOMContentLoaded', function () {
    fetch(api_url)
        .then(response => response.json())
        .then(data => {

            // Select the container where cards will be appended 
            const cardContainer = document.querySelector('.card-container');
            const currentDate = new Date(); // Get the current date and time

            // Filter forecast data for the current hour of the 4 most current dates 
            const filteredForecast = data.list.filter(forecast => {
                const forecastDate = new Date(forecast.dt * 1000);
                // Check if the forecast date is one of the 4 most current dates
                return (
                    forecastDate.getDate() === currentDate.getDate() ||
                    forecastDate.getDate() === currentDate.getDate() + 1 ||
                    forecastDate.getDate() === currentDate.getDate() + 2 ||
                    forecastDate.getDate() === currentDate.getDate() + 3
                );
            });

            // Object to hold the forecast data for each date
            const forecastByDate = {};

            // Group forecast data by date
            filteredForecast.forEach(forecast => {
                const forecastDate = new Date(forecast.dt * 1000);
                const dateKey = forecastDate.toDateString(); // Using toDateString() to group by date only
                if (!forecastByDate[dateKey]) {
                    forecastByDate[dateKey] = forecast;
                }
            });

            // Loop through grouped forecast data
            for (const dateKey in forecastByDate) {
                const forecast = forecastByDate[dateKey];
                // Create a card div
                const card = document.createElement('div');
                card.classList.add('col-md-3');
                card.innerHTML = `
                    <div class="card"> 
                        <h5 class="card-title text-center">${formatDate(forecast.dt)} 
                        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="An image representing the current weather" class="card-img-top">
                        <p class="text-muted text-center">Humidity: ${forecast.main.humidity}%</p>
                    </div>`;
                cardContainer.appendChild(card);

                card.addEventListener('click', function () {
                    updateWeatherData(forecast);
                    selected_date_time(forecast.dt * 1000);
                })

                addclickeventtocards()
            }

        })
        .catch(error => console.error('Error fetching data:', error))

    // Function to format the date (e.g. "Feb 14")
    function formatDate(timestamp) {
        const date = new Date(timestamp * 1000);
        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = date.getDate();
        return `${month} ${day}`;
    }
})

// function to assist in updating the weather data displayed based on the card clicked


function updateWeatherData(forecast) {

    // Insert the weather description into the specified subheading
    const weather = forecast.weather[0].description;
    const subheading = document.querySelector('.weather_description');
    subheading.innerHTML = `<h4 style="padding-left: 4vmin; font-weight: bold; font-size: 3vmin;">${weather}</h4>`;

    // Insert the humidity into the specified paragraph tag
    const humidity = forecast.main.humidity;
    const humidity_p = document.querySelector('.humidity');
    humidity_p.textContent = `${humidity}%`;
    

    // Insert the Windspeed into the specified paragraph tag
    const Windspeed = forecast.wind.speed;
    const Windspeed_p = document.querySelector('.Windspeed');
    Windspeed_p.textContent = `${Windspeed}km/h`;

    // Insert the temperature into the specified subheading tag
    const temperature = forecast.main.temp;
    const temp_p = document.querySelector('.current_temp');
    temp_p.innerHTML = `<h2 style="font-weight: bold; padding-top: 2.5rem;">${temperature}°C</h2>`;

    // Insert the weather icon into the html page
    const iconcode = forecast.weather[0].icon;
    const icon_url = `http://openweathermap.org/img/wn/${iconcode}.png`;
    const img_tag = document.querySelector('.icon_image');
    img_tag.innerHTML = `<img src="${icon_url}" alt="Weather icon">`;
}




document.addEventListener('DOMContentLoaded', function () {

    // fetch your data here or define it
    fetch(api_url)
        .then(response => response.json())
        .then(data => {

            const currentDate = new Date(); // Get the current date and time

            // Filter forecast data for the current hour of the 4 most current dates 
            const filteredForecast = data.list.filter(forecast => {
                const forecastDate = new Date(forecast.dt * 1000);
                // Check if the forecast date is one of the 4 most current dates
                return (
                    forecastDate.getDate() === currentDate.getDate() ||
                    forecastDate.getDate() === currentDate.getDate() + 1 ||
                    forecastDate.getDate() === currentDate.getDate() + 2 ||
                    forecastDate.getDate() === currentDate.getDate() + 3
                );
            });

            //extract the relevant data from the api response
            const temperatures = filteredForecast.map(entry => entry.main.temp);

            const labels = filteredForecast.map(entry => {
                const forecastDate = new Date(entry.dt * 1000);
                return forecastDate.toDateString().slice(4, 10);
            })

            // create the data object for chart.js
            const chartData = {
                labels: labels,
                datasets: [{
                    label: 'Temperature',
                    data: temperatures,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color
                    fill: {
                        target: 'origin',
                        below: 'rgba(75, 192, 192, 0.2)'
                    },
                    tension: 0.4, // adjust the tension for a smoother curve
                    pointRadius: filteredForecast.map(entry => {
                        const forecastdate = new Date(entry.dt * 1000);
                        return (forecastdate.getDate() === currentDate.getDate() ? 10 : 0)
                    }),
                    pointHoverRadius: 5// Hide points on hover
                }]
            };

            // create the chart
            const ctx = document.getElementById('myChart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    scales: {
                        x: {
                            display: false // hides the x axis labels
                        },

                        y: {
                            display: false // hides the y axis labels
                        }
                    }
                }
            });
        })

        .catch(error => console.error('Error fetching data:', error))

})


function addclickeventtocards(){
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', function(){
            cards.forEach(c => {
                c.classList.remove('clicked')
            });

            this.classList.add('clicked')
        })
    })}
