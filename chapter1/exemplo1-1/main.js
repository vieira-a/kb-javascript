/*
* Este script define a função calculate() chamada pelas rotinas de tratamento de evento
* no código HTML acima. A função lê valores de elementos <input>, calcula
* as informações de pagamento de empréstimo, exibe o resultado em elementos <span>.
* Também salva os dados do usuário, exibe links para financeiras e desenha um gráfico.
*/

function calculate() {
    // Pesquisa os elementos de entrada e saída no documento
    const amount = document.getElementById("amount");
    const apr = document.getElementById("apr");
    const years = document.getElementById("years");
    const zipcode = document.getElementById("zipcode");
    const payment = document.getElementById("payment");
    const total = document.getElementById("total");
    const totalinterest = document.getElementById("totalinterest");

    /**
     * Obtém a entrada do usuário através dos elementos de entrada. Presume que tudo isso é válido.
     * Converte os juros de porcentagem para decimais e converte de taxa anual para taxa mensal. 
     * Converte o período de pagamento em anos para o número de pagamentos mensais.
     */

    let principal = parseFloat(amount.value);
    let interest = parseFloat(apr.value) / 100 / 12;
    let payments = parseFloat(years.value) * 12;

    //Calcula o valor do pagamento mensal
    let x = Math.pow(1 + interest, payments);
    let monthly = (principal*x*interest)/(x-1);

    /**
     * Se o resultado é um número finito, a entrada do usuário estava correta.
     * Temos resultados significativos para exibir
     */

    if(isFinite(monthly)) {
        payment.innerHTML = monthly.toFixed(2);
        total.innerHTML = (monthly * payments).toFixed(2);
        totalinterest.innerHTML = ((monthly*payments)-principal).toFixed(2);
        // Salva a entrada do usuário para que possamos recuperá-la na próxima vez que ele visitar
        save(amount.value, apr.value, years.value, zipcode.value);
        // Anúncio: localiza e exibe financeiras locais, mas ignora erros de rede
        try {
            //Captura quaisquer erros que ocorram dentro destas chaves
            getLenders(amount.value, apr.value, years.value, zipcode.value);
        }
        catch(e) {/*ignora esses erros*/}
        //Por fim, traça o gráfico do saldo devedor, dos juros e dos pagamentos do capital
        chart(principal, interest, monthly, payments);
    } else {
        /**
         * O resultado foi Not-a-Number ou infinito, o que significa que a entrada
         * estava incompleta ou era inválida. Apaga qualquer saída exibida anteriormente.
         */
        payment.innerHTML = "";
        total.innerHTML = "";
        totalinterest = "";
        chart(); //apaga o gráfico
    }
}

/**
 * Salva a entrada do usuário como propriedades do objeto localStorage. 
 * Essas propriedades ainda existirão quando o usuário visitar no futuro
 * Esse recurso de armazenamento não vai funcionar em alguns navegadores
 * (o Firefox, por exemplo), se você executar o exemplo a partir de um arquivo local:// URL. 
 * Contudo, funciona com HTTP.
 */

function save(amount, apr, years, zipcode) {
    if(window.localStorage) {
        localStorage.loan_amount = amount;
        localStorage.loan_apr = apr;
        localStorage.loan_years = years;
        localStorage.loan_zipcode = zipcode;
    }
}

// Tenta restaurar os campos de entrada automaticamente quando o documento é carregado pela primeira vez.
window.onload = function() {
    // Se o navegador suporta localStorage e temos alguns dados armazenados
    if(window.localStorage && localStorage.loan_amount) {
        document.getElementById("amount").value = localStorage.loan_amount;
        document.getElementById("apr").value = localStorage.loan_apr;
        document.getElementById("years").value = localStorage.loan_years;
        document.getElementById("zipcode").value = localStorage.loan_zipcode;
    }
}

/**
 * Passa a entrada do usuário para um script no lado do servidor que (teoricamente)
 * pode retornar uma lista de links para financeiras locais interessadas em fazer empréstimos. 
 * Este exemplo não contém uma implementação real desse serviço de busca de financeiras. 
 * Mas se o serviço existisse, essa função funcionaria com ele.
 */

