// Função para a cifrad e cessar, ela recebe o p para o passo, uma mensagem e um argumento booleano,
// onde o true represensta que a mensagem esta codificada e false descodificada. Por fim ela retorna
// uma mensagem nova (codificada ou descodificada).

function cifraCesar(p, mensagem, critp = true){
    var alfabeto = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz"
    var novoAlfabeto = alfabeto.slice((p)*2) + alfabeto.slice(0,(p)*2)
    var novaMensagem = ""
    if (critp){
        for (var i = 0; i < mensagem.length; i++){
            if (alfabeto.indexOf(mensagem[i]) > 0){
                var n = novoAlfabeto.indexOf(mensagem[i])
                novaMensagem = novaMensagem + alfabeto[n]
            } else{
                novaMensagem = novaMensagem + mensagem[i]
            }
        }
    } else {
        for (var i = 0; i < mensagem.length; i++){
            if (alfabeto.indexOf(mensagem[i]) > 0){
                var n = alfabeto.indexOf(mensagem[i])
                novaMensagem = novaMensagem + novoAlfabeto[n]
            } else{
                novaMensagem = novaMensagem + mensagem[i]
            }
        }
    }
    return novaMensagem
}

// Função base64, recebe dois argumentos mensagem e cript, o cript define se a mensagem esta criptografada
// no caso de true ela esta e no caso contrário false. Por fim ela retorna a nova mensagem.
function base64(mensagem, critp = true){
    var novaMensagem = ""
    if (critp){
        novaMensagem = atob(mensagem)
    } else {
        novaMensagem = btoa(mensagem)
    }
    return novaMensagem
}


// Avaliando se a criptografia escolhida foi a de cesar ou base 64, e no primerio caso criando um novo
// elemnento no html.Também executa uma interatividade quando o usuário alterna entre as possíveis seleções
// com ela o novo elemento pode ser retirado ou adicionado caso o usário volte a escolher a opção do césar novavemnte.
var select = document.querySelector("#seletor")
var c = 0
select.addEventListener('change', (event) => {
    var escolha = event.target.value
    if (escolha == "valor1" & c == 0){
        var passo = document.createElement("label")
        passo.innerText = "Adicione um passo"
        passo.setAttribute('id', 'passo')
        var input = document.createElement("input")
        input.type = "number"
        input.id = "passo_input"
        passo.id = "passo_label"
        document.querySelector("#passo_cesar").append(passo)
        document.querySelector("#passo_cesar").append(input) 
        c = 1
    } else if (c == 1){
        console.log(c)
        c = 0   
        var passo_cesar = document.querySelector("#passo_cesar") 
        passo_cesar.removeChild(document.querySelector("#passo_input"))
        passo_cesar.removeChild(document.querySelector("#passo_label"))
    }
    
})

// Execução da codificação ou decodificação
var enviar = document.querySelector("#submit")
enviar.addEventListener("click", function(event){
    event.preventDefault();
    var mensagem = document.querySelector("#mensagem").value
    var seletor = document.querySelector("#seletor")
    var novaMensagem = ""
    var cript = document.querySelector("#cod").checked
    if (seletor.value == "valor1"){
        var passo = Number(document.querySelector("#passo_input").value)
        console.log(cript)
        if (cript){
            novaMensagem = cifraCesar(passo, mensagem, false)
        } else{
            novaMensagem = cifraCesar(passo, mensagem, true)
        }
    }else if(seletor.value == "valor2") {
        if (cript){
            novaMensagem = base64(mensagem, false)
        } else{
            novaMensagem = base64(mensagem, true)
        }
    }
    var tagNovaMensagem  = document.querySelector("#novaMensagem")
    tagNovaMensagem.value = novaMensagem
    console.log(novaMensagem)
})



