const login = require('./controller-login');
const register = require('./controller-register');
const home = require('./controller-home');
const profile = require('./controller-profile');
const createData = require('./controller-create-data');
const showData = require('./controller-show-data');

module.exports ={
	login,
	register,
	home,
	profile, 
	createData,
	showData
};