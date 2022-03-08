const axios = require('axios')

const api_token = '4f13a4d0'

const cotacao = (symbol, callback) => {

    const url = `https://api.hgbrasil.com/finance/stock_price?key=${api_token}&symbol=${symbol}`
    
    axios.get(url)
    .then(response => {
        const dataJson = response.data.results
        //console.log(dataJson)

        let objName, objProperties
        for (let i in dataJson) {
            objName = i // pega valor da propriedade PETR4
            objProperties = dataJson[i] // pega o objeto interno da PETR4
        }
        /*
        const data = {
           symbol: objProperties.symbol,
           description: objProperties.name,
           price: objProperties.price,
           openTime: objProperties.market_time.open,
           closeTime: objProperties.market_time.close
        }*/
        const {symbol, price} = objProperties
        const {open, close} =  objProperties.market_time

        const data =  {symbol, price, open, close}
        callback(data)
    })
    .catch(error => {
       console.log(error);
    });
}

module.exports = cotacao