import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	admin: null,
};
export const analyticSlice = createSlice({
	name: 'analytics',
	initialState,
	reducers: {
		loadAdminAnalytics: (state, action) => {
			state.admin = action.payload;
		},
	}
});

export default analyticSlice.reducer;

export const { loadAdminAnalytics } =
	analyticSlice.actions;
export const getAdminAnalytics = (state) => state.analytics.admin;

