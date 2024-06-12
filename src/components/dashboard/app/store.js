import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/auth/authSlice';
import courseReducer from '../features/courses/courseSlice';
import courseModuleReducer from '../features/courseModules/courseModuleSlice';
import courseContentReducer from '../features/courseContents/courseContentSlice';
import studentReducer from '../../../store/studentSlices';
import chatReducer from '../features/chat/chatSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		users: userReducer,
		students: studentReducer,
		courses: courseReducer,
		courseModules: courseModuleReducer,
		courseContents: courseContentReducer,
		chat: chatReducer
	}
});
