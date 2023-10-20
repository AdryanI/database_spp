const userModel = require('../models/controller-create-data');

module.exports = {
    formCreateData: (req, res) => {
        res.render('create-data', {
            url: 'http://localhost:5000/',
        });
    },

    saveCreateData: (req, res) => {
        let nama = req.body.nama;
        let kelas = req.body.kelas;
        let event = req.body.nama_event;
        let bukti = req.body.bukti_transaksi;
        let waktu = new Date();

        userModel.saveDataToDatabase(nama, kelas, event, waktu, (error, message) => {
            if (error) {
                req.flash('color', 'danger');
                req.flash('status', 'Error..');
                req.flash('message', error);
                res.redirect('/create-data');
            } else {
                req.flash('color', 'success');
                req.flash('status', 'Yes..');
                req.flash('message', message);
                setTimeout(() => {
                    res.redirect('/home');
                }, 5000);
            }
        });
    },
};
