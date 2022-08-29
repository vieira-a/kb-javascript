/**
 * Caso de uso
 * Exemplo de utilização de assincronismo e callback function 
 * Com o NodeJS
 */

const https = require('http')
const API = 'https://jsonplaceholder.typicode.com/users?_limit=2'

https.get(API, res => {
	console.log(res.statusCode)
})

console.log('conectando API')

/**
 * A função **get()** recebe, além do argumento **API**, uma função anônima `res => {}` 
 * que exibirá o statusCode
 * Esta função `res => {}` é uma callback e será executada após o `console.log('conectando API')` 
 * que está fora da função `get()`
 */