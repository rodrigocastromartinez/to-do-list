export default function retrieveWeather(city = 'Barcelona', callback){
    let xhr = new XMLHttpRequest
    
    xhr.onload = event => {
        const allData = JSON.parse(xhr.response)

        const temperature = (allData.main.temp - 273).toFixed(1)

        const id = allData.weather[0].id

        callback(null, {temperature, id})
    }

    xhr.onerror = () => {
        callback(new Error('connection error'))
    }
    
    xhr.open('GET', `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=7afed3f6606a5dc540c51522d0860c88`)
    xhr.send()
}