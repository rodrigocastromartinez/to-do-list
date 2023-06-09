export default function retrieveRandomMotivationalQuote(callback) {
    let xhr = new XMLHttpRequest //esta es una función constructora utilizada para hacer peticiones a servidores. la misma crea un objeto conector que permite llamar a una api

    // 3-previamente debemos decirle cómo se debe tratar la respuesta
    // el onload (parecido al onclick p.e.) significa que dispara el evento cuando hay una respuesta
    xhr.onload = () => {
        const { content } = JSON.parse(xhr.response) //payLoad: carga de datos o transporte de datos

        callback(null, content)
    }

    // 4-esto se ejecuta en el caso en que haya un error
    xhr.onerror = () => {
        callback(new Error('connection error'))
    }

    xhr.open('GET', 'https://api.quotable.io/random') // 1-aquí se abre la conexión con esta api
    xhr.send() // 2-aquí se envía la petición
}

// llamado a la función:
// retrieveRandomMotivationalQuote((error, quote) => {
//     if (error) {
//         alert(error.message)

//         return
//     }

//     confirm(quote)
// })