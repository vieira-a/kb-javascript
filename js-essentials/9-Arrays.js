arr1 = [7, 5, 9]
arr2 = [9, 7, 5]

//console.log(arr1.sort())

//order arrays
const orderArrays = (array) => {
  return array.sort()
}

const compareArrays = (arr1, arr2) => {
  orderArrays(arr1)
  orderArrays(arr2)
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

//console.log(compareArrays(arr1, arr2))

arrGroup = [
  [7, 5, 9],
  [8, 6, 9],
  
]

//comparte arr2 with arrays group
const compareArrWithArraysGroup = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
}
//order array group
const orderArraysGroup = () => {
  arrGroup.forEach(element => {
    orderArrays(arr2)
    orderArrays(element)
    if(JSON.stringify(element) === JSON.stringify(arr2)){
      console.log('iguais')
    } else {
      console.log('diferentes')
    }
  });
}
orderArraysGroup()
