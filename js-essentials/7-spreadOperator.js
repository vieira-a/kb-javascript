/**
 * Objects or array unior
 */

const arr1 = [1,2,3]
const arr2 = [4,5,6]

const arr3 = [...arr1, ...arr2]
//console.log(arr3)

const carName = {name: 'Uno'}
const carBrand = {brand: 'Fiat'}
const carFabrication = {fabrication: 2012}


const car = {...carName, ...carBrand, ...carFabrication}
console.log(car)