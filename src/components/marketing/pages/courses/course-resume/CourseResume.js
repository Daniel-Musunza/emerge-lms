
import React, { useState, useEffect, Fragment, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row, Container, Card, Dropdown } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// import custom components
import GKTippy from 'components/elements/tooltips/GKTippy';
import GKYouTube from 'components/marketing/common/video/GKYouTube';
import GKAccordionDefault from 'components/marketing/common/accordions/GKAccordionDefault';
import NavbarDefault from 'layouts/marketing/navbars/NavbarDefault';
import courseModuleService from '../../../../dashboard/features/courseModules/courseModuleService';

import {
	bookmarkCourse
} from '../../../../dashboard/features/courses/courseSlice';

import courseService from '../../../../dashboard/features/courses/courseService';
import studentAction from 'store/studentAction';

import Spinner from '../../../../Spinner';
import PDFViewer from './PDFViewer';

// import data
// import { CourseIndex } from 'data/marketing/CourseIndexData';

// The forwardRef is important!!





export const CourseResume = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id, courseId } = useParams();
	const { user } = useSelector(
		(state) => state.auth
	);

	const token = user?.data.accessToken;

	const studentData = JSON.parse(localStorage.getItem('studentData'));

	const studentId = studentData?.data?.id;

	const [bookmarkedCourses, setBookmarkedCourses] = useState([]);

	useEffect(() => {
	  const fetchBookmarkedCourses = async () => {
		if (token && studentId) {
		  try {
			setIsLoading(true);
			const response = await courseService.getBookmarkedCourses(token, studentId);
			setBookmarkedCourses(response || []);
		  } catch (error) {
			console.error('Error fetching bookmarked courses:', error);
		  } finally {
			setIsLoading(false);
		  }
		}
	  };
  
	  fetchBookmarkedCourses();
	}, [token, studentId]);

	const bookmarkedIDs = bookmarkedCourses?.data?.courseManager?.map(course => course.course.id);

	useEffect(() => {
		if (!user) {
			navigate('/authentication/sign-in');
		} else if (bookmarkedIDs && !bookmarkedIDs.includes(courseId)) {
			toast.error("Please start the course first!");
			navigate(`/marketing/courses/course-single/${id}/${courseId}`);
		}
	}, [user, bookmarkedIDs, id, courseId, navigate]);


	const queryKey = useMemo(() => ['courseModules', token, id], [token, id]);

	const [courseModules, setCourseModules] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
  
	useEffect(() => {
	  const fetchCourseModules = async () => {
		if (token && id) {
		  try {
			setIsLoading(true);
			const response = await courseModuleService.getcourseModules(token, id);
			setCourseModules(response || []);
		  } catch (error) {
			console.error('Error fetching course modules:', error);
		  } finally {
			setIsLoading(false);
		  }
		}
	  };
  
	  fetchCourseModules();
	}, [token, id]);

	const { courseContents } = useSelector(
		(state) => state.courseContents
	);

	const [selectedContent, setSelectedContent] = useState(null);
	const [selectedItemId, setSelectedItemId] = useState(null);

	const [YouTubeURL, setYouTubeURL] = useState('');

	const extractVideoId = (url) => {
		// Regular expression to match the YouTube video ID
		const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/;
		const match = url?.match(regex);

		if (match && match[1]) {
			return match[1];
		} else {
			return null;
		}
	};

	const selectContent = async (content, e) => {
		e.preventDefault();

		if (content) {
			const newURL = await extractVideoId(content?.video);

			setSelectedContent(content);

			if (newURL) {
				setYouTubeURL(newURL);
			}
		} else {
			toast("No video present");
		}
	};

	const [read, setRead] = useState(localStorage.getItem(selectedContent?.id) || false); // Initialize read as false initially
	const [pdfUrl, setPdfUrl] = useState(null); // Initialize read as false initially
	const [fullScreen, setFullScreen] = useState(null);

	// Function to handle the click event and set read to true
	const handleLinkClick = (event) => {
		event.preventDefault(); // Prevents the default behavior of the anchor element
		setRead(true);
		localStorage.setItem(selectedContent?.id, 'true'); // Set the 'read' flag to true in localStorage
		setPdfUrl(selectedContent?.resources[0]); // Open the link in a new tab
	};

	const closePdf = () => {
		setPdfUrl(null);
	}
	const closeScreen = (event) => {
		event.preventDefault();
		setFullScreen(false);
	}
	const openFullScreen = (event) => {
		event.preventDefault();
		setFullScreen(true);
	}

	// Memoize props for ProfileCover component
	const dashboardData = useMemo(() => ({
		avatar: `${studentData?.data?.profilePicture}`,
		name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
		linkname: 'Account Settings',
		link: '/marketing/student/student-edit-profile/'
	}), [studentData]);

	const progressData = useMemo(() => ({
		courseId: courseId,
		courseSectionId: selectedItemId,
		courseSubSectionId: selectedContent?.id,
		pdfread: read,
		studentId: studentData?.data?.id
	}), [courseId, id, selectedContent?.id, read, studentData?.data?.id]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<Fragment>
			<NavbarDefault dashboardData={dashboardData} />
			{fullScreen && (

				<div className="pdf-full-screen" style={{ width: '100%', height: '100%', zIndex: '9999', position: 'absolute' }}>

					<div className="close-full-screen" onClick={closeScreen}>
						<button style={{ backgroundColor: '#6343D8', color: '#fff', border: '1px #6343D8', borderRadius: '5px', width: '100px', height: '30px' }}>Close</button>
					</div>
					<PDFViewer pdfUrl={pdfUrl} />
				</div>
			)}
			<main >
				<section className="mt-4 course-container">
					<Container fluid>
						<Row>
							<Col sm={12} md={12} lg={12}>
								{/*  Tab content  */}
								<div className="content">
									{/*  Video */}
									<div className="d-flex align-items-center justify-content-between mb-4 ">
										<div>
											<h3 className=" mb-0  text-truncate-line-2 small-screen-t-pdf">
												{selectedContent ? (
													<>
														{selectedContent.title} , {selectedContent.description}
													</>
												) : (
													<>
														Section Title
													</>
												)}

											</h3>
										</div>
										{selectedContent?.resources[0] && (
											<>
												{pdfUrl ? (
													<div className='flex flex-col'>
														<div onClick={closePdf}>
															<button style={{ backgroundColor: '#6343D8', color: '#fff', border: '1px #6343D8', borderRadius: '5px', width: '150px', height: '40px' }}>Close PDF</button>

														</div>

														<div onClick={openFullScreen} >
															<h3 style={{ color: '#6343D8', paddingLeft: '10px', cursor: 'pointer' }} className='small-screen-t-pdf view-pdf'>Full Screen</h3>
														</div>
													</div>

												) : (
													<div onClick={handleLinkClick}>
														<h3 style={{ color: '#6343D8', paddingLeft: '10px', cursor: 'pointer' }} className='small-screen-t-pdf view-pdf'>View Notes</h3>
													</div>
												)}

											</>
										)}

									</div>
									<div style={{ height: '80vh', overflowY: 'scroll' }}>
										{pdfUrl && (
											<div
												className="embed-responsive position-relative w-100 d-block overflow-hidden p-0"
												style={{ height: '500px', overflowY: 'scroll' }}
											>
												<PDFViewer pdfUrl={pdfUrl} />
											</div>
										)}

										<div
											className="embed-responsive position-relative w-100 d-block overflow-hidden p-0"
											style={{ height: '600px' }}
										>
											<GKYouTube videoId={YouTubeURL} progressData={progressData} />
										</div>
									</div>
								</div>
							</Col>
						</Row>
					</Container>
				</section>
				{/*  Card */}
				<section className="card course-sidebar mt-6" id="courseAccordion">
					<SimpleBar style={{ maxHeight: '93vh' }}>
						<Card>
							<Card.Header>

								{/* <section className="bg-primary" style={{ padding: '10px', margin: '10px', width: 'fit-content', borderRadius: '5px' }}>
									<Container>

										<Row className="align-items-center">
											<Col xl={7} lg={7} md={12} sm={12}>
												<div>
													<div className="d-flex align-items-center">
														{bookmarkedIDs?.includes(courseId) ? (
															<div className="bookmark text-white text-decoration-none">
																Bookmarked
															</div>
														) : (
															<GKTippy content="Add to Bookmarks" >
																<div
																	className="bookmark text-white text-decoration-none"
																	onClick={AddToBookmark}
																>
																	<i className="fe fe-bookmark text-white-50 me-2"></i>
																	Bookmark
																</div>
															</GKTippy>
														)}

													</div>
												</div>
											</Col>
										</Row>
									</Container>
								</section> */}
								<div className="d-flex gap-1">
									<Link to={`/marketing/student/dashboard/`} className="btn btn-primary mb-2  btn-sm">
										Dashboard
									</Link>
									<div className='mt-2'>
										<i className="fe fe-chevron-right text-grey-50"></i>
									</div>
									<Link to={`/marketing/student/dashboard/`} className="btn btn-primary mb-2  btn-sm  " >
										Course
									</Link>
									<div className='mt-2'>
										<i className="fe fe-chevron-right text-grey-50"></i>
									</div>
									<div className="btn btn-primary mb-2 btn-sm ">
										Content
									</div>
								</div>
								<h4 className="mb-0">Table of Content</h4>
							</Card.Header>
							{/* Course Index Accordion */}
							<GKAccordionDefault
								accordionItems={courseModules}
								courseContents={courseContents}
								selectContent={selectContent}
								selectedItemId={selectedItemId}
								setSelectedItemId={setSelectedItemId}
								courseId={courseId}
							/>
						</Card>
					</SimpleBar>
				</section>

			</main>
		</Fragment>
	);
};

export default React.memo(CourseResume);