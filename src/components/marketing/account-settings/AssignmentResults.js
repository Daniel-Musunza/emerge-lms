// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'

import { Card, Button, Form, Row, Col } from 'react-bootstrap';

// import dashboard layout
import ProfileLayout from 'components/marketing/student/ProfileLayout';
import assignmentService from 'components/dashboard/features/assignments/assignmentService';
import PDFViewer from '../pages/courses/course-resume/PDFViewer';

const AssignmentResults = () => {
    const { user } = useSelector(
        (state) => state.auth
    );

    let { id } = useParams();
    const token = user?.data?.accessToken;
    const studentData = JSON.parse(localStorage.getItem('studentData'));

    const dashboardData = {
        avatar: `${studentData?.data?.profilePicture}`,
        name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
        linkname: 'Account Settings',
        link: '/marketing/student/student-edit-profile/'
    };



    return (
        <ProfileLayout dashboardData={dashboardData}>
            <Card className="border-0">
                <Card.Header>
                    <div className="mb-3 mb-lg-0">
                        <h2 className="mb-0">Assignment Results</h2>

                    </div>
                </Card.Header>

                <Card.Body>
                    <Row>

                        <PDFViewer pdfUrl="" />
                    </Row>
                </Card.Body>
            </Card>
        </ProfileLayout>
    );
};

export default AssignmentResults;
