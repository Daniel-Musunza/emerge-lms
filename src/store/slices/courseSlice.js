import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	courses: [],
	course: null
};

export const courseSlice = createSlice({
	name: 'admincourses',
	initialState,
	reducers: {
		loadCourses: (state, action) => {
			state.courses = action.payload;
		},
		loadCourse: (state, action) => {
			state.course = action.payload;
		}
	}
});

export default courseSlice.reducer;

export const { loadCourses, loadCourse } = courseSlice.actions;
export const getCourses = (state) => state.admincourses.courses;
export const getCourse = (state) => state.admincourses.course;
