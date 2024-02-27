import axios from 'axios';
import { baseUrl } from './base';

const authApi = {
	signup: (user) => {
		return axios.post(`${baseUrl}/auth/signup`, user);
	},
	login: (user) => {
		return axios.post(`${baseUrl}/auth/signin`, user);
	},
	activateEmail: (token) => {
		return axios.patch(`${baseUrl}/auth/verify-email`, {
			confirmationCode: token
		});
	},
	forgotPassword: (payload) => {
		return axios.post(`${baseUrl}/auth/password-reset-request`, payload);
	},
	resetPassword: (password, token) => {
		return axios.patch(`${baseUrl}/auth/reset-password`, {
			newPassword: password.newPassword,
			passwordResetToken: token
		});
	},

	changePassword: (payload) => {
		return axios.patch(`${baseUrl}/auth/change-password/`, payload);
	}
};

export default authApi;
