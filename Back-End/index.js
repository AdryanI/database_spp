// Definisi Library yang digunakan
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('req-flash');
const app = express();
images = [{image: "./src/Public/Background.jpg"}];

// Definisi lokasi file router
const loginRoutes = require('./src/routes/router-login');
const registerRoutes = require('./src/routes/router-register');
const appRoutes = require('./src/routes/router-app');
const createDataRoutes = require('./src/routes/router-create-data');
const showDataRoutes = require('./src/routes/router-show-data');

// Configurasi dan gunakan library
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Configurasi library session
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'osisSMKPlusPelitaNusantara',
    name: 'secretName',
    cookie: {
        sameSite: true,
        maxAge: 60000
    },
}))
app.use(flash());
app.use(express.static(path.join(__dirname, 'src/public')));
// app.use(express.static(path.join(__dirname, 'src/assets')));

// Setting folder views
app.set('views',path.join(__dirname,'src/views'));
app.set('view engine', 'ejs');

// Gunakan routes yang telah didefinisikan
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/create-data', createDataRoutes)
app.use('/show-data', showDataRoutes)
app.use('/', appRoutes);
app.use(flash());

// tambahkan ini
app.use(function(req, res, next) {
    res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.setHeader('Pragma', 'no-cache');
    next();
});
// end

// Gunakan port server
app.listen(5000, ()=>{
    console.log('Server Berjalan di Port : '+5000);
});
