const express = require('express');
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

const viewspath = path.join(__dirname, '..', 'templates', 'views')
const partialspath = path.join(__dirname, '..', 'templates', 'partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

// setup static directory to serve
app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jeremy Wallace'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jeremy Wallace'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jeremy Wallace',
        message: 'This is your help message.'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: 'You must provide an address'})
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({error})
        }
        forecast(data, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({ 
                forecast: forecastData, 
                location: data.location,
                address: req.query.address
            })        
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({error: 'You must provide a search term.'})
    }
    console.log(req.query.search)
    res.send({ products: []})
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found.',
        title: 'Help Article Not Found',
        name: 'Jeremy Wallace'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found.',
        title: 'Page Not Found',
        name: 'Jeremy Wallace'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})