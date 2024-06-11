// import node module libraries
import React, { Fragment, useContext, useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Container, Nav, Navbar, useAccordionButton, AccordionContext } from 'react-bootstrap';


import { logout } from '../../dashboard/features/auth/authSlice';
import courseService from '../../dashboard/features/courses/courseService';
import studentAction from 'store/studentAction';
import courseModuleService from '../../dashboard/features/courseModules/courseModuleService';
// import routes file
import {
	DashboardMenu,
	AccountSettingsMenu
} from 'routes/marketing/StudentDashboardMenu';
import ProfileCover from 'components/marketing/common/headers/ProfileCover';

const ProfileLayout = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const dashboardData = props.dashboardData;

	const { user } = useSelector(state => state.auth);

	const token = user?.data?.accessToken;

	const { data: studentData, isLoading: studentDataLoading } = useQuery(
		['studentData', token],
		() => studentAction.getStudentData(token),
		{
			enabled: !!token, // Only fetch data when token is available
		}
	);

	let studentId = studentData?.data?.id;

	const [openAssignmentSections, toggleAssignments] = useState(false);
	const [openQuizSections, toggleQuizSections] = useState(false);
	const [openChatSections, toggleChatSections] = useState(false);

	const { data: courses, isLoading: coursesLoading } = useQuery(
		['courses'],
		courseService.getCourses
	);

	const { data: paidCourses, isLoading: paidCoursesLoading } = useQuery(
		['paidCourses', token, studentId],
		() => courseService.getPaidCourses(token, studentId)
	);


	let paidIDs = paidCourses?.data?.courseManager?.map(course => course.course.id);


	const SignOut = () => {
		dispatch(logout());
		navigate('/');
	};

	const DisplayModules = () => {
		toggleQuizSections((prev) => !prev); // Use !== instead of ==
	};

	const DisplayAssignments = () => {
		toggleAssignments((prev) => !prev); // Use !== instead of ==
	};

	const DisplayChatCourses = () => {
		toggleChatSections((prev) => !prev); // Use !== instead of ==
	};

	const CourseModules = ({ courseId, courseContentId, studentId }) => {
		const queryKey = useMemo(() => ['courseModules', courseContentId], [courseContentId]);
		const { data: courseModules } = useQuery(
			queryKey,
			() => courseModuleService.getcourseModules(courseContentId)
		);

		const courseData = {
			courseId,
			studentId
		}

		const { data: courseAnalytics } = useQuery(
			['courseAnalytics', token, courseData],
			() => courseService.getCourseAnalytics(token, courseData)
		);

		const sectionProgress = courseAnalytics?.data?.progress || [];
		return (
			<ul>
				{courseModules?.data?.sections.map((y, index) => (
					// <>
					// 	{sectionProgress.some(x => x.section.id === y.id && x.sectionPercentage > 80) ? (
					// 		<li><Link to={`/marketing/student/quiz/${y.id}`} key={index} style={{ textDecoration: 'none' }}> {y.title}</Link></li>
					// 	) : (
					// 		<span style={{ border: 'none', borderRadius: '5px', opacity: 0.5 }}> {y.title}</span>
					// 	)}
					// </>
					<li><Link to={`/marketing/student/quiz/${y.id}`} key={index} style={{ textDecoration: 'none' }}> {y.title}</Link></li>
				))}
			</ul>
		);
	};


	const [eventKey, setEventKey] = useState('');
	const { activeEventKey } = useContext(AccordionContext);

	const decoratedOnClick = useAccordionButton(
		eventKey,
		() => callback && callback(eventKey)
	);

	const isCurrentEventKey = activeEventKey === eventKey;

	return (
		<Fragment>
			<section className="pt-5 pb-5">
				<Container>
					{/* User info */}
					<ProfileCover dashboardData={dashboardData} />

					{/* Content */}
					<Row className="mt-0 mt-md-4">
						<Col lg={3} md={4} sm={12}>
							<Navbar
								expand="lg"
								className="navbar navbar-expand-md navbar-light shadow-sm mb-4 mb-lg-0 sidenav"
							>
								<Link
									className="d-xl-none d-lg-none d-md-none text-inherit fw-bold fs-5 float-start py-1"
									to="#"
								>
									Menu
								</Link>
								<Navbar.Toggle
									aria-controls="basic-navbar-nav"
									className="p-0 focus-none border-0"
									label="Responsive Menu"
								>
									<span
										className="navbar-toggler d-md-none icon-shape icon-sm rounded bg-primary p-0 text-white float-end"
										data-bs-toggle="collapse"
										data-bs-target="#sidenav"
										aria-controls="sidenav"
										aria-expanded="false"
										aria-label="Toggle navigation"
									>
										<span className="fe fe-menu"></span>
									</span>
								</Navbar.Toggle>

								<Navbar.Collapse id="basic-navbar-nav">
									<Nav className="me-auto flex-column" as="ul" activeKey="0">
										<Nav.Item className="navbar-header" as="li">
											SUBSCRIPTION
										</Nav.Item>
										{DashboardMenu.map((item, index) => (
											<Nav.Item
												as="li"
												key={index}
												className={`${item.link === location.pathname ? 'active' : ''
													}`}
											>
												<Link className="nav-link" to={item.link}>
													<i className={`fe fe-${item.icon} nav-icon`}></i>
													{item.title}
												</Link>
											</Nav.Item>
										))}
										<Nav.Item
											as="li"
											onClick={DisplayAssignments}
											style={{ cursor: 'pointer' }}
										>
											<div className="nav-link">
												<i className={`fe fe-help-circle nav-icon`}></i>
												My Assignments
												<span className="chevron-arrow ms-4 mr-0">
													{openAssignmentSections ? (
														<i className="fe fe-chevron-up fs-4"></i>
													) : (
														<i className="fe fe-chevron-down fs-4"></i>
													)}
												</span>
											</div>
										</Nav.Item>
										{openAssignmentSections && (
											<>
												{paidIDs?.length > 0 ? (
													<ul style={{ maxHeight: '400px', overflowY: 'scroll' }}>
														{courses?.data.courses
															// .filter((item) => (item.id === "f8514c08-9cda-4a8a-8bbd-27e699cc1108") || (item.id === "759b9889-6912-4087-9930-edf210f378ad"))
															.filter((item) => (paidIDs?.includes(item.id)) || item.active === true)
															.map((x) => (
																<Fragment key={x.id}>
																	<li><Link to={`/marketing/assignments/${x.id}/${x.name}`} className='text-decoration-none'>{x.name}</Link></li>
																</Fragment>
															))}
													</ul>
												) : (
													<>
														{paidCoursesLoading ? (
															<p style={{ textAlign: 'center' }}>Loading ...</p>
														) : (
															<p style={{ textAlign: 'center', color: 'red' }}>No courses subscribed</p>
														)}
													</>

												)}
											</>
										)}
										<Nav.Item
											as="li"
											onClick={DisplayModules}
											style={{ cursor: 'pointer', width: '100%' }}
										>
											<div className="nav-link" >
												<i className={`fe fe-help-circle nav-icon`}></i>
												My Quiz Attempt
												<span className="chevron-arrow ms-4 mr-0">
													{openQuizSections ? (
														<i className="fe fe-chevron-up fs-4"></i>
													) : (
														<i className="fe fe-chevron-down fs-4"></i>
													)}
												</span>
											</div>
										</Nav.Item>
										{openQuizSections && (
											<>
												{paidIDs?.length > 0 ? (
													<ul style={{ maxHeight: '400px', overflowY: 'scroll' }}>
														{courses?.data.courses
															// .filter((item) => (item.id === "f8514c08-9cda-4a8a-8bbd-27e699cc1108") || (item.id === "759b9889-6912-4087-9930-edf210f378ad"))
															.filter((item) => (paidIDs?.includes(item.id)) || item.active === true)
															.map((x) => (
																<Fragment key={x.id}>
																	<li>{x.name}</li>
																	<CourseModules courseId={x?.id} courseContentId={x?.content.id} studentId={studentId} />
																</Fragment>
															))}
													</ul>
												) : (
													<>
														{paidCoursesLoading ? (
															<p style={{ textAlign: 'center' }}>Loading ...</p>
														) : (
															<p style={{ textAlign: 'center', color: 'red' }}>No courses subscribed</p>
														)}
													</>

												)}
											</>

										)}


										<Nav.Item
											as="li"
											style={{ cursor: 'pointer' }}
											onClick={DisplayChatCourses}
										>
											<div className="nav-link w-full flex justify-space-between">
													<i class="fe fe-message-square nav-icon"></i>
													Course Chat
												<span className="chevron-arrow ms-4 mr-0 pr-0">
													{openChatSections ? (
														<i className="fe fe-chevron-up fs-4"></i>
													) : (
														<i className="fe fe-chevron-down fs-4"></i>
													)}
												</span>
											</div>

										</Nav.Item>

										{openChatSections && (
											<>
												{paidIDs?.length > 0 ? (
													<ul style={{ maxHeight: '400px', overflowY: 'scroll' }}>
														{courses?.data.courses
															// .filter((item) => (item.id === "f8514c08-9cda-4a8a-8bbd-27e699cc1108") || (item.id === "759b9889-6912-4087-9930-edf210f378ad"))
															.filter((item) => (paidIDs?.includes(item.id)) || item.active === true)
															.map((x) => (
																<Link to={`/dashboard/chat/${x.id}/${x.name}`} className='text-decoration-none'>
																	<Fragment key={x.id}>
																		<li>{x.name}</li>
																	</Fragment>
																</Link>

															))}
													</ul>
												) : (
													<>
														{paidCoursesLoading ? (
															<p style={{ textAlign: 'center' }}>Loading ...</p>
														) : (
															<p style={{ textAlign: 'center', color: 'red' }}>No courses subscribed</p>
														)}
													</>

												)}
											</>

										)}


										<Nav.Item className="navbar-header mt-4" as="li">
											ACCOUNT SETTINGS
										</Nav.Item>
										{AccountSettingsMenu.map((item, index) => (
											<Nav.Item
												as="li"
												key={index}
												className={`${item.link === location.pathname ? 'active' : ''
													}`}
											>
												<Link className="nav-link" to={item.link}>
													<i className={`fe fe-${item.icon} nav-icon`}></i>
													{item.title}
												</Link>
											</Nav.Item>
										))}
										<Nav.Item
											as="li"
											onClick={SignOut}
											style={{ cursor: 'pointer' }}
										>
											<div className="nav-link" >
												<i className={`fe fe-power nav-icon`}></i>
												Sign Out
											</div>
										</Nav.Item>
									</Nav>

								</Navbar.Collapse>
							</Navbar>
						</Col>

						<Col lg={9} md={8} sm={12}>
							{props.children}
						</Col>
					</Row>
				</Container>
			</section>
		</Fragment>
	);
};
export default ProfileLayout;
