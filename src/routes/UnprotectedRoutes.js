import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import paths from './paths';
import { useAuth, useTutor } from 'hooks/useRoles';

const UnAuthRoute = ({ elementCustom }) => {
	const isAuthenticated = useAuth();
	const isTutor = useTutor();
	console.log(isTutor);

	return !isAuthenticated ? (
		<>{elementCustom}</>
	) : isTutor ? (
		<Navigate to={paths.studentdash} />
	) : (
		<Navigate to={paths.admindash} />
	);
};

export default UnAuthRoute;
