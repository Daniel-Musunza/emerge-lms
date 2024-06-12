import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import chatService from './chatService';

const initialState = {
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
};


export const postMessage = createAsyncThunk(
	'message/send',
	async (Data, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.data.accessToken;
			return await chatService.postMessage(token, Data);
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

export const chatSlice = createSlice({
	name: 'chat',
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
			.addCase(postMessage.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(postMessage.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(postMessage.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			
	}
});

export const { reset } = chatSlice.actions;
export default chatSlice.reducer;