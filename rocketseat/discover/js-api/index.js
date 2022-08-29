/**
 * HTTP Method: GET
app.route('/').post((req, res) => res.send(req.body))
*/
/**
 * HTTP Method: POST
app.route('/').post((req, res) => res.send(req.body));
 */
/**
 * HTTP Method: PUT
let author = "Anderson"
app.route('/').get((req,res) => {
    res.send(author)
})
app.route('/').put((req,res) => {
    author = req.body.author //alterar a variável author com o JSON do body
    res.send(author) //aparece no HTML o valor da variável modificada
})
*/

const express = require('express');

const app = express();

app.listen('3000');

app.use(express.json());

