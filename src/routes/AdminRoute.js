import { Navigate } from 'react-router-dom';
import paths from './paths';
import { useAdmin, useAuth } from 'hooks/useRoles';

const AdminRoute = ({ elementCustom }) => {
	const isAuthenticated = useAuth();
	const isAdmin = useAdmin();

	console.log(isAdmin);
	return isAuthenticated && isAdmin ? (
		<>{elementCustom}</>
	) : (
		<Navigate to={paths.unauthorized} />
	);
};

export default AdminRoute;
