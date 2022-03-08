console.log('javascript no frontend')

const cotacoesForm = document.querySelector('form')
const mainMensage = document.querySelector('h3')
const symbol = document.querySelector('#symbol')
const price = document.querySelector('#price')
const open = document.querySelector('#open')
const close = document.querySelector('#close')

cotacoesForm.addEventListener('submit', (event) => {
    mainMensage.innerText = 'buscando...'
    symbol.innerHTML =  ''
    price.innerHTML =  ''
    open.innerHTML =  ''
    close.innerHTML =  ''
    
    event.preventDefault()
    const ativo = document.querySelector('input').value

    if(!ativo){
        mainMensage.innerText = 'O ativo deve ser informado'
        return;
    }
    
    fetch(`/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                mainMensage.innerText = `Alguma coisa deu errado` 
                price.innerHTML =  `${data.error.mensage} | código ${data.error.code}`
            }else{
                mainMensage.innerText = data.symbol
                symbol.innerHTML =  `SYMBOL: ${data.symbol}`
                price.innerHTML =  `PRICE: ${data.price}`
                open.innerHTML =  `OPEN: ${data.open}`
                close.innerHTML =  `CLOSE: ${data.close}`
            }
        })
    })
})