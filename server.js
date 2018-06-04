const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use( (req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} , ${req.url}`;
    fs.appendFile('web-visit.log',log + '\n', (err) => {
        if(err) console.log('Something is not right!')
    })
    next();
})

// app.use((req, res, next) => {
//     res.render('upgrade');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=> {
    return new Date().getFullYear();
})

hbs.registerHelper('capitalize', (text) => text.toUpperCase());

app.get('/', (req,res) => {
    res.render('home',{
        title: 'Home',
        welcomeMessage: 'welcome home, Buddy!'
    });
});

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Us'
    })
})

app.listen(3000, () => {
    console.log('Server is up @3000 port');
})