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

export const bookmarkCourse = createAsyncThunk(
	'courses/create',
	async (Data, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.data.accessToken;
			return await courseService.bookmarkCourse(token, Data);
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

export const payCourse = createAsyncThunk(
	'courses/pay',
	async (Data, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.data.accessToken;
			return await courseService.payCourse(token, Data);
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
			.addCase(bookmarkCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(bookmarkCourse.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(bookmarkCourse.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(payCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(payCourse.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(payCourse.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	}
});

export const { reset } = courseSlice.actions;
export default courseSlice.reducer;
