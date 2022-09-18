/**
 * Diferences between variables types (var, let and const)
 * The main diference is a scope of witch the variable is part
 * Scope = delimitant context
 */

/**
 * Variables (var) has a global scope. They may be updated and declared again inside their scope. 
 */

/*
var name = 'Anderson' //First declaration
var name = 'Pedro' // Declared again in her scope
console.log(name)
*/

/*
let name = 'Anderson' //First declaration
//let name = 'Pedro' //Cant be declared again

function sayMyName(){
    name = 'Pedro' //May be updated
    return name
}
console.log(sayMyName())
*/
/*
const name = 'Anderson'

function sayMyName(){
    name = 'Pedro' //Cant be updated
    return name
}
sayMyName()
*/