// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row, Container, Tab, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import sub components
import CourseCard from 'components/marketing/pages/courses/CourseCard';

import {
	fetchCourses
} from '../../../dashboard/features/courses/courseSlice';

import Spinner from '../../../Spinner';
import NavbarMegaMenu from 'layouts/marketing/navbars/mega-menu/NavbarMegaMenu';

const AllCourses = () => {
    const tabs = ['Development', 'Design', 'Marketing', 'Business', 'Health'];
	let min,
		max = 0;


	const navigate = useNavigate();
	let userStore = localStorage.getItem('user');
	const dispatch = useDispatch();

	const { courses, isLoading, isError, message } = useSelector(
		(state) => state.courses
	);

	const AllCoursesData = courses || [{},{},{},{}];

	useEffect(() => {

		dispatch(fetchCourses());

	}, [dispatch, userStore, navigate]);

	// if (isLoading) {
	// 	return <Spinner />
	// }
	return (
		<Fragment>
            <NavbarMegaMenu />
			<section className="pb-lg-14 pb-8 bg-white">
				<Container>
					<Row>
						<Col xs={6}>
							<div className="mb-6">
								<h2 className="mb-1 h1">All Courses</h2>
								<p>
									These are all DaruurLMS Courses.
								</p>
							</div>
						</Col>
						
					</Row>
					{isLoading && (
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
													<h3 style={{textAlign: 'center'}}>Courses Loading ...</h3>
													<Row>
														{AllCoursesData.map((item, index) => (
															<Col lg={3} md={6} sm={12} key={index}>
																<div style={{ width: '100%', height: '400px', border: '1px solid grey', borderRadius: '10px' }}>
																	{/* Add your content here */}
																</div>
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
					)}
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
																<Link to={`/marketing/courses/course-single/${item?.content?.id}`} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>

																	<CourseCard item={item} />
																</Link>
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
			</section>
		</Fragment>
	);
};
export default AllCourses;
