// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Col, Row, Container, Tab, Nav, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';


// import popup youtube video
import ModalVideo from 'react-modal-video';

// import custom components
import GKAccordionDefault from 'components/marketing/common/accordions/GKAccordionDefault';
import Ratings from 'components/marketing/common/ratings/Ratings';
import GKTippy from 'components/elements/tooltips/GKTippy';

// import sub components
import CourseCard from '../CourseCard';

// import sub components tabs
import ReviewsTab from './ReviewsTab';
import DescriptionTab from './DescriptionTab';
import TranscriptTab from './TranscriptTab';
import FAQTab from './FAQTab';

// import media files
import CheckedMark from 'assets/images/svg/checked-mark.svg';
import CourseJavascript from 'assets/images/course/course-javascript.jpg';
import Avatar1 from 'assets/images/avatar/avatar-1.jpg';

import {
	bookmarkCourse
} from '../../../../dashboard/features/courses/courseSlice';

import courseService from '../../../../dashboard/features/courses/courseService';
import courseModuleService from '../../../../dashboard/features/courseModules/courseModuleService';
import studentAction from 'store/studentAction';

import Spinner from '../../../../Spinner';
// import data files
import { CourseIndex } from 'data/marketing/CourseIndexData';
import NavbarMegaMenu from 'layouts/marketing/navbars/mega-menu/NavbarMegaMenu';

