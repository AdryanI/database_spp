// Definisi Library yang digunakan
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('req-flash');
const app = express();
const multer = require('multer');

//declare Multer Image Location
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../src/gambar')
    },
    filename: (req, file, cb) => {
      // bikin file nama random
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

//multer uploadnya:
const upload = multer({storage: storage});

app.get('/uploadImg', (req, res)=> {
    res.render('index', {rpl3: result});
})
app.post("/profile", upload.single('image'), (req, res) => {
res.redirect('/');
});
//function image fetch
app.get('/getAllImages', (req, res) => {
    const fs = require('fs');
    const imageDir = ("src/public/user_account");
    fs.readdir(imageDir, (err, files) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to fetch images' });
        } else {
          files = files.filter(file => !file.startsWith('.')); // biar yang kebaca semua file
          res.json(files);
        }
      });
})
app.get('/imageGet', (req, res) => {
    const imageName = req.query.name;
    // logika buat ngefetch gambar terus masukin ke direktori src/gambar
    const imagePath = path.join(__dirname, 'src/gambar', imageName);
    res.sendFile(imagePath);
  });

// Definisi lokasi file router
const loginRoutes = require('./src/routes/router-login');
const registerRoutes = require('./src/routes/router-register');
const appRoutes = require('./src/routes/router-app');
const createDataRoutes = require('./src/routes/router-create-data');
const createDataSiswaRoutes = require('./src/routes/router-create-data-siswa');
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
        maxAge: 1*60*60*24*7*1000
    },
}))
app.use(flash());
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(express.static(path.join(__dirname, 'src/public/user_account')));
// app.use(express.static(path.join(__dirname, 'src/assets')));

// Setting folder views
app.set('views',path.join(__dirname,'src/views'));
app.set('view engine', 'ejs');

// Gunakan routes yang telah didefinisikan
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/create-data', createDataRoutes);
app.use('/create-data-siswa', createDataSiswaRoutes)
app.use('/show-data', showDataRoutes);
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
