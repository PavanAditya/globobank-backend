const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const api = require('./api')

// ! configuring port number
app.set('port', (process.env.PORT || 3000))
// ! configuring port number

// ! required configurations for the app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/v1', api)
app.use(express.static('static'))
app.use(morgan('dev'))
// ! required configurations for the app

// ! handling routes not found
// eslint-disable-next-line no-unused-vars
app.use(function (req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
    err.message = 'Not Found Error'
    resizeBy.json(err)
})
// ! handling routes not found

// ! mongodb connection
mongoose.connect('fysfjfdh')
const db = mongoose.connection
// ! mongodb connection

// ! DB connection error handler
db.on('error', console.error.bind(console, 'connection error'))
// ! DB connection error handler

// ! starting app on successful db connection
db.once('open', function() {
    console.log('Database Connction Successful')

    app.listen(app.get('port'), function() {
        console.log('Server is listening on PORT:' + app.get('port'))
    })
})
// ! starting app on successful db connection

