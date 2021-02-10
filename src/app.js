const request = require('request');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const port = process.env.PORT || 3000

const app = express();

// Define paths for express config
const pathPublicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handle bars and view locations
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(pathPublicDirectory))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        author: 'Hieu'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        author: 'Hieu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        author: 'Hieu'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) return res.send({message: 'You must provide an address!'});

    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if(error) {
            return res.send({error});
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})



app.get('/help/*', (req, res) => {
    res.render('error', {
        error: 'Help article not found!',
        author: 'Hieu'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        error: 'Page not found 404',
        author: 'Hieu'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000');
})


