import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import courseModuleService from './courseModuleService';

const initialState = {
	courseModules: [],
	isError: false,
	isSuccess: false,
	isLoading: true,
	message: ''
};

// Get user courseContents
export const fetchCourseModules = createAsyncThunk(
	'courseModules/getAll',
	async (id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.data.accessToken;
			return await courseModuleService.getcourseModules( id, token);
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
export const createCourseModule = createAsyncThunk(
	'courseModules/create',
	async (courseModuleData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.data.accessToken;
			return await courseModuleService.createCourseModule(
				courseModuleData,
				token
			);
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

export const courseModuleSlice = createSlice({
	name: 'courseModule',
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
			.addCase(fetchCourseModules.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchCourseModules.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.courseModules = action.payload;
			})
			.addCase(fetchCourseModules.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(createCourseModule.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createCourseModule.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.courseModules.push(action.payload);
			})
			.addCase(createCourseModule.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	}
});

export const { reset } = courseModuleSlice.actions;
export default courseModuleSlice.reducer;
