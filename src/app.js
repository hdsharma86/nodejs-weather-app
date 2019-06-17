const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

hbs.registerPartials(partialsPath);
app.use(express.static(publicDirPath));
app.set('view engine', 'hbs');
app.set('views', viewPath);

app.get('', (req, res) => {
    res.render('index',{
        title: "Web Server | App",
        content: "Search weather online for your nearby location(s)..."
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help | App',
        content: 'Help Page'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us | App',
        content: 'About Us page'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Address can\'t be empty."
        });
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location}) => {
            if(error){
                return res.send({error:error});
            }
        
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({error:error});
                }
        
                return res.send({
                    location:location,
                    forecastData:forecastData
                });
            });
        });
    }
})

app.get('*', (req, res) => {
    res.render('error', {
        title: "404 Error",
        heading: "Page Not Found",
        content: "404 Error"
    });
});

app.listen(port, () => {
    console.log('Server is running on port '+port);
});
//https://nodejs-weather-app-hdsharma86.herokuapp.com/