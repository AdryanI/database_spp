module.exports = {
    siswa(req,res){
        res.render("siswa",{
            url: 'http://localhost:5000/',
            nama: req.session.username,
        });
    }
}