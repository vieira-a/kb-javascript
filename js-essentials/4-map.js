/**
 * An array method for data modification
 */

const players = [
    {name: 'Ronaldo 97', price: 5000, category: 'Icon'},
    {name: 'Gullit 94', price: 7000, category: 'Icon'},
    {name: 'Neymar Jr', price: 800, category: 'Gold'},
    {name: 'Messi', price: 600, category: 'Gold'},
]

players.map((player) => {
    if(player.category === 'Icon'){
        player.price = 10000
    }
})
//The players array is modified

console.log(players)