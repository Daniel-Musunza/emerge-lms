import store from 'store/store';

const errorHandler = (error) => {
	if (error?.response?.data) {
		if (
			error.response.data.error.message ===
				'Error verifying token: TokenExpiredError: jwt expired' &&
			error.response.data.error.code === 401
		) {
			store.dispatch({
				type: 'LOGOUT',
				payload: null
			});
			localStorage.removeItem('__pangaMalipo__');
			localStorage.removeItem('__passStatus__');
			window.location.href = '/';
			window.location.reload();
		}

		// if (error.response.data.error.message ===  'Unauthorized' && error.response.data.error.code === 401) {
		//   store.dispatch({
		//     type: 'LOGOUT',
		//     payload: null
		//   });
		//   localStorage.removeItem('__pangaMalipo__');
		//   localStorage.removeItem('__passStatus__');
		//   window.location.href = '/';
		//   window.location.reload();
		// }

		if (typeof error.response.data.error.message === 'object') {
			throw new Error(error.response.data.error.message.message);
		}
		throw new Error(error.response.data.error.message);
	}
	throw new Error('Error');
};

export default errorHandler;