function getLenders(amount, apr, years, zipcode) {
    // Se o navegador não suporta o objeto XMLHttpRequest, não faz nada
    if(!window.XMLHttpRequest) return;
    // Localiza o elemento para exibir a lista de financeiras
    let ad = document.getElementById("lenders");
    if(!ad) return; //Encerra se não há ponto de saída
    // Codifica a entrada do usuário como parâmetros de consulta em um URL
    let url = "getLenders.php" + "?amt=" + encodeURIComponent(amount) + "&apr=" + encodeURIComponent(apr) + "&yrs=" + encodeURIComponent(years) + "&zip=" + encodeURIComponent(zipcode);
    // Busca o conteúdo desse URL usando o objeto XMLHttpRequest
    let req = new XMLHttpRequest(); //Inicia um novo pedido
    req.open("GET", url); //Um pedido GET da HTTP para o url
    req.send(null); //Envia o pedido sem corpo
    /**
    * Antes de retornar, registra uma função de rotina de tratamento de evento que será 
    * chamada em um momento posterior, quando a resposta do servidor de HTTP chegar.
    * Esse tipo de programação assíncrona é muito comum em JavaScript do lado do cliente.
    */
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
        // Se chegamos até aqui, obtivemos uma resposta HTTP válida e completa
        var response = req.responseText;
        // Resposta HTTP como string
        var lenders = JSON.parse(response); // Analisa em um array JS
        // Converte o array de objetos lender em uma string HTML
        var list = "";
        for(var i = 0; i < lenders.length; i++) {
        list += "<li><a href='" + lenders[i].url + "'>" +
        lenders[i].name + "</a>";
        }
        // Exibe o código HTML no elemento acima.
        ad.innerHTML = "<ul>" + list + "</ul>";
        }
    }
        
}

/**
 * Faz o gráfico do saldo devedor mensal, dos juros e do capital em um elemento <canvas> da HTML.
 * Se for chamado sem argumentos, basta apagar qualquer gráfico desenhado anteriormente.
 */

function chart(principal, interest, monthly, payments) {
    let graph = document.getElementById("graph"); 
    graph.width = graph.width;
    // Se chamamos sem argumentos ou se esse navegador não suporta
    // elementos gráficos em um elemento <canvas>, basta retornar agora.
    if (arguments.length == 0 || !graph.getContext) return;
    // Obtém o objeto "contexto" de <canvas> que define a API de desenho
    let g = graph.getContext("2d"); // Todo desenho é feito com esse objeto
    let width = graph.width, height = graph.height; // Obtém o tamanho da tela de desenho
    // Essas funções convertem números de pagamento e valores monetários em pixels
    function paymentToX(n) { return n * width/payments; }
    function amountToY(a) { return height-(a * height/(monthly*payments*1.05));}
    // Os pagamentos são uma linha reta de (0,0) a (payments, monthly*payments)
    g.moveTo(paymentToX(0), amountToY(0));
    g.lineTo(paymentToX(payments),amountToY(monthly*payments));
    g.lineTo(paymentToX(payments), amountToY(0));
    g.closePath();
    g.fillStyle = "#f88";
    g.fill();
    g.font = "bold 12px sans-serif";
    g.fillText("Total Interest Payments", 20,20);
    // O capital acumulado não é linear e é mais complicado de representar no gráfico
    let equity = 0;
    g.beginPath();
    g.moveTo(paymentToX(0), amountToY(0));

    for(let p = 1; p <= payments; p++) {
        let thisMonthsInterest = (principal-equity)*interest;
        equity += (monthly - thisMonthsInterest);
        g.lineTo(paymentToX(p),amountToY(equity));
    }
    g.lineTo(paymentToX(payments), amountToY(0));
    g.closePath();
    g.fillStyle = "green";
    g.fill();
    g.fillText("Total Equity", 20,35);
    // Faz laço novamente, como acima, mas representa o saldo devedor como uma linha
    // preta grossa no gráfico
    let bal = principal;
    g.beginPath();
    g.moveTo(paymentToX(0),amountToY(bal));
    for(var p = 1; p <= payments; p++) {
        let thisMonthsInterest = bal*interest;
        bal -= (monthly - thisMonthsInterest);
        g.lineTo(paymentToX(p),amountToY(bal)); // Desenha a linha até esse ponto
    }
    g.lineWidth = 3;
    g.stroke();
    g.fillStyle = "black";
    g.fillText("Loan Balance", 20,50);

    // Agora faz marcações anuais e os números de ano no eixo X
    g.textAlign="center";

    let y = amountToY(0);
    for(var year=1; year*12 <= payments; year++) {
        let x = paymentToX(year*12);
        g.fillRect(x-0.5,y-3,1,3);
        if (year == 1) g.fillText("Year", x, y-5);
        if (year % 5 == 0 && year*12 !== payments)
        g.fillText(String(year), x, y-5);
    }
    // Marca valores de pagamento ao longo da margem direita
    g.textAlign = "right";
    g.textBaseline = "middle";
    let ticks = [monthly*payments, principal]; // Os dois pontos que marcaremos
    var rightEdge = paymentToX(payments);
    for(var i = 0; i < ticks.length; i++) {
        let y = amountToY(ticks[i]);
        g.fillRect(rightEdge-3, y-0.5, 3,1);
        g.fillText(String(ticks[i].toFixed(0)),rightEdge-5, y);
    }
}   


