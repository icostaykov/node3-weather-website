const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('messageOne')
const messageTwo = document.getElementById('messageTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = data.forecast
                messageTwo.textContent = data.location
            }
        })
    })
})