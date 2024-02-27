import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import courseService from './courseService';

const initialState = {
	courses: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
};

// Get user Courses
export const fetchCourses = createAsyncThunk(
	'courses/getAll',
	async (_, thunkAPI) => {
		try {
			return await courseService.getCourses();
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const fetchTutorCourses = createAsyncThunk(
	'courses/getTutorCourses',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.data.accessToken;
			return await courseService.getTutorCourses( token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);
export const createCourse = createAsyncThunk(
	'courses/create',
	async (courseData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.data.accessToken;
			return await courseService.createCourse(courseData, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const courseSlice = createSlice({
	name: 'course',
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.message = '';
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCourses.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchCourses.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.courses = action.payload;
			})
			.addCase(fetchCourses.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(fetchTutorCourses.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchTutorCourses.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.courses = action.payload;
			})
			.addCase(fetchTutorCourses.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(createCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createCourse.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.courses.push(action.payload);
			})
			.addCase(createCourse.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	}
});

export const { reset } = courseSlice.actions;
export default courseSlice.reducer;
