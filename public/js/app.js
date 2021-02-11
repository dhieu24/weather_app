const firstMessage = document.querySelector('#first-p')
const secondMessage = document.querySelector('#second-p')
const searchSubmit = document.getElementById('search-submit');


const form = document.querySelector('form');
const inputAddress = document.querySelector('#search-input');
searchSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const address = inputAddress.value;
    fetch('/weather?address=' + address + '\'').then((response) => {
    response.json().then((data) => {
        if(data.error) {
            firstMessage.textContent = data.error;
        }else {
            firstMessage.textContent = 'Your location is: ' + data.location;
            secondMessage.textContent = `Today temperature is: ${data.forecast.temperature}
                                        Humidity: ${data.forecast.humidity}
                                        Windspeed: ${data.forecast.windspeed}`
        }
    })
})

})
