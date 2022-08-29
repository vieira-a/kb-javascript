/**
 * Função callback
 * É uma função passada como argumento de outra função. 
 * A função callback estará pronta para ser invocada no momento oportuno. 
 * Exemplo abaixo:
 */

function imprimirDado(dado) {
    console.log('outras tarefas')
    console.log(dado())
}

imprimirDado(function () {
    return 'Olá mundo'
})    

/**
 * A função imprimirDado recebe uma função anônima que retorna uma string 'Olá mundo'
 * Esta função anônima é uma função callback aguardando para ser executada; 
 * É executada depois da outra instrução `console.log('outras tarefas')`
 */
