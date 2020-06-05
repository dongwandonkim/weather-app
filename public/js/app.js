const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const location = search.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  fetch('http://localhost:3000/weather?address=' + location).then((res) => {
    res.json().then((data) => {
      console.log(data);
      if (data.err) {
        messageOne.textContent = 'no data available at the moment';
        messageTwo.textContent = '';

        return;
      }
      messageOne.textContent = data.forecast;
      messageTwo.textContent = data.location;
      //console.log(data.forecast, data.location);
    });
  });
});
