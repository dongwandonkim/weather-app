const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const weatherImg = document.querySelector('#weather-img');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const location = search.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  weatherImg.src = '';

  fetch('/weather?address=' + location).then((res) => {
    res.json().then((data) => {
      //console.log(data);
      if (data.err) {
        messageOne.textContent = 'no data available at the moment';
        messageTwo.textContent = '';
        weatherImg.src = '';

        return;
      }

      messageOne.textContent = data.forecast;
      messageTwo.textContent = data.location;
      weatherImg.src = data.weatherIcon;
      //console.log(data.forecast, data.location);
    });
  });
});
