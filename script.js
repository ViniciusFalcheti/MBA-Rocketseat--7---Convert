// Cotação de moedas do dia
const USD = 5.47
const EUR = 5.91
const GBP = 6.99

const form = document.querySelector("form")
const amount = document.querySelector("#amount")
const currency = document.querySelector("#currency")

// Manipulando o input amount para receber somente números
amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

// Capturando o evento de submit do formulário
form.onsubmit = (event) => {
    event.preventDefault()

    switch(currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break
        case "GBP":
            convertCurrency(amount.value, GBP, "£")
            break
    }
}

function convertCurrency(amount, price, symbol) {
    const footer = document.querySelector("main footer")
    const description = document.getElementById("description")
    const result = document.getElementById("result")

    let total = amount * price

    // Verifica se resultado não é um número
    if (isNaN(total)) {
        return alert( "Por favor, digite o valor corretamente para converter.")
    }

    total = formatCurrencyBRL(total).replace("R$", "")

    try{
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`
        result.textContent = `${total} Reais`
    // footer.style.display = "block" 

        // Adiciona a classe que mostra a footer 
        footer.classList.add("show-result")

    } catch(error){
        // Remove a classe que mostra o footer
        footer.classList.remove("show-result")
        console.log(error)
        alert("Não foi possícel coverter. Tente novamente mais tarde!")
    }    
}

// Formata moeda em real brasileiro
function formatCurrencyBRL(value){
    // Coverte em número para usar o toLocaleString para formatar no padrão BRL (R$ 00,00)
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}