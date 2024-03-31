// import node module libraries
import React, { Fragment, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Col, Row, Nav, Tab, Card, Container } from 'react-bootstrap';

// import custom components
import CourseCard from 'components/marketing/pages/courses/CourseCard';
import ProfileCover from 'components/marketing/common/headers/ProfileCover';


import studentAction from 'store/studentAction';
import { useSelector } from 'react-redux';

import courseService from '../../dashboard/features/courses/courseService';

import Spinner from '../../Spinner';
// import data files
// import { AllCoursesData } from 'data/slider/AllCoursesData';

const StudentDashboard = () => {
	
	const { user } = useSelector((state) => state.auth);
	const token = user?.data?.accessToken;

	const { data: studentData, isLoading: isLoading2 } = useQuery(
		['studentData', token],
		() => studentAction.getStudentData(token)
	);

	const { data: courses, isLoading } = useQuery(
		['courses'],
		courseService.getCourses
	);

	const dashboardData = useMemo(() => ({
		avatar: `${studentData?.data?.profilePicture}`,
		name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
		username: `${studentData?.data?.contactNumber}`,
		linkname: 'Account Setting',
		link: '/marketing/student/student-edit-profile/',
		verified: false,
		outlinebutton: false,
		level: 'Beginner'
	}), [studentData]);

	if (isLoading) {
		return <Spinner />; // Render spinner while loading data
	}


	return (
		<Fragment>
			<section className="pt-5 pb-5">
				<Container>
					{/* User info */}
					<ProfileCover dashboardData={dashboardData} isLoading2={isLoading2} />

					{/* Content */}
					<Row>
						<Col md={12}>
							<Row>
								{courses?.data?.courses.filter(function (datasource) {
									return datasource;
								})
									.map((item, index) => (
										<Col lg={3} md={6} sm={12} key={index}>
											<CourseCard item={item} />
										</Col>
									))}
							</Row>
						</Col>
					</Row>
				</Container>
			</section >
		</Fragment >
	);
};

export default React.memo(StudentDashboard);