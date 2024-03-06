import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import courseContentService from './courseContentService';

const initialState = {
	courseContents: [],
	isError: false,
	isSuccess: false,
	isLoading: true,
	message: ''
};

// Get user courseContents
export const fetchCourseContents = createAsyncThunk(
	'courseContents/getAll',
	async (id, thunkAPI) => {
		try {

			const token = thunkAPI.getState().auth.user.data.accessToken;
			
			return await courseContentService.getcourseContents(token, id);
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

export const courseContentSlice = createSlice({
	name: 'courseContent',
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
			.addCase(fetchCourseContents.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchCourseContents.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.courseContents = action.payload;
			})
			.addCase(fetchCourseContents.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
	}
});

export const { reset } = courseContentSlice.actions;
export default courseContentSlice.reducer;
