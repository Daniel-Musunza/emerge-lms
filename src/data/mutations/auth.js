import authApi from '../../api/auth';
import errorHandler from 'services/errorHandler';
import { LOGGIN, LOGOUT } from '../../store/actions/types';
import setAuthToken from '../../services/setAuthToken';
import jwtDecode from 'jwt-decode';
import paths from '../../routes/paths';

const signupAdmin = async (signupData) => {
	try {
		let resp = await (await authApi.signup(signupData)).data;
		return resp;
	} catch (error) {
		errorHandler(error);
	}
};

const login = async (user, dispatch) => {
	try {
		let resp = await (await authApi.login(user)).data.data;
		let token = resp.accessToken;

		const decoded = jwtDecode(token);
		setAuthToken(token);
		dispatch({
			type: LOGGIN,
			payload: decoded
		});
		localStorage.setItem('__emergeLMSDash__', token);
		localStorage.setItem('__emergeLMSDashUser__', JSON.stringify(resp));

		return resp;
	} catch (error) {
		errorHandler(error);
	}
};

const logout = (dispatch) => {
	dispatch({
		type: LOGOUT,
		payload: null
	});
	localStorage.removeItem('__emergeLMSDash__');
	localStorage.removeItem('__emergeLMSDashUser__');
};

const forgotPassword = async (payload) => {
	try {
		let resp = await (await authApi.forgotPassword(payload)).data;
		return resp;
	} catch (error) {
		errorHandler(error);
	}
};

const resetPassword = async (password, token) => {
	try {
		let resp = await (await authApi.resetPassword(password, token)).data;
		return resp;
	} catch (error) {
		errorHandler(error);
	}
};

const sendEmail = async () => {
	try {
		let resp = await (await authApi.sendEmail()).data;
		return resp;
	} catch (error) {
		errorHandler(error);
	}
};

const verifyCode = async (code) => {
	try {
		let resp = await (await authApi.verifyCode(code)).data;
		return resp;
	} catch (error) {
		errorHandler(error);
	}
};

const changePassword = async (payload, history) => {
	try {
		let resp = await (await authApi.changePassword(payload)).data;
		if (resp) {
			history.push(paths.admindashboard);
		}
		return resp;
	} catch (error) {
		errorHandler(error);
	}
};

export {
	signupAdmin,
	login,
	forgotPassword,
	resetPassword,
	logout,
	sendEmail,
	verifyCode,
	changePassword
};
