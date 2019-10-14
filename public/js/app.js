console.log('client side javascript loaded')

// http://puzzle.mead.io/puzzle

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then(data => {
//         console.log(data)
//     })    
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = search.value;

    message1.textContent = 'Loading...';
    message2.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then(response => {
    response.json().then(data => {
        if (data.error) {
            message1.textContent = data.error
        } else {
            console.log(data.address)
            console.log(data.location)
            console.log(data.forecast)

            message1.textContent = data.location;
            message2.textContent = data.forecast;
        
        }
    })
})
})