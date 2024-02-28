import axios from 'axios';
import setAuthToken from 'helper/set-auth-token';
import jwtDecode from 'jwt-decode';
import { baseUrl } from '../../../../api/base';

const getUsers = async () => {
	const response = await axios.get(baseUrl + 'users/');

	return response.data;
};
const getTutors = async () => {
	const response = await axios.get(baseUrl + 'student/');

	return response.data;
};
// Register user
const register = async (userData) => {
	
	const response = await axios.post(baseUrl + 'auth/signup', userData);

	return response;
};

//update User

const updateUser = async (userData) => {
	const response = await axios.patch(baseUrl + 'students/update', userData);

	return response.data;
};
// Login user
const login = async (userData) => {
	const response = await axios.post(baseUrl + 'auth/signin', userData);
	let token = response.data.data.accessToken;
	setAuthToken(token);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

const forgotpassword = async (userData) => {
	const response = await axios.post(
		baseUrl + 'password-reset-request',
		userData
	);

	return response.data;
};
// Logout user
const logout = () => {
	localStorage.removeItem('user');
	localStorage.removeItem('____emergeLMSDash____')
};

const authService = {
	register,
	logout,
	login,
	forgotpassword,
	getTutors,
	getUsers,
	updateUser
};

export default authService;
