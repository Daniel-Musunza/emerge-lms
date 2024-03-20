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
			return await courseModuleService.getcourseModules( id);
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
	}
});

export const { reset } = courseModuleSlice.actions;
export default courseModuleSlice.reducer;
