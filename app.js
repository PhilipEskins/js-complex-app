const express = require('express')
const app = express()

const router = require('./router')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(express.static('public'))
app.set('views', 'views') // Second value is folder name
app.set('view engine', 'ejs')

app.use('/', router)

module.exports = app