// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row, Nav, Tab, Card, Container } from 'react-bootstrap';

// import custom components
import CourseCard from 'components/marketing/pages/courses/CourseCard';
import ProfileCover from 'components/marketing/common/headers/ProfileCover';


import { fetchStudentData } from 'store/studentSlices';
import { useDispatch, useSelector } from 'react-redux';

import {
	fetchCourses
} from '../../dashboard/features/courses/courseSlice';

import Spinner from '../../Spinner';
// import data files
// import { AllCoursesData } from 'data/slider/AllCoursesData';

const StudentDashboard = () => {
	const tabs = ['Development', 'Design', 'Marketing', 'Business', 'Health'];
	let min,
		max = 0;

	const navigate = useNavigate();
	let userStore = localStorage.getItem('user');
	const dispatch = useDispatch();

	const {  studentData } = useSelector((state) => state.students);
	const { courses, isLoading, isError, message } = useSelector(
		(state) => state.courses
	);

	const AllCoursesData = courses;
	console.log(AllCoursesData);
	
	useEffect(() => {
		if (!userStore) {
			navigate('/authentication/sign-in');
		}
		dispatch(fetchStudentData());
		dispatch(fetchCourses());
	}, [dispatch, userStore, navigate]);

	const dashboardData = {
		avatar: `${studentData?.data?.profilePicture}`,
		name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
		username: `${studentData?.data?.contactNumber}`,
		linkname: 'Account Setting',
		link: '/marketing/student/student-edit-profile/',
		verified: false,
		outlinebutton: false,
		level: 'Beginner'
	}

	if ( isLoading) {
		return <Spinner />
	}
	return (
		<Fragment>
			<section className="pt-5 pb-5">
				<Container>
					{/* User info */}
					<ProfileCover dashboardData={dashboardData} />

					{/* Content */}
					<Row>
						<Col md={12}>
							<Tab.Container defaultActiveKey="Development">

								<Tab.Content>
									{tabs.map((tab, index) => {
										min = Math.floor(Math.random() * 16);
										max = min + 8;
										return (
											<Tab.Pane
												eventKey={tab}
												className="pb-4 p-4 ps-0 pe-0"
												key={index}
											>
												<Row>
													{AllCoursesData?.data?.courses.filter(function (datasource) {
														return datasource;
													})
														.map((item, index) => (
															<Col lg={3} md={6} sm={12} key={index}>
																<CourseCard item={item} />
															</Col>
														))}
												</Row>
											</Tab.Pane>
										);
									})}
								</Tab.Content>
							</Tab.Container>
						</Col>
					</Row>
				</Container>
			</section >
		</Fragment >
	);
};
export default StudentDashboard;
