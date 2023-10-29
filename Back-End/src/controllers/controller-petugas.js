module.exports = {
    petugas(req,res){
        res.render("petugas",{
            url: 'http://localhost:5000/',
            nama: req.session.username,
        });
    }
}