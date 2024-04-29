// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Col, Row, Container, Tab, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import sub components
import CourseCard from 'components/marketing/pages/courses/CourseCard';

import courseService from '../../../dashboard/features/courses/courseService';
import Spinner from '../../../Spinner';

const MostPopularCourses = () => {
	const tabs = ['Development', 'Design', 'Marketing', 'Business', 'Health'];

	let min, max = 0;
    const { data: courses, isLoading } = useQuery('courses', courseService.getCourses);

    if (isLoading) {
        return <Spinner />;
    }

    const AllCoursesData = courses || []; // Setting a default value if courses is undefined


	return (
		<Fragment>
			<section className="pb-lg-14 pb-8 bg-white">
				<Container>
					<Row>
						<Col xs={12} md={6}>
							<div className="mb-6">
								<h2 className="mb-1 h1">Most Popular Courses</h2>
								<p>
									These are the most popular courses among DaruurLMS Courses.
								</p>
							</div>
						</Col>
						<Col md={6} xs={12} className="text-md-end mt-4 mt-md-0">
								<Link to="/marketing/allcourses/" className="btn btn-primary">
									View More
								</Link>
							</Col>
					</Row>
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
														.slice(0, 8)
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
			</section>
		</Fragment>
	);
};

export default MostPopularCourses;
