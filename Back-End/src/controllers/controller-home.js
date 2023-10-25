module.exports = {
    home(req,res){
        res.render("home",{
            url: 'http://localhost:5000/',
            userName: req.session.nama,
        });
    }
}