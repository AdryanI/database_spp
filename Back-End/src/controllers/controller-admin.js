module.exports = {
    admin(req,res){
        res.render("admin",{
            url: 'http://localhost:5000/',
            nama: req.session.username,
        });
    }
}