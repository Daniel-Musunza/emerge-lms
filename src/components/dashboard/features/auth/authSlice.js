import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
	users: [],
	students: [],
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
};

// Register user
export const register = createAsyncThunk(
	'auth/register',
	async (user, thunkAPI) => {
		try {
			return await authService.register(user);
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
//update user
export const updateUser = createAsyncThunk(
	'users/update',
	async (userData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.data.accessToken;
			return await authService.updateUser(userData, token);
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
// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
export const forgotpassword = createAsyncThunk(
	'auth/forgotpassword',
	async (user, thunkAPI) => {
		try {
			return await authService.forgotpassword(user);
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
export const verifyEmail = createAsyncThunk(
	'auth/verifyEmail',
	async (confirmationCode, thunkAPI) => {
		try {
			return await authService.verifyEmail(confirmationCode);
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
export const logout = createAsyncThunk('auth/logout', async () => {
	await authService.logout();
});
export const fetchUsers = createAsyncThunk(
	'users/getAll',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.data.accessToken;
			return await authService.getUsers(token);
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
export const fetchTutors = createAsyncThunk(
	'students/getAll',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.data.accessToken;
			return await authService.getTutors(token);
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
export const authSlice = createSlice({
	name: 'auth',
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
			.addCase(fetchUsers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.users = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(fetchTutors.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchTutors.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.students = action.payload;
			})
			.addCase(fetchTutors.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})

			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(forgotpassword.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(forgotpassword.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(forgotpassword.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(verifyEmail.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(verifyEmail.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(verifyEmail.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			})
			.addCase(updateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.users = action.payload;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	}
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
