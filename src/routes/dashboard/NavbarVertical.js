// import node module libraries
import React, { Fragment, useContext, useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	Row, Col, Container, Nav, Navbar, useAccordionButton, AccordionContext, ListGroup,
	Accordion,
	Card,
	Image,
	Badge,
} from 'react-bootstrap';


import { logout } from '../../../src/components/dashboard/features/auth/authSlice';
import courseService from '../../../src/components/dashboard/features/courses/courseService';
import studentAction from 'store/studentAction';
import courseModuleService from '../../../src/components/dashboard/features/courseModules/courseModuleService';
// import routes file
import {
	DashboardMenu,
	AccountSettingsMenu
} from 'routes/marketing/StudentDashboardMenu';
import { useMediaQuery } from 'react-responsive';

// import simple bar scrolling used for notification item scrolling
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// import media files
import InverseLogo from 'assets/images/brand/logo/emerge-logo-icon.png';
import GiftBox from 'assets/images/background/giftbox.png';

const NavbarVertical = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector(state => state.auth);
	const token = user?.data?.accessToken;

	const [studentData, setStudentData] = useState(null);
	const [courses, setCourses] = useState(null);
	const [paidCourses, setPaidCourses] = useState(null);
	const [openAssignmentSections, toggleAssignments] = useState(false);
	const [openQuizSections, toggleQuizSections] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const studentId = studentData?.data?.id;

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);

			// Fetch student data
			if (token) {
				try {
					const studentResponse = await studentAction.getStudentData(token);
					setStudentData(studentResponse);
				} catch (error) {
					console.error('Error fetching student data:', error);
				}
			}

			// Fetch courses
			try {
				const coursesResponse = await courseService.getCourses();
				setCourses(coursesResponse);
			} catch (error) {
				console.error('Error fetching courses:', error);
			}

			// Fetch paid courses
			if (token && studentId) {
				try {
					const paidCoursesResponse = await courseService.getPaidCourses(token, studentId);
					setPaidCourses(paidCoursesResponse);
				} catch (error) {
					console.error('Error fetching paid courses:', error);
				}
			}

			setIsLoading(false);
		};

		fetchData();
	}, [token, studentId]);

	if (isLoading) return <p>Loading...</p>;

	let paidIDs = paidCourses?.data?.courseManager?.map(course => course.course.id);

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

	const CourseModules = ({ courseId, courseContentId, studentId }) => {
		const [courseModules, setCourseModules] = useState(null);
		const [courseAnalytics, setCourseAnalytics] = useState(null);

		const fetchCourseData = async () => {
			try {
				const modulesResponse = await courseModuleService.getcourseModules(courseContentId);
				setCourseModules(modulesResponse);

				const courseData = { courseId, studentId };
				const analyticsResponse = await courseService.getCourseAnalytics(token, courseData);
				setCourseAnalytics(analyticsResponse);
			} catch (error) {
				console.error('Error fetching course data:', error);
			}
		};

		useEffect(() => {
			fetchCourseData();
		}, [courseContentId, studentId]);

		const sectionProgress = courseAnalytics?.data?.progress || [];

		const [eventKey, setEventKey] = useState('');
		const { activeEventKey } = useContext(AccordionContext);

		const decoratedOnClick = useAccordionButton(
			eventKey,
			() => callback && callback(eventKey)
		);

		const isCurrentEventKey = activeEventKey === eventKey;

		const CustomToggle = ({ children, eventKey, icon }) => {
			const { activeEventKey } = useContext(AccordionContext);
			const decoratedOnClick = useAccordionButton(eventKey, () =>
				console.log('Event Key : ' + eventKey)
			);
			const isCurrentEventKey = activeEventKey === eventKey;
			return (
				<li className="nav-item">
					<Link
						className="nav-link "
						onClick={decoratedOnClick}
						to="#!"
						data-bs-toggle="collapse"
						data-bs-target="#navDashboard"
						aria-expanded={isCurrentEventKey ? true : false}
						aria-controls="navDashboard"
					>
						{icon ? <i className={`nav-icon fe fe-${icon} me-2`}></i> : ''}{' '}
						{children}
					</Link>
				</li>
			);
		};

		const generateLink = (item) => {
			return (
				<Link
					className={`nav-link ${location.pathname === item.link ? 'active' : ''
						}`}
					to={item.link}
					onClick={(e) =>
						isMobile ? props.onClick(!props.showMenu) : props.showMenu
					}
				>
					{item.name}
					{''}
					{item.badge ? (
						<Badge
							className="ms-1"
							bg={item.badgecolor ? item.badgecolor : 'primary'}
						>
							{item.badge}
						</Badge>
					) : (
						''
					)}
				</Link>
			);
		};

		const isMobile = useMediaQuery({ maxWidth: 767 });

		return (
			<ul>
				{courseModules?.data?.sections.map((section, index) => (
					<li key={index}>
						<Link to={`/marketing/student/quiz/${section.id}`} style={{ textDecoration: 'none' }}>
							{section.title}
						</Link>
					</li>
				))}
			</ul>
		);
	};


	return (
		<div style={{ backgroundColor: '#fff', width: '100%' }}>

			<div className="nav-scroller">
				<Link className="navbar-brand" to="/dashboard/overview">
					<Image src={InverseLogo} alt="" />
				</Link>
			</div>
			{/* Dashboard Menu */}
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
													.filter((item) => (item.id === "f8514c08-9cda-4a8a-8bbd-27e699cc1108") || (item.id === "759b9889-6912-4087-9930-edf210f378ad"))
													// .filter((item) => paidIDs?.includes(item.id))
													.map((x) => (
														<Fragment key={x.id}>
															<li><Link to={`/marketing/assignments/${x.id}/${x.name}`}>{x.name}</Link></li>
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
													.filter((item) => (item.id === "f8514c08-9cda-4a8a-8bbd-27e699cc1108") || (item.id === "759b9889-6912-4087-9930-edf210f378ad"))
													// .filter((item) => paidIDs?.includes(item.id))
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
								>
									<Link to="/dashboard/chat" className="nav-link">
										<i className={`fe fe-bell nav-icon`}></i>
										Chat
									</Link>
								</Nav.Item>




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


		</div>

	);
};

export default NavbarVertical;
