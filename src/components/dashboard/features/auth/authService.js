import axios from 'axios';
import setAuthToken from 'helper/set-auth-token';
import jwtDecode from 'jwt-decode';
import { baseUrl } from '../../../../api/base';

// Register user
const register = async (userData) => {
	
	const response = await axios.post(baseUrl + 'auth/signup', userData);

	console.log(response.data);
	
	return response.data;
};

//update User

const updateUser = async (token, userData ) => {

	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.patch(baseUrl + 'students/update', userData, config);

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

const verifyEmail = async (confirmationCode) => {

	const response = await axios.patch(
		baseUrl + 'auth/verify-email',
		confirmationCode
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
	verifyEmail,
	updateUser
};

export default authService;
