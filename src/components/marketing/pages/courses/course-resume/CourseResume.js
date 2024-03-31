
import React, { useState, useEffect, Fragment, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
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

	const token = user?.data?.accessToken;

	const studentId = user?.data?.id;
	
	const { data: studentData, isLoading: isLoading2 } = useQuery(
		['studentData', token], // Query key
		() => studentAction.getStudentData(token) // Fetch function
	  );
  
	
	let bookmarkedCourses = [];
	if (token && studentId) {
		const { data } = useQuery(
			'bookmarkedCourses', // The query key
			() => courseService.getBookmarkedCourses(token, studentId), // Fetch function
		);

		bookmarkedCourses = data?.data ?? [];
	}

	let bookmarkedIDs = [];
	if (bookmarkedCourses.length > 0) { // Removed parentheses from length
		bookmarkedIDs = bookmarkedCourses.map(course => course.course.id); // Accessing 'id' from 'course'
	}

	const queryKey = useMemo(() => ['courseModules', id], [id]);

	// Use useQuery hook
	const { data: courseModules, isLoading } = useQuery(
		queryKey,
		() => courseModuleService.getcourseModules(id)
	);


	const { courseContents } = useSelector(
		(state) => state.courseContents
	);

	const [selectedContent, setSelectedContent] = useState(null);

	const [YouTubeURL, setYouTubeURL] = useState('M7lc1UVf-VE');

	const extractVideoId = (url) => {
		// Regular expression to match the YouTube video ID
		const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/;
		const match = url.match(regex);

		if (match && match[1]) {
			return match[1];
		} else {
			return null;
		}
	};

	const selectContent = async (content, e) => {
		e.preventDefault();


		const newURL = await extractVideoId(content.video);

		setSelectedContent(content);

		if (newURL) {
			setYouTubeURL(newURL);
		}

	};

	const AddToBookmark = async (e) => {
		e.preventDefault();
		try {
			const bookmarkData = {
				courseId: courseId,
				studentId: studentData?.data?.id
			}
			console.log(bookmarkData)
			await dispatch(bookmarkCourse(bookmarkData));
			toast.success("Course Added to Bookmarks");
		} catch (err) {
			toast("Failed to Bookmark");
		}
	};
	const [read, setRead] = useState(localStorage.getItem(selectedContent?.id)); // Initialize read as false initially

	// Function to handle the click event and set read to true
	const handleLinkClick = (event) => {
		event.preventDefault(); // Prevents the default behavior of the anchor element
		setRead(true);
		localStorage.setItem(selectedContent?.id, 'true'); // Set the 'read' flag to true in localStorage
		window.open(selectedContent?.resources[0], '_blank'); // Open the link in a new tab
	};


	// Memoize props for ProfileCover component
	const dashboardData = useMemo(() => ({
		avatar: `${studentData?.data?.profilePicture}`,
		name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
		linkname: 'Account Settings',
		link: '/marketing/student/student-edit-profile/'
	}), [studentData]);

	const progressData = useMemo(() => ({
		courseId: courseId,
		courseSectionId: id,
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
			<main>
				<section className="mt-6 course-container">
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
											<div onClick={handleLinkClick}>
												<a href={`${selectedContent.resources[0]}`} target="_blank" rel="noopener noreferrer">
													<h3 style={{ color: 'blue', paddingLeft: '10px' }} className='small-screen-t-pdf view-pdf'>View Notes</h3>
												</a>
											</div>

										)}

									</div>
									<div
										className="embed-responsive position-relative w-100 d-block overflow-hidden p-0"
										style={{ height: '500px' }}
									>
										<GKYouTube videoId={YouTubeURL} progressData={progressData} />
									</div>
								</div>
							</Col>
						</Row>
					</Container>
				</section>
				{/*  Card */}
				<section className="card course-sidebar " id="courseAccordion">
					<SimpleBar style={{ maxHeight: '93vh' }}>
						<Card>
							<Card.Header>

								<section className="bg-primary" style={{ padding: '10px', margin: '10px', width: 'fit-content', borderRadius: '5px' }}>
									<Container>

										<Row className="align-items-center">
											<Col xl={7} lg={7} md={12} sm={12}>
												<div>
													<div className="d-flex align-items-center">
														{bookmarkedIDs.includes(courseId) ? (
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
								</section>
								<h4 className="mb-0">Table of Content</h4>
							</Card.Header>
							{/* Course Index Accordion */}
							<GKAccordionDefault
								accordionItems={courseModules}
								courseContents={courseContents}
								selectContent={selectContent}
							/>
						</Card>
					</SimpleBar>
				</section>

			</main>
		</Fragment>
	);
};

export default React.memo(CourseResume);