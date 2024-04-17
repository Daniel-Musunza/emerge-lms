import React, { Fragment } from 'react';
import { useQuery } from 'react-query';
import { Col, Row, Nav, Tab, Card, Container } from 'react-bootstrap';
import CourseCard from 'components/marketing/pages/courses/CourseCard';
import ProfileCover from 'components/marketing/common/headers/ProfileCover';
import studentAction from 'store/studentAction';
import { useSelector } from 'react-redux';
import courseService from '../../dashboard/features/courses/courseService';
import Spinner from '../../Spinner';
import StatRightBadge from '../common/stats/StatRightBadge';
import { Link } from 'react-router-dom';
import FooterWithLinks from 'layouts/marketing/footers/FooterWithLinks';

const StudentDashboard = () => {
    const { user } = useSelector(state => state.auth);
    const token = user?.data?.accessToken;

    const { data: studentData, isLoading: studentDataLoading } = useQuery(
        ['studentData', token],
        () => studentAction.getStudentData(token),
        {
            enabled: !!token, // Only fetch data when token is available
        }
    );

    const studentId = studentData?.data?.id;

    const { data: bookmarkedCourses } = useQuery(
        ['bookmarkedCourses', token, studentId],
        () => courseService.getBookmarkedCourses(token, studentId)
    );

    let bookmarkedIDs = bookmarkedCourses?.data.map(course => course.course.id);
    const { data: courses, isLoading: coursesLoading } = useQuery(
        ['courses'],
        courseService.getCourses
    );

    const { data: paidCourses, isLoading: paidCoursesLoading } = useQuery(
        ['paidCourses', token, studentId],
        () => courseService.getPaidCourses(token, studentId)
    );


    let paidIDs = paidCourses?.data.map(course => course.course.id);

    if (studentDataLoading || coursesLoading) {
        return <Spinner />;
    }

    const dashboardData = {
        avatar: `${studentData?.data?.profilePicture}`,
        name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
        contact: `${studentData?.data?.contactNumber}`,
        linkname: 'Account Setting',
        link: '/marketing/student/student-edit-profile/',
        verified: false,
        outlinebutton: false,
        level: 'Beginner'
    };

    return (
        <Fragment>
            <section className="pt-5 pb-5">
                <Container>
                    {/* User info */}
                    <ProfileCover dashboardData={dashboardData} />
                    <Row style={{ marginTop: '20px' }}>
                        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
                            <StatRightBadge
                                title="General Learning progress"
                                subtitle="Recent course score"
                                value="Good Start"
                                badgeValue="0%"
                                colorVariant="success"
                            />
                        </Col>
                        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
                            <StatRightBadge
                                title="Quizes Attempted"
                                subtitle="Quizes to attempt"
                                value="0"
                                badgeValue="0"
                                colorVariant="info"
                            />
                        </Col>
                        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
                            <StatRightBadge
                                title="Courses Subscribed"
                                value={courses?.data?.courses.filter((item) => paidIDs?.includes(item.id)).length}
                                badgeValue="learning"
                                colorVariant="warning"
                            />
                        </Col>
                    </Row>
                    {/* Content */}
                    <Row className="mt-0 mt-md-4">
                        <Col lg={12} md={12} sm={12}>
                            <Row className="mb-6">
                                <Col md={12}>
                                    <Tab.Container defaultActiveKey="subscribed">
                                        <Card className="bg-transparent shadow-none ">
                                            <Card.Header className="border-0 p-0 bg-transparent">
                                                <Nav className="nav-lb-tab">
                                                    <Nav.Item>
                                                        <Nav.Link
                                                            eventKey="subscribed"
                                                            className="mb-sm-3 mb-md-0"
                                                        >
                                                            Subscribed {courses?.data?.courses.filter((item) => paidIDs?.includes(item.id)).length}
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item className="ms-0">
                                                        <Nav.Link
                                                            eventKey="bookmarked"
                                                            className="mb-sm-3 mb-md-0"
                                                        >
                                                            Bookmarked  {courses?.data?.courses.filter((item) => bookmarkedIDs?.includes(item.id)).length}
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item className="ms-0">
                                                        <Nav.Link
                                                            eventKey="all"
                                                            className="mb-sm-3 mb-md-0"
                                                        >
                                                            All Courses {courses?.data?.courses.length}
                                                        </Nav.Link>
                                                    </Nav.Item>


                                                </Nav>
                                            </Card.Header>
                                            <Card.Body className="p-0">
                                                <Tab.Content>
                                                    <Tab.Pane
                                                        eventKey="all"
                                                        className="pb-4 p-4 ps-0 pe-0"
                                                    >
                                                        {/* bookmarked started */}
                                                        <Row>
                                                            {courses?.data?.courses
                                                                .map((item, index) => (
                                                                    <Col lg={3} md={6} sm={12} key={index}>
                                                                        <CourseCard item={item} />
                                                                    </Col>
                                                                ))}

                                                        </Row>
                                                        {/* end of bookmarked */}
                                                    </Tab.Pane>
                                                    <Tab.Pane
                                                        eventKey="bookmarked"
                                                        className="pb-4 p-4 ps-0 pe-0"
                                                    >
                                                        {/* bookmarked started */}
                                                        {bookmarkedIDs?.length > 0 ? (
                                                            <Row>
                                                                {courses?.data?.courses
                                                                    .filter((item) => bookmarkedIDs?.includes(item.id))
                                                                    .map((item, index) => (
                                                                        <Col lg={3} md={6} sm={12} key={index}>
                                                                            <CourseCard item={item} />
                                                                        </Col>
                                                                    ))}

                                                            </Row>
                                                        ) : (

                                                            <p style={{ textAlign: 'center' }}>you have zero bookmarked courses
                                                                <Nav.Link
                                                                    eventKey="all"
                                                                    className="mb-sm-3 mb-md-0"
                                                                >
                                                                   add one to bookmarks
                                                                </Nav.Link></p>

                                                        )}
                                                        {/* end of bookmarked */}
                                                    </Tab.Pane>
                                                    <Tab.Pane
                                                        eventKey="subscribed"
                                                        className="pb-4 p-4 ps-0 pe-0"
                                                    >
                                                        {/* learning courses started */}
                                                        {paidIDs?.length > 0 ? (
                                                            <Row>
                                                                {courses?.data?.courses
                                                                    .filter((item) => paidIDs?.includes(item.id))
                                                                    .map((item, index) => (
                                                                        <Col lg={3} md={6} sm={12} key={index}>
                                                                            <CourseCard item={item} showprogressbar />
                                                                        </Col>
                                                                    ))}
                                                            </Row>
                                                        ) : (
                                                            <>
                                                                {paidCoursesLoading ? (
                                                                    <p style={{ textAlign: 'center' }}>Loading ...</p>
                                                                ) : (
                                                                    <p style={{ textAlign: 'center' }}>you have not subscribed to any course
                                                                        <Nav.Link
                                                                            eventKey="bookmarked"
                                                                            className="mb-sm-3 mb-md-0"
                                                                        >
                                                                            Subscribe to one
                                                                        </Nav.Link></p>
                                                                )}
                                                            </>

                                                        )}


                                                        {/* end of learning courses */}
                                                    </Tab.Pane>
                                                </Tab.Content>
                                            </Card.Body>
                                        </Card>
                                    </Tab.Container>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
            <FooterWithLinks />
        </Fragment>
    );
};

export default StudentDashboard;

// {tabs.map((tab, index) => (
//     <Tab.Pane
//         eventKey={tab}
//         className="pb-4 p-4 ps-0 pe-0"
//         key={index}
//     >
//         <Row>
//             {courses?.data?.courses
//             .map((item, index) => (
//                 <Col lg={3} md={6} sm={12} key={index}>
//                     <CourseCard item={item} />
//                 </Col>
//             ))}
//         </Row>
//     </Tab.Pane>
// ))}