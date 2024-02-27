import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import reportWebVitals from './reportWebVitals';
import { store } from './components/dashboard/app/store';
import { Provider } from 'react-redux';
import AppProvider from './context/providers/AppProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import setAuthToken from 'helper/set-auth-token';
import jwtDecode from 'jwt-decode';
const container = document.getElementById('root');
const queryClient = new QueryClient();
if (localStorage.__emergeLMSDash__) {
	let token = localStorage.__emergeLMSDash__;
	let decoded = jwtDecode(token);
	let timeNow = Date.now() / 1000;

	// check if token is expired
	if (decoded.exp < timeNow) {
		store.dispatch({
			type: 'LOGOUT',
			payload: null
		});
		localStorage.removeItem('____emergeLMSDash____');
		window.location.href = '/';
		window.location.reload();
	}

	const session = decoded;
	store.dispatch({
		type: 'LOGIN',
		payload: session
	});

	// set headers
	setAuthToken(token);
}
const root = createRoot(container);
root.render(
	<QueryClientProvider client={queryClient}>
		<Provider store={store}>
			<AppProvider>
				<App />
			</AppProvider>
		</Provider>
		<ToastContainer />
	</QueryClientProvider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
