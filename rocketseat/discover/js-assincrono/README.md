# Javascript Assíncrono
## JavaScript Síncrono x Assíncrono

-[x] O que é síncrono x assíncrono no JS?
-[x] Qual é o fluxo natural de execução do JS?
-[x] O que é uma `callback function`?
-[x] Sobre a função `setTimeout()`
-[x] Caso de uso


### Síncrono x Assíncrono

**Síncrono** uma tarefa após a outra. A tarafe anterior precisa ser concluída para só então dar início a outra. O JS é síncrono por padrão.
**Assíncrono** tarefas executadas de maneira independente. O JS pode utilizar o assincronismo.

### Função callback

É uma função passada como argumento de outra função. A função callback estará pronta para ser invocada no momento oportuno. Exemplo abaixo:
```
function imprimirDado(dado) {
    console.log('outras tarefas')
    console.log(dado())
}

imprimirDado(function () {
    return 'Olá mundo'
})    
```
- A função imprimirDado recebe uma função anônima que retorna uma string 'Olá mundo'
- Esta função anônima é uma função callback aguardando para ser executada; 
- É executada depois da outra instrução `console.log('outras tarefas')`

### setTimeout()
Recebe uma função callback e a executa no tempo programado.

// setTimeout(function, delay)
```
setTimeout(function () {
	console.log('depois de 1s')
}, 1000)
```

### Caso de uso

#### Exemplo de utilização de assincronismo e callback function

```
const https = require('http')
const API = 'https://jsonplaceholder.typicode.com/users?_limit=2'

https.get(API, res => {
	console.log(res.statusCode)
})

console.log('conectando API')
```
- A função **get()** recebe, além do argumento **API**, uma função anônima `res => {}` que exibirá o statusCode
- Esta função `res => {}` é uma callback e será executada após o `console.log('conectando API')` que está fora da função `get()`

## Promise

É uma promessa de algo será executado. De forma assíncrona, a promessa será executada.
Ela possui retornos; a promessa precisa dar resultado e ser finalizada.