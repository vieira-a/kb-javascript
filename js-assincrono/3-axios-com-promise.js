const axios = require('axios')

Promise.all(
    [
        axios.get('https://api.github.com/users/vieira-a'),
        axios.get('https://api.github.com/users/vieira-a/repos')
    ]
)
.then( resposes => {
    console.log(resposes[0].data.login)
    console.log(resposes[1].data.length)
})
.catch( err => console.log(err.message))