// import node module libraries
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import sub components
import HeroAcademy from './HeroAcademy';
import AcademyStats from './AcademyStats';
import MostPopularCourses from './MostPopularCourses';
import BecomeAnInstructor from './BecomeAnInstructor';

const HomeAcademy = () => {
	const navigate = useNavigate();
	const { user } = useSelector(state => state.auth);
	
	useEffect(() => {
       if(user)(
		navigate('/marketing/student/dashboard/')
	   )
    }, [user, navigate]);

	return (
		<Fragment>
			{/* Hero Academy banner section */}
			<HeroAcademy />

			{/* Various acedamy statistics  */}
			<AcademyStats />

			{/* Most Popular Courses */}
			<MostPopularCourses />

			{/* Become an instructor */}
			<BecomeAnInstructor />
		</Fragment>
	);
};
export default HomeAcademy;
