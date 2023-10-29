const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

module.exports = {
    home(req,res){
        const status = req.body.status;
        res.render("home",{
            url: 'http://localhost:5000/',
            status,
            userName: req.session.username,
        });
    }
}