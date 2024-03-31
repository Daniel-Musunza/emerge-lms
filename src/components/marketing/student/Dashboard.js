import React, { Fragment } from 'react';
import { useQuery } from 'react-query';
import { Col, Row, Tab, Container } from 'react-bootstrap';
import CourseCard from 'components/marketing/pages/courses/CourseCard';
import ProfileCover from 'components/marketing/common/headers/ProfileCover';
import studentAction from 'store/studentAction';
import { useSelector } from 'react-redux';
import courseService from '../../dashboard/features/courses/courseService';
import Spinner from '../../Spinner';

const StudentDashboard = () => {
    const tabs = ['All', 'Bookmarked'];

    const { user } = useSelector(state => state.auth);
    const token = user?.data?.accessToken;

    const { data: studentData, isLoading: studentDataLoading } = useQuery(
        ['studentData', token],
        () => studentAction.getStudentData(token),
        {
            enabled: !!token, // Only fetch data when token is available
        }
    );

    const { data: courses, isLoading: coursesLoading } = useQuery(
        ['courses'],
        courseService.getCourses
    );

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

                    {/* Content */}
                    <Row>
                        <Col md={12}>
                            <Tab.Container defaultActiveKey="All">
                                <Tab.Content>
                                    {tabs.map((tab, index) => (
                                        <Tab.Pane
                                            eventKey={tab}
                                            className="pb-4 p-4 ps-0 pe-0"
                                            key={index}
                                        >
                                            <Row>
                                                {courses?.data?.courses.map((item, index) => (
                                                    <Col lg={3} md={6} sm={12} key={index}>
                                                        <CourseCard item={item} />
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Tab.Pane>
                                    ))}
                                </Tab.Content>
                            </Tab.Container>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    );
};

export default StudentDashboard;
