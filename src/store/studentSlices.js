// studentSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import studentAction from './studentAction';

export const fetchStudentData = createAsyncThunk(
	'student/user',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.data.accessToken;
			return await studentAction.getStudentData(token);
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
export const studentSlice = createSlice({
	name: 'student',
	initialState: {
		studentData: null,
		isLoading2: true,
		error: null
	},
	reducers: {
		reset: (state) => {
			state.isLoading2 = true;
			state.isSuccess2 = false;
			state.isError2 = false;
			state.message2 = '';
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchStudentData.pending, (state) => {
				state.isLoading2 = true;
			})
			.addCase(fetchStudentData.fulfilled, (state, action) => {
				state.isLoading2 = false;
				state.isSuccess2 = true;
				state.studentData = action.payload;
			})
			.addCase(fetchStudentData.rejected, (state, action) => {
				state.isLoading2 = false;
				state.isError2 = true;
				state.message2 = action.payload;
			});
	}
});

export default studentSlice.reducer;
