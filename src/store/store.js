import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
	reducer: rootReducer
	// devTools: env
});
export default store;
export var AppDispatch = store.dispatch;
