import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	modules: [],
	module: null,
	contents: [],
	content: null
};
export const moduleSlice = createSlice({
	name: 'modules',
	initialState,
	reducers: {
		loadCourseModules: (state, action) => {
			state.modules = action.payload;
		},
		loadCourseContents: (state, action) => {
			state.contents = action.payload;
		},
		loadSingleContent: (state, action) => {
			state.content = action.payload;
		},
		loadCourseModule: (state, action) => {
			state.module = action.payload;
		}
	}
});

export default moduleSlice.reducer;

export const {
	loadCourseModule,
	loadCourseModules,
	loadCourseContents,
	loadSingleContent
} = moduleSlice.actions;
export const getCourseModules = (state) => state.modules.modules;
export const getCourseContents = (state) => state.modules.contents;
export const fetchSingleContent = (state) => state.modules.content;
export const getCourseModule = (state) => state.modules.module;
