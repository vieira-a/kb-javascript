/**
 * Conventional function
 */

function sum(a, b){
    return a + b
}

/**
 * Arrow function
 */

const sumArrow = (a, b) => {
    return a + b 
}

/**
 * Simplified arrow function with just one argument
 */

const arrowSum = (a, b) => a + b


/**
 * Arrow function with body
 */

const sayHello = (name) => {
    if(name){
        return `Hello, ${name}`
    } else {
        return `Hello, no name`
    }
}

/**
 * Arrow function simplified without argument
 */

const sayMyName = () => console.log('Anderson')
sayMyName()