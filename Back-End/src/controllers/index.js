const login = require('./controller-login');
const register = require('./controller-register');
const admin = require('./controller-admin')
const createDataSiswa = require('./controller-create-data-siswa')
const petugas = require('./controller-petugas');
const siswa = require('./controller-siswa');
const home = require('./controller-home');
const profile = require('./controller-profile');
const createData = require('./controller-create-data');
const showData = require('./controller-show-data');

module.exports ={
	login,
	register,
	admin,
	createDataSiswa,
	petugas,
	siswa,
	home,
	profile, 
	createData,
	showData
};