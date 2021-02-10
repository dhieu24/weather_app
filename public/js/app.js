
console.log('Client side JS file');

const firstMessage = document.querySelector('#first-p')
const secondMessage = document.querySelector('#second-p')


const form = document.querySelector('form');;
const inputAddress = document.querySelector('input');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = inputAddress.value;
    fetch('http://localhost:3000/weather?address=' + address + '\'').then((response) => {
    response.json().then((data) => {
        if(data.error) {
            firstMessage.textContent = data.error;
        }else {
            firstMessage.textContent = data.location;
            secondMessage.textContent = `Today temperature is: ${data.forecast.temperature}
                                        Humidity: ${data.forecast.humidity}
                                        Windspeed: ${data.forecast.windspeed}`
        }
    })
})

})
