import { useSelector } from 'react-redux';

export const useAuth = () => {
	return useSelector((state) => state.auth.isAuthenticated);
};

export const useTutor = () => {
	return useSelector((state) => state.auth.isTutor);
};

export const useAdmin = () => {
	return useSelector((state) => state.auth.isAdmin);
};
