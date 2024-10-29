// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from 'react-query';

import { Card, Badge, Form, Row, Col } from 'react-bootstrap';
import GKTippy from 'components/elements/tooltips/GKTippy';
// import profile layout wrapper
import ProfileLayout from 'components/marketing/student/ProfileLayout';
import courseService from '../../dashboard/features/courses/courseService';

import { payCourse } from '../../dashboard/features/courses/courseSlice';

const Subscriptions = () => {

	const dispatch = useDispatch()

	const [AutoRenewalState, setAutoRenewalState] = useState(true);
	const { user } = useSelector(
		(state) => state.auth
	);

    const [courses, setCourses] = useState(null);
    const [coursesLoading, setCoursesLoading] = useState(true);
    const [bookmarkedCourses, setBookmarkedCourses] = useState(null);

	// Fetch courses data
	useEffect(() => {

		const fetchCourses = async () => {

			try {
				const response = await courseService.getCourses();
				setCourses(response.data.courses);
			} catch (error) {
				console.error('Failed to fetch courses:', error);
			} finally {
				setCoursesLoading(false);
			}

		};

		fetchCourses();

	}, []);


	const token = user?.data?.accessToken;

	const studentData = JSON.parse(localStorage.getItem('studentData'));

	const dashboardData = {
		avatar: `${studentData?.data?.profilePicture}`,
		name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
		linkname: 'Account Settings',
		link: '/marketing/student/student-edit-profile/'
	};

	const studentId = studentData?.data?.id;

	// Fetch bookmarked courses data
	useEffect(() => {
		if (token && studentId) {
			const fetchBookmarkedCourses = async () => {
				try {
					const response = await courseService.getBookmarkedCourses(token, studentId);
					setBookmarkedCourses(response.data);
				} catch (error) {
					console.error('Failed to fetch bookmarked courses:', error);
				}
			};

			fetchBookmarkedCourses();
		}
	}, [token, studentId]);

	let bookmarkedIDs = bookmarkedCourses?.map(course => course.course.id);
	
	const [visiblePaymentSections, setVisiblePaymentSections] = useState({});

	const [paymentProgress, setPaymentProgress] = useState(false);

	const togglePaymentSection = (courseId) => {
		setVisiblePaymentSections(prevState => ({
			...prevState,
			[courseId]: !prevState[courseId]
		}));
	};

	const setMpesaPhone = (courseId, phoneNumber) => {
		setVisiblePaymentSections(prevState => ({
			...prevState,
			[courseId]: {
				...prevState[courseId],
				phoneNumber
			}
		}));
	};

	const formatPhoneNumber = (phoneNumber) => {
		if (!phoneNumber) return '';

		// Case 1: Phone number starts with 07********
		if (phoneNumber.startsWith('07')) {
			return `254${phoneNumber.slice(1)}`; // Convert 07******** to 2547********
		}

		// Case 2: Phone number starts with 01********
		if (phoneNumber.startsWith('01')) {
			return `254${phoneNumber.slice(1)}`; // Convert 01******** to 2541********
		}

		// Case 3: Phone number starts with +254*********
		if (phoneNumber.startsWith('+254')) {
			return phoneNumber.slice(1); // Convert +254********* to 254*********
		}

		// Default case: return the phone number as is
		return phoneNumber;
	};

	const HandleCoursePayment = async (e, courseId) => {
		e.preventDefault();
		setPaymentProgress(true);

		if (studentId) {
			const paymentData = {
				courseId: courseId,
				mpesaPhone: formatPhoneNumber(visiblePaymentSections[courseId]?.phoneNumber),
				studentId: studentId,
			};

			try {
				const response = await dispatch(payCourse(paymentData));
				// Assuming your action returns a response object with a success property
				if (response.success) {
					toast.success("Course Paid Successfully");
				} else {
					toast.error(response.message);
				}
			} catch (error) {
				// Handle error from the action and display a meaningful message
				console.error("Error occurred during payment:", error);
				toast.error(`Failed: ${error.message || "An unexpected error occurred during payment."}`);
			} finally {
				setPaymentProgress(false);
			}
		} else {
			setPaymentProgress(false);
			toast.error("Failed!! Please login");
			navigate('/authentication/sign-in');
		}
	};


	return (
		<ProfileLayout dashboardData={dashboardData}>
			<Card className="border-0">
				<Card.Header className="d-lg-flex justify-content-between align-items-center">
					<div className="mb-3 mb-lg-0">
						<h3 className="mb-0">My Subscriptions</h3>
						<p className="mb-0">
							Here is list of Courses that you have subscribed.
						</p>
					</div>
					{/* <div>
						<Link
							to="/marketing/pages/pricing/"
							className="btn btn-success btn-sm"
						>
							Upgrade Now — Go Pro $39.00
						</Link>
					</div> */}
				</Card.Header>
				<Card.Body>
					{courses?.filter((item) => bookmarkedIDs?.includes(item.id))
						.map((sub, index) => (
							<div className="border-bottom pt-5" key={index}>
								<Row className="mb-4">
									<Col lg={8} md={9} sm={7} className="mb-2 mb-lg-0">
										<span className="d-block">
											<span className="h4">{sub?.name}</span>{' '}
											<Badge bg="success" className="ms-2">
												Active
											</Badge>
										</span>
										<p className="mb-0 fs-6">Subscription ID: {sub.id}</p>
									</Col>
									<Col lg={4} md={3} sm={5} className="mb-2 mb-lg-0">
										{visiblePaymentSections[sub.id] ? (
											<>
												<button
													style={{
														padding: '5px 10px',
														backgroundColor: '#007BFF',
														color: 'white',
														border: 'none',
														borderRadius: '10px',
														cursor: 'pointer',
														width: 'fit-content',
													}}
													onClick={() => togglePaymentSection(sub.id)}
												>
													See less
												</button>
												<form
													onSubmit={(e) => HandleCoursePayment(e, sub.id)}
													style={{ marginTop: '20px', width: '200px' }}
												>
													<input
														name="number"
														type="number"
														placeholder="Mpesa Number"
														onChange={(e) => setMpesaPhone(sub.id, e.target.value)}
														style={{
															padding: '5px',
															borderRadius: '5px',
															border: '1px solid #ccc',
															marginBottom: '10px',
															width: '100%',
														}}
													/>
													{paymentProgress ? (
														<div
															style={{
																backgroundColor: '#4CAF50',
																color: 'white',
																padding: '5px 10px',
																borderRadius: '10px',
																textAlign: 'center',
															}}
														>
															Paying...
														</div>
													) : (
														<div
															className="bookmark"
															style={{
																backgroundColor: '#4CAF50',
																color: 'white',
																padding: '5px 10px',
																borderRadius: '10px',
																textAlign: 'center',
																cursor: 'pointer',
															}}
															onClick={(e) => HandleCoursePayment(e, sub.id)}
														>
															Pay Course
														</div>
													)}
												</form>
											</>
										) : (
											<button
												style={{
													padding: '5px 10px',
													backgroundColor: '#007BFF',
													color: 'white',
													border: 'none',
													borderRadius: '10px',
													cursor: 'pointer',
													width: '200px',
												}}
												onClick={() => togglePaymentSection(sub.id)}
											>
												Pay to be certified
											</button>
										)}
									</Col>

								</Row>
								<Row>
									<Col lg={4} md={4} sm={6} className="mb-2 mb-lg-0">
										<span className="fs-6">Started On</span>
										<h6 className="mb-0">
											{sub.updatedAt ?
												new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(sub.updatedAt))
												:
												"N/A"
											}
										</h6>
									</Col>
									<Col lg={4} md={4} sm={6} className="mb-2 mb-lg-0">
										<span className="fs-6">Price</span>
										<h6 className="mb-0">{sub.price}</h6>
									</Col>
									<Col lg={4} md={4} sm={6} className="mb-2 mb-lg-0">
										<span className="fs-6">Access</span>
										<h6 className="mb-0">Certificate</h6>
									</Col>
								</Row>
							</div>
						))}

				</Card.Body>
			</Card>
		</ProfileLayout>
	);
};

export default Subscriptions;
