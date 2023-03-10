const express = require('express');
const hbs = require('hbs');
const path = require('path');
const geoCode = require('./utils/geocode.js');
const earthQuakeStatus = require('./utils/earthQuakeStatus.js');
const generateFakeUserData = require('./utils/fakeUserData.js');
const rickAndMorty = require('./utils/rickAndMorty.js');
const behindTheNameData = require('./utils/behindTheName.js');
const getweatherinfo = require('./utils/getweatherinfo.js');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.json());

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/earthquakestatus', (req, res) => {
    if(!req.query.location){
        return res.send({error: 'You must provide an Address/Location!'});
    }

    geoCode(req.query.location, (error, results) => {
        if (error) {
            return res.send({error});
        }

        const input = {
            latitude: results.latitude,
            longitude: results.longitude,
            maxradiuskm: req.query.maxradiuskm,
            starttime: req.query.starttime,
            endtime: req.query.endtime,
            alertlevel: req.query.alertlevel,
            maxmagnitude: req.query.maxmagnitude
        };

        earthQuakeStatus(input, (error, data) => {
            if(error){
                return res.send({error});
            }

            res.send({data});
        });
    });
});

app.get('/fakedata', (req, res) => {
    res.render('fakeDataGenerate');
});

app.get('/fakedatagenerate', (req, res) => {
    generateFakeUserData(req.query, (error, data) => {
        if(error){
            return res.send({error});
        }

        res.send({data});
    });
});

app.get('/rickandmorty', (req, res) => {
    res.render('rickAndMorty');
});

app.get('/rickandmortyinfo', (req, res) => {
    rickAndMorty(req.query, (error, data) => {
        if(error){
            return res.send({error});
        }

        res.send({data});
    });
});

app.get('/behindname', (req, res) => {
    res.render('behindTheName');
});

app.get('/behindthename', (req, res) => {
    behindTheNameData(req.query, (error, data) => {
        if(error){
            return res.send({error});
        }

        res.send({data});
    });
});

app.get('/weatherinfo', (req, res) => {
    res.render('weatherinfo');
});

app.get('/getweatherinfo', (req, res) => {
    if(!req.query.location){
        return res.send({error: 'You must provide an Address/Location!'});
    }

    geoCode(req.query.location, (error, results) => {
        if (error) {
            return res.send({error});
        }

        getweatherinfo(results.latitude, results.longitude, (error, data) => {
            if(error){
                return res.send({error});
            }

            res.send({data});
        });
    });
});

app.listen(port, (req, res) => {
    console.log('Server is up on port', port);
});