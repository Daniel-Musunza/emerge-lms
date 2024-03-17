import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	profile: null,
	courses: [],
	tutors: []
};
export const tutorSlice = createSlice({
	name: 'tutors',
	initialState,
	reducers: {
		loadTutorData: (state, action) => {
			state.profile = action.payload;
		},
		loadTutorCourses: (state, action) => {
			state.courses = action.payload;
		},
		loadTutors: (state, action) => {
			state.tutors = action.payload;
		}
	}
});

export default tutorSlice.reducer;

export const { loadTutorData, loadTutorCourses, loadTutors } =
	tutorSlice.actions;
export const getTutorData = (state) => state.tutors.profile;
export const getTutorCourses = (state) => state.tutors.courses;

export const getAllTutors = (state) => state.tutors.tutors;