const CourseSingle = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	let userStore = localStorage.getItem('user');
	let { id, courseId } = useParams();
	const token = userStore?.data?.accessToken;

	const { data: courseModules } = useQuery(
		['courseModules', id], // Include id and token in the query key
		() => courseModuleService.getcourseModules(id) // Pass a function that returns the data
	);

	const { data: studentData } = useQuery(
		['studentData', token], // Include id and token in the query key
		() => studentAction.getStudentData(token) // Pass a function that returns the data
	);

	const { data: courses, isLoading } = useQuery(
		'courses', // The query key
		courseService.getCourses // Fetch function
	);

	const { courseContents } = useSelector(
		(state) => state.courseContents
	);

	const [isOpen, setOpen] = useState(false);
	const [YouTubeURL] = useState('JRzWRZahOVU');
	const AllCoursesData = courses;

	const thisCourse = AllCoursesData?.data?.courses.find((course) => {

		return course?.id === courseId;
	});


	const selectContent = async (content, e) => {
		e.preventDefault();
		return
	};

	const AddToBookmark = async (e) => {
		e.preventDefault();
		const bookmarkData = {
			courseId: courseId,
			studentId: studentData?.data?.id
		}
		await dispatch(bookmarkCourse(bookmarkData));
		toast("Course Added to Bookmark");
	};

	if (isLoading) {
		return <Spinner />
	}

	return (
		<Fragment>
			<NavbarMegaMenu />
			{/* Page header */}
			<section className="pt-lg-8 pb-lg-16 pt-8 pb-12 bg-primary">
				<Container>

					<Row className="align-items-center">
						<Col xl={7} lg={7} md={12} sm={12}>
							<div>
								<h1 className="text-white display-4 fw-semi-bold">
									Getting Started with {thisCourse?.name}
								</h1>
								<p className="text-white mb-6 lead">
									{thisCourse?.description}
								</p>
								<div className="d-flex align-items-center">
									<GKTippy content="Add to Bookmarks" >
										<div
											className="bookmark text-white text-decoration-none"
											onClick={AddToBookmark}
										>
											<i className="fe fe-bookmark text-white-50 me-2"></i>
											Bookmark
										</div>
									</GKTippy>
									<span className="text-white ms-3">
										<i className="fe fe-user text-white-50"></i> 1200 Enrolled{' '}
									</span>
									<span className="ms-4">
										<span className="text-warning">
											<Ratings rating={4.5} />
											<span className="text-white ms-1">(140)</span>
										</span>
									</span>
									<span className="text-white ms-4 d-none d-md-block">
										<svg
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<rect
												x="3"
												y="8"
												width="2"
												height="6"
												rx="1"
												fill="#DBD8E9"
											></rect>
											<rect
												x="7"
												y="5"
												width="2"
												height="9"
												rx="1"
												fill="#DBD8E9"
											></rect>
											<rect
												x="11"
												y="2"
												width="2"
												height="12"
												rx="1"
												fill="#DBD8E9"
											></rect>
										</svg>{' '}
										<span className="align-middle">Intermediate</span>
									</span>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
			{/* Page content */}
			<section className="pb-10">
				<Container>
					<Row>
						<Col lg={8} md={12} sm={12} className="mt-n8 mb-4 mb-lg-0">
							<Tab.Container defaultActiveKey="contents">
								<Card>
									<Nav className="nav-lb-tab">
										{[
											'Contents',

										].map((item, index) => (
											<Nav.Item key={index}>
												<Nav.Link
													href={`#${item.toLowerCase()}`}
													eventKey={item.toLowerCase()}
													className="mb-sm-3 mb-md-0"
												>
													{item}
												</Nav.Link>
											</Nav.Item>
										))}
									</Nav>
									<Card.Body className="p-0">
										<Tab.Content>
											<Tab.Pane eventKey="contents" className="pb-4 pt-3 px-4">
												{/* Course Index Accordion */}
												<GKAccordionDefault
													accordionItems={courseModules}
													courseContents={courseContents}
													selectContent={selectContent}
													itemClass="px-0"
												/>
											</Tab.Pane>

										</Tab.Content>
									</Card.Body>
								</Card>
							</Tab.Container>
						</Col>
						<Col lg={4} md={12} sm={12} className="mt-lg-n22">
							{/* Card */}
							<Card className="mb-3 mb-4">
								<div className="p-1">
									<div
										className="d-flex justify-content-center position-relative rounded py-10 border-white border rounded-3 bg-cover"
										style={{
											background: `url(${thisCourse?.image})`,
											backgroundRepeat: 'no-repeat',
											backgroundSize: 'cover',
											backgroundPosition: 'top center'
										}}
									>
										<Link
											to="#"
											className="popup-youtube icon-shape rounded-circle btn-play icon-xl text-decoration-none"
											onClick={() => setOpen(true)}
										>
											<i className="fe fe-play"></i>
										</Link>
									</div>
								</div>
								{/* video popup */}
								<ModalVideo
									channel="youtube"
									autoplay
									isOpen={isOpen}
									videoId={YouTubeURL}
									onClose={() => setOpen(false)}
								/>
								{/* end of video popup */}

								{/* Card body */}
								<Card.Body>
									{/* Price single page */}
									<div className="mb-3">
										<span className="text-dark fw-bold h2 me-2">${thisCourse?.price}</span>
										<del className="fs-4 text-muted">${thisCourse?.price + 200}</del>
									</div>
									<div className="d-grid">
										<Link to="#" className="btn btn-primary mb-2  ">
											Start Free Month
										</Link>
										<Link
											to="/marketing/pages/pricing/"
											className="btn btn-outline-primary"
										>
											Get Full Access
										</Link>
									</div>
								</Card.Body>
							</Card>
							{/* Card */}
							<Card className="mb-4">
								{/* Card header */}
								<Card.Header>
									<h4 className="mb-0">What’s included</h4>
								</Card.Header>
								{/* Card Body */}
								<Card.Body className="p-0">
									<ListGroup variant="flush">
										<ListGroup.Item>
											<i className="fe fe-play-circle align-middle me-2 text-primary"></i>
											12 hours video
										</ListGroup.Item>
										<ListGroup.Item>
											<i className="fe fe-award me-2 align-middle text-success"></i>
											Certificate
										</ListGroup.Item>
										<ListGroup.Item>
											<i className="fe fe-calendar align-middle me-2 text-info"></i>
											12 Article
										</ListGroup.Item>
										<ListGroup.Item>
											<i className="fe fe-video align-middle me-2 text-secondary"></i>
											Watch Offline
										</ListGroup.Item>
										<ListGroup.Item className="bg-transparent">
											<i className="fe fe-clock align-middle me-2 text-warning"></i>
											Lifetime access
										</ListGroup.Item>
									</ListGroup>
								</Card.Body>
							</Card>
							{/* Card */}
							<Card>
								{/* Card body */}
								<Card.Body>
									<div className="d-flex align-items-center">
										<div className="position-relative">
											<Image
												src={thisCourse?.tutorImage}
												alt=""
												className="rounded-circle avatar-xl"
											/>
											<Link
												to="#"
												className="position-absolute mt-2 ms-n3"
												data-bs-toggle="tooltip"
												data-placement="top"
												title="Verifed"
											>
												<Image
													src={CheckedMark}
													alt=""
													height="30"
													width="30"
												/>
											</Link>
										</div>
										<div className="ms-4">
											<h4 className="mb-0">{thisCourse?.tutorName}</h4>
											<p className="mb-1 fs-6">{thisCourse?.category}</p>
											<span className="fs-6">
												<span className="text-warning">4.5</span>
												<span className="mdi mdi-star text-warning me-2"></span>
												Instructor Rating
											</span>
										</div>
									</div>
									<Row className="border-top mt-3 border-bottom mb-3 g-0">
										<Col>
											<div className="pe-1 ps-2 py-3">
												<h5 className="mb-0">11,604</h5>
												<span>Students</span>
											</div>
										</Col>
										<Col className="border-start">
											<div className="pe-1 ps-3 py-3">
												<h5 className="mb-0">32</h5>
												<span>Courses</span>
											</div>
										</Col>
										<Col className="border-start">
											<div className="pe-1 ps-3 py-3">
												<h5 className="mb-0">12,230</h5>
												<span>Reviews</span>
											</div>
										</Col>
									</Row>
									<p>

									</p>

								</Card.Body>
							</Card>
						</Col>
					</Row>
					{/* Card */}
					<div className="pt-12 pb-3">
						<Row className="d-md-flex align-items-center mb-4">
							<Col lg={12} md={12} sm={12}>
								<h2 className="mb-0">Related Courses</h2>
							</Col>
						</Row>
						<Row>
							{AllCoursesData?.data?.courses.filter(function (datasource) {
								return datasource;
							})
								.slice(0, 4)
								.map((item, index) => (

									<Col lg={3} md={6} sm={12} key={index}>
										<Link to={`/marketing/courses/course-single/${item?.content?.id}`} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
											<CourseCard item={item} />
										</Link>
									</Col>

								))}
						</Row>
					</div>
				</Container>
			</section>
		</Fragment>
	);
};

export default CourseSingle;
