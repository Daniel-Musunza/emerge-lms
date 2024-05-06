// import node module libraries
import { Fragment, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Link, useNavigate, } from 'react-router-dom';
import {
	Image,
	Card,
	Row,
	Col,
	ProgressBar,
	ListGroup,
	Badge
} from 'react-bootstrap';

// import custom components
import Ratings from 'components/marketing/common/ratings/Ratings';
import LevelIcon from 'components/marketing/common/miscellaneous/LevelIcon';
import GKTippy from 'components/elements/tooltips/GKTippy';
import { bookmarkCourse } from '../../../dashboard/features/courses/courseSlice';
import courseService from '../../../dashboard/features/courses/courseService';
// import utility file
import { numberWithCommas } from 'helper/utils';
import { useDispatch, useSelector } from 'react-redux';

const CourseCard = ({
	item,
	free,
	viewby,
	showprogressbar,
	extraclass,
	link
}) => {
	/** Used in Course Index, Course Category, Course Filter Page, Student Dashboard etc...  */
	const GridView = () => {
		const navigate = useNavigate();
		const dispatch = useDispatch();
		const user = JSON.parse(localStorage.getItem('user'));
		const studentData = JSON.parse(localStorage.getItem('studentData'));
		const [loading, setLoading] = useState(null);

		let studentId = studentData?.data?.id;
		let bookmarkedIDs = [];
		let paidIDs = [];
		let token = null;
		
		if (user) {
			token = user?.data?.accessToken;

			// const { data: bookmarkedCourses } = useQuery(
		// 	['bookmarkedCourses', token, studentId],
		// 	() => courseService.getBookmarkedCourses(token, studentId),
		// 	{
		// 		enabled: !!studentId,
		// 		onSuccess: (data) => {
		// 			bookmarkedIDs = data?.data?.map(course => course.course.id);
		// 		}
		// 	}
		// );

		// const { data: paidCourses } = useQuery(
		// 	['paidCourses', token, studentId],
		// 	() => courseService.getPaidCourses(token, studentId),
		// 	{
		// 		enabled: !!studentId,
		// 		onSuccess: (data) => {
		// 			paidIDs = data?.data?.map(course => course.course.id);
		// 		}
		// 	}
		// );
		}
	
		

		const AddToBookmark = async (e, courseId) => {
			e.preventDefault();
			setLoading(true);

			const bookmarkData = {
				courseId: courseId,
				studentId: studentId
			};

			try {
				await dispatch(bookmarkCourse(bookmarkData));
				toast.success("Course Added to Bookmarks");
			} catch (error) {
				console.error(error);
				toast.error("Failed to add course to Bookmarks");
			}

			setLoading(false);
		};

		const courseData = {
			courseId: item.id,
			studentId
		};

		const { data: courseAnalytics } = useQuery(
			['courseAnalytics', token, courseData],
			() => courseService.getCourseAnalytics(token, courseData),
			{
				enabled: !!token && paidIDs?.includes(item.id)
			}
		);


		const handleNavigate = (e) => {
			e.preventDefault();
			if ((item.id === "f8514c08-9cda-4a8a-8bbd-27e699cc1108") || (item.id === "759b9889-6912-4087-9930-edf210f378ad")) {
				navigate(`/marketing/courses/course-resume/${item.content.id}/${item.id}`);
			}
		}
		return (

			<Card className={`mb-4 card-hover ${extraclass}`}>
				{/* {paidIDs?.includes(item.id) ? (
					<Link to={user ? courseURL1 : '#'} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
						<>
							{item.image ? (
								<Image
									src={item.image}
									alt=""
									className="card-img-top rounded-top-md"
									style={{ height: '200px' }}
								/>
							) : (
								<Image
									src="noimage.jpg"
									alt=""
									className="card-img-top rounded-top-md"
								/>
							)}

							<Card.Body>
								<h3 className="h4 mb-2 text-truncate-line-2 ">
									<Link to={link} className="text-inherit">
										{item.name}
									</Link>
								</h3>
								<ListGroup as="ul" bsPrefix="list-inline" className="mb-3">
					
									<ListGroup.Item as="li" bsPrefix="list-inline-item">
								
										<div style={{ height: '50px', display: 'flex' }}><h5 style={{ color: 'purple' }}>Category: </h5> <span style={{ paddingLeft: '10px' }}>{item.category}</span></div>

									</ListGroup.Item>
								</ListGroup>
								<div className={`lh-1 d-flex align-items-center`}>
									<div className="description">
										{item.description.length > 35 ? item.description.slice(0, 35) : item.description}
									</div>

							
								</div>
								<div
									className={`lh-1 mt-3 ${free ||
										item.price === undefined ||
										item.price <= 0 ||
										item.discount === undefined
										? 'd-none'
										: ''
										}`}
								>
									<span className="text-dark fw-bold">
										${item.price - item.discount}
									</span>{' '}
									<del className="fs-6 text-muted">Price: ${item.price}</del>
								</div>
							</Card.Body>
						</>
					</Link>
				) : (
					<Link to="" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
						<>
							{item.image ? (
								<Image
									src={item.image}
									alt=""
									className="card-img-top rounded-top-md"
									style={{ height: '200px' }}
								/>
							) : (
								<Image
									src="noimage.jpg"
									alt=""
									className="card-img-top rounded-top-md"
								/>
							)}

							<Card.Body>
								<h3 className="h4 mb-2 text-truncate-line-2 ">
									<Link to={link} className="text-inherit">
										{item.name}
									</Link>
								</h3>
								<ListGroup as="ul" bsPrefix="list-inline" className="mb-3">
								
									<ListGroup.Item as="li" bsPrefix="list-inline-item">
								
										<div style={{ height: '50px', display: 'flex' }}><h5 style={{ color: 'purple' }}>Category: </h5> <span style={{ paddingLeft: '10px' }}>{item.category}</span></div>

									</ListGroup.Item>
								</ListGroup>
								<div className={`lh-1 d-flex align-items-center`}>
									<div className="description">
										{item.description.length > 35 ? item.description.slice(0, 35) : item.description}
									</div>

								</div>
								<div
									className={`lh-1 mt-3 ${free ||
										item.price === undefined ||
										item.price <= 0 ||
										item.discount === undefined
										? 'd-none'
										: ''
										}`}
								>
									<span className="text-dark fw-bold">
										${item.price - item.discount}
									</span>{' '}
									<del className="fs-6 text-muted">Price: ${item.price}</del>
								</div>
							</Card.Body>
						</>
					</Link>
				)} */}

				<Link
					to="#"
					onClick={handleNavigate}
					style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>

					{item.image ? (
						<Image
							src={item.image}
							alt=""
							className="card-img-top rounded-top-md"
							style={{ height: '200px' }}
						/>
					) : (
						<Image
							src="noimage.jpg"
							alt=""
							className="card-img-top rounded-top-md"
						/>
					)}

					{/* Card body  */}
					<Card.Body>
						<h3 className="h4 mb-2 text-truncate-line-2 ">
							<Link to={link} className="text-inherit">
								{item.name}
							</Link>
						</h3>
						<ListGroup as="ul" bsPrefix="list-inline" className="mb-3">

							<ListGroup.Item as="li" bsPrefix="list-inline-item">
								<div style={{ height: '50px', display: 'flex' }}><h5 style={{ color: 'purple' }}>Category: </h5> <span style={{ paddingLeft: '10px' }}>{item.category}</span></div>

							</ListGroup.Item>
						</ListGroup>
						<div className={`lh-1 d-flex align-items-center`}>
							<div className="description">
								{item.description.length > 35 ? item.description.slice(0, 35) : item.description}
							</div>

						</div>
						<div
							className={`lh-1 mt-3 ${free ||
								item.price === undefined ||
								item.price <= 0 ||
								item.discount === undefined
								? 'd-none'
								: ''
								}`}
						>
							<span className="text-dark fw-bold">
								${item.price - item.discount}
							</span>{' '}
							<del className="fs-6 text-muted">Price: ${item.price}</del>
						</div>
					</Card.Body>
				</Link>
				{/* Card Footer */}
				<Card.Footer>
					<Row className="align-items-center g-0">
						<Col xs="auto">
							<Image
								src=""
								className="rounded-circle avatar-xs"
								alt=""
							/>
						</Col>
						<Col className="col ms-2">
							<span>{item.tutorName}</span>
						</Col>

						{bookmarkedIDs && bookmarkedIDs.includes(item?.id) ? (
							<div>
								{/* Display the content for bookmarked courses */}
							</div>
						) : user ? (
							<Col xs="auto" style={{ cursor: 'pointer' }}>
								{loading ? (
									<h4>Bookmarking...</h4>
								) : (
									<GKTippy content="Add to Bookmarks" >
										<div onClick={(e) => AddToBookmark(e, item?.id)}>
											<i className="fe fe-bookmark"></i>
										</div>
									</GKTippy>
								)}
							</Col>
						) : (
							<></>
						)}

					</Row>
					<span className={`${showprogressbar ? '' : 'd-none'}`}>
						{' '}

						<ProgressBar
							variant="success"
							now={courseAnalytics?.data?.coursePercentage}
							className="mt-3"
							style={{ height: '5px' }}
						/>
					</span>
				</Card.Footer>
				<Card.Footer>
					<Link to={`/marketing/courses/course-single/${item?.content?.id}/${item?.id}`}>
						<div>View Single Course</div>
					</Link>
				</Card.Footer>
			</Card>
		);
	};



	return (
		<Fragment>
			<GridView />
		</Fragment>
	);
};

// Specifies the default values for props
CourseCard.defaultProps = {
	free: false,
	viewby: 'grid',
	showprogressbar: false,
	extraclass: '',
	link: '#'
};

// Typechecking With PropTypes
CourseCard.propTypes = {
	item: PropTypes.object.isRequired,
	free: PropTypes.bool,
	viewby: PropTypes.string,
	showprogressbar: PropTypes.bool,
	extraclass: PropTypes.string,
	link: PropTypes.string
};

export default CourseCard;
