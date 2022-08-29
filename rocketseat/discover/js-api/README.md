# Trabalhando com APIs
## Sobre API
- [x] O que é e como funciona
- [x] A imporância de usar API para comunicação entre sistemas

## JSON
- [x] O que é JSON (JavaScript Object Notation) e para que serve
- [X] Como construir um arquivo JSON

## Métodos HTTP
- [x] **GET**: Solicita resposta de uma API
- [x] **POST**: Envia informações para uma API; a API recebe a informação que pode ser guardada ou não.
- [x] **DELETE**: Apagar informações de determinado identificador;
- [x] **PUT**: Atualizar informações de um ou mais registros;
- [x] **PATCH**: Atualizar informações de um registro apenas.

## Utilizando o Insominia
É um software utilizado para facilitar a manipulação de requisições a APIs. Nele é possível criar **Coleções** (Projetos) de trabalho; dentro dessas coleções é possível criar todos os métodos HTTP para as APIs indicadas. É muito útil, pois é possível guardar informações sobre projetos e organizar as consultas.

# Projeto API utilizando NodeJS + Express
- [x] Criando servidor;
- [x] Criando rota de acesso ao index através do método GET;

## Métodos HTTML no Express
Fazer com que apareça no navegador a resposta da requisição GET:
**GET** `app.route('/').get((req, res)=> res.send("Hello world"));`

Para os demais métodos é necessário utilizar o Insomnia, pois o navegador só reconhece o método GET.
- [x] Configurado ambiente no Insomnia para testar o servidor com os métodos HTTP;
- [x] Configurar arquivo **index.js** para enviar requisições de métodos para o servidor;

    - [x] POST
        
        Criei um arquivo JSON no **body** da requisição, para enviá-lo no **POST** e fazer com que o conteúdo deste retorne, para verificar se o método funciona normalmente.
        ```
        app.use(express.json());
        app.route('/').post((req, res) => res.send(req.body));

        ```
    - [x] PUT

        Criado o método PUT para alterar o valor de uma variável chamada **author**:
        A variável é criada inicialmente após a inicialização do servidor; feito isso, cria-se a rota com o método **PUT** para alterar o valor desta variável; cria-se também o PUT também no **Insomnia**, aonde é criado um JSON no body com o novo valor da variável author: `{"author": "Anderson Vieira"}`
        
        ```
        let author = "Anderson"

        app.route('/').put((req,res) => {
            author = req.body.author
            res.send(author)
        })

        ```
        Criada também uma rota GET para exibir o valor da variável alterada:

        ```
        app.route('/').get((req,res) => {
            res.send(author)
        })

        ```