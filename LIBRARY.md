# Biblioteca de funções JavaScript
Aqui estão documentadas pequenas funções ou trechos de código para resolver problemas comuns.

## Como utilizar
Para cada nova inserção, deve-se obedecer regras de escrita para facilitar buscas posteriores. O arquivo estará organizado por seções, afim de facilitar a organização.

### Comportamento do nevagador

#### Título: Exibe uma caixa de diálogo modal para fazer uma pergunta ao usuário. Se ele clicou no botão "OK", faz o navegador carregar uma nova página.

```
function moveon() {
var answer = confirm("Ready to move on?");
    if (answer) window.location = "http://google.com";
}
setTimeout(moveon, 60000);
```
keywords: diálogo, caixa, confirmar

#### Titulo: Executa a função definida acima por 1 minuto (60.000 milissegundos) a partir de agora.
`setTimeout(moveon, 60000);`

keywords: timeout, automaticamente

#### Titulo: Localiza elementos de uma página e faz um laço sobre eles, para aplicar um evento
```
window.onload = function() {
// Executa esta função quando o documento for carregado
// Localiza todas as marcas <img> no documento
var images = document.getElementsByTagName("img");
// Faz um laço por elas, adicionando uma rotina de tratamento para eventos "click" em
// cada uma para que clicar na imagem a oculte.
for(var i = 0; i < images.length; i++) {
var image = images[i];
if ( image.addEventListener) // Outro modo de registrar uma rotina de
// tratamento
image.addEventListener("click", hide, false);
else
// Para compatibilidade com o IE8 e anteriores
image.attachEvent("onclick", hide);
}

```
keywords: laço, for, evento, addEventListener, attachEvent

#### 