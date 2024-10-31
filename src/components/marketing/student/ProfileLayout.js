// import node module libraries
import React, { Fragment, useContext, useState, useMemo, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Container, Nav, Navbar, useAccordionButton, AccordionContext } from 'react-bootstrap';
import { logout } from '../../dashboard/features/auth/authSlice';
import courseService from '../../dashboard/features/courses/courseService';
import studentAction from 'store/studentAction';
import courseModuleService from '../../dashboard/features/courseModules/courseModuleService';
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

	const [studentData, setStudentData] = useState(null);
	const [courses, setCourses] = useState([]);
	const [bookmarkedCourses, setBookmarkedCourses] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [openAssignmentSections, toggleAssignments] = useState(false);
	const [openQuizSections, toggleQuizSections] = useState(false);
	const [openChatSections, toggleChatSections] = useState(false);

	useEffect(() => {
		const fetchAllData = async () => {
			if (!token) return;

			setIsLoading(true);
			// try {
				const [studentResponse, coursesResponse] = await Promise.all([
					studentAction.getStudentData(token),
					courseService.getCourses(),
				]);


				console.log(studentResponse)
				setStudentData(studentResponse);
				setCourses(coursesResponse);

				if (studentResponse) {
					const bookmarkedCoursesResponse = await courseService.getBookmarkedCourses(token, studentResponse?.data.id);

					setBookmarkedCourses(bookmarkedCoursesResponse?.data || []);
				}
			// } catch (error) {
			// 	console.error("Error fetching data:", error);
			// } finally {
			// 	setIsLoading(false);
			// }
		};

		fetchAllData();
	}, [token]);


	let bookmarkedIDs = bookmarkedCourses.map(course => course.course.id);


	const SignOut = async () => {
		await dispatch(logout());
		navigate('/');
	};

	const DisplayModules = () => {
		toggleQuizSections(prev => !prev);
	};

	const DisplayAssignments = () => {
		toggleAssignments(prev => !prev);
	};

	const DisplayChatCourses = () => {
		toggleChatSections(prev => !prev);
	};

	const CourseModules = ({ courseId, courseContentId, studentId }) => {
		const [courseModules, setCourseModules] = useState([]);
		const [courseAnalytics, setCourseAnalytics] = useState({});
		const [isLoadingModules, setIsLoadingModules] = useState(true);

		useEffect(() => {
			let isMounted = true;

			const fetchCourseModules = async () => {
				try {
					const response = await courseModuleService.getcourseModules(token, courseContentId);
					console.log(response)
					if (isMounted) setCourseModules(response?.data || []);
				} catch (error) {
					console.error('Error fetching course modules:', error);
					// Add a user-friendly error handler here if desired
				}
			};

			const fetchCourseAnalytics = async () => {
				const courseData = { courseId, studentId };
				try {
					const response = await courseService.getCourseAnalytics(token, courseData);
					if (isMounted) setCourseAnalytics(response);
				} catch (error) {
					console.error('Error fetching course analytics:', error);
					// Add a user-friendly error handler here if desired
				}
			};

			const fetchAllData = async () => {
				setIsLoadingModules(true);
				await Promise.all([fetchCourseModules(), fetchCourseAnalytics()]);
				if (isMounted) setIsLoadingModules(false);
			};

			fetchAllData();

			return () => {
				isMounted = false; // Cleanup to avoid state updates after unmount
			};
		}, [token, courseContentId]); // Directly use dependencies instead of queryKey


		return (
			<ul>
				{courseModules?.map((y, index) => (
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
										<Nav.Item
											as="li"
											className={`${"/marketing/student/dashboard/" === location.pathname ? 'active' : ''
												}`}
										>
											<Link
												to="/marketing/student/dashboard/"
												className='nav-link'
											>
												<i className={`fe fe-book nav-icon`}></i>
												Dashboard Courses

											</Link>
										</Nav.Item>
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
												{bookmarkedIDs?.length > 0 ? (
													<ul style={{ maxHeight: '400px', overflowY: 'scroll' }}>
														{courses?.data.courses
															.filter((item) => (bookmarkedIDs?.includes(item.id)))
															.map((x) => (
																<Fragment key={x.id}>
																	<li><Link to={`/marketing/assignments/${x.id}/${x.name}`} className='text-decoration-none'>{x.name}</Link></li>
																</Fragment>
															))}
													</ul>
												) : (
													<>
														{isLoading ? (
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
												{bookmarkedIDs?.length > 0 ? (
													<ul style={{ maxHeight: '400px', overflowY: 'scroll' }}>
														{courses?.data.courses
															.filter((item) => (bookmarkedIDs?.includes(item.id)))
															.map((x) => (
																<Fragment key={x.id}>
																	<li>{x.name}</li>
																	<CourseModules courseId={x?.id} courseContentId={x?.content.id} studentId={studentId} />
																</Fragment>
															))}
													</ul>
												) : (
													<>
														{isLoading ? (
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
											{console.log(bookmarkedIDs)}
												{bookmarkedIDs?.length > 0 ? (
													<ul style={{ maxHeight: '400px', overflowY: 'scroll' }}>
														{courses?.data.courses
															.filter((item) => (bookmarkedIDs?.includes(item.id)))
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
														{isLoading ? (
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
