
import courseReducer from './slices/courseSlice';
import courseModuleReducer from './slices/courseModuleSlice';
import tutorReducer from './slices/tutorSlices';
import { combineReducers } from '@reduxjs/toolkit';
import analyticsReducer from './slices/analytics';

const rootReducer = combineReducers({
	tutors: tutorReducer,
	admincourses: courseReducer,
	modules: courseModuleReducer,
	analytics: analyticsReducer
});
export default rootReducer;
