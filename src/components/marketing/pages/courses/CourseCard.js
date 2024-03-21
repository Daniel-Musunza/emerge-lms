// import node module libraries
import { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
import { fetchStudentData } from 'store/studentSlices';

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
		const dispatch = useDispatch();

		const { studentData } = useSelector((state) => state.students);
		const { user } = useSelector(
			(state) => state.auth
		);
		const AddToBookmark = async (e) => {
			e.preventDefault();
			const bookmarkData = {
				courseId: item?.id,
				studentId: studentData?.data?.id
			}
			await dispatch(bookmarkCourse(bookmarkData));
			toast("Course Added to Bookmark");
		};
		const courseURL = `/marketing/courses/course-resume/${item?.content?.id}/${item?.id}`;

		useEffect(() => {
			dispatch(fetchStudentData());

		}, [dispatch]);
		return (
			<Card className={`mb-4 card-hover ${extraclass}`}>
				<Link to={user ? courseURL : '#'}  style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
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

						{/* Card body  */}
						<Card.Body>
							<h3 className="h4 mb-2 text-truncate-line-2 ">
								<Link to={link} className="text-inherit">
									{item.name}
								</Link>
							</h3>
							<ListGroup as="ul" bsPrefix="list-inline" className="mb-3">
								{/* <ListGroup.Item as="li" bsPrefix="list-inline-item">
							<i className="far fa-clock me-1"></i>
							{item.duration}
						</ListGroup.Item> */}
								<ListGroup.Item as="li" bsPrefix="list-inline-item">
									{/* <LevelIcon level={item.level} /> */}
									<div style={{ height: '50px', display: 'flex' }}><h5 style={{ color: 'purple' }}>Category: </h5> <span style={{ paddingLeft: '10px' }}>{item.category}</span></div>

								</ListGroup.Item>
							</ListGroup>
							<div className={`lh-1 d-flex align-items-center`}>
								<div className="description">
									{item.description.length > 35 ? item.description.slice(0, 35) : item.description}
								</div>

								{/* <span className="text-warning me-1 mb-1">
							<Ratings rating={item.rating} size="0.92rem" />
						</span>
						<span className="text-warning me-1"> {item.rating.toFixed(1)}</span>
						<span className="fs-6 text-muted">
							{' '}
							({numberWithCommas(item.ratingby)})
						</span> */}
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
					
						<Col xs="auto">
							<GKTippy content="Add to Bookmarks" onClick={AddToBookmark}>
								<div>
									<i className="fe fe-bookmark"></i>
								</div>
							</GKTippy>
						</Col>
					</Row>
					<span className={`${showprogressbar ? '' : 'd-none'}`}>
						{' '}
						<ProgressBar
							variant="success"
							now={item.progress}
							className="mt-3"
							style={{ height: '5px' }}
						/>
					</span>
				</Card.Footer>
				<Card.Footer>
				<Link content="View Single Course" to={`/marketing/courses/course-single/${item?.content?.id}/${item?.id}`}>
					<Row className="align-items-center g-0">
						<Col xs="auto">
							
								<div>
									View Single Course
								</div>
							
						</Col>
					</Row>
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
