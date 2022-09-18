/**
 * Transform object or array data in variable
 */

const persons = ['Anderson', 'Pedro', 'Larissa', 'Juliana']

const [p1, p2, p3, p4] = persons //according to array index 

//console.log(p4)

const players = {
    name: 'Cristiano Ronaldo',
    age: 36,
    nation: 'Portugal',
    club: 'Manchester United'
}

const {name: playerName, age: playerAge, nation, club} = players
console.log(`${playerName} is ${playerAge} old, from ${nation} and plays for ${club}`)