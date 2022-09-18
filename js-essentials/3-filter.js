/**
 * Filter is an array method
 * It returns a new array with filtered result
 */

const arr = [1,2,3,4,5]

const highNumbers = arr.filter((n)=>{
    if(n >=3){
        return n
    }
})

//console.log(highNumbers)

const users = [
    {name: 'Anderson', available: false},
    {name: 'Pedro', available: true},
    {name: 'Larissa', available: false},
    {name: 'Juliana', available: true},
]

const availableUsers = users.filter((users)=> users.available)
const notAvailableUsers = users.filter((users)=> !users.available)

console.log(availableUsers)
console.log(notAvailableUsers)