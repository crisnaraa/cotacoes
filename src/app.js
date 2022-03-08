const express = require('express')
const path = require('path')
const hbs = require('hbs')
const cotacoes = require('./util/cotacao')

//hospedagem heroku: https://cotacoes-curso-nodejs.herokuapp.com/
//conf básica
const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Bem vindo ao sistema de cotações',
        author: 'Crisnara'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'Sobre',
        author: 'Crisnara'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Ajuda',
        author: 'Crisnara'
    })
})

app.get('/cotacoes', (req, res) => {

    if(!req.query.ativo){
        return res.status(400).json({
            error : {
                message: 'O ativo deve ser informado',
                code: 400
            }
        })
    }


    const symbol = req.query.ativo.toUpperCase()
    cotacoes(symbol, (data) => {
        res.status(200).send(data)
    })
    
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Não existe página depois'
    })
})

//servidor
const port = process.env.PORT || 3000
app.listen(port, () => {
   console.log(`server is up on port ${port} `)
})