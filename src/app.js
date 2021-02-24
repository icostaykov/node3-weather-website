const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine, views and partials location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Hristo"
    })
}) 

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Hristo"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Hristo",
        message: "Help me, step brother, I'm stuck!"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "Please, provide an address."
        })
    }

    geocode (req.query.address, (error, {latitude, longitude, location} = {}) => { 
        if (error){
          return res.send(error);
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send(error);
            }

            res.send({
                location,
                'forecast': forecastData
            })
          })
      })
})

app.get('/products', (req, res) => {
    if (!req.query.search)
    {
        return res.send({
            error: "You must provide search term."
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hristo',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hristo',
        errorMessage: 'This page does not exist'
    })
})

app.listen(3000, () => {
    console.log('Server on')
})