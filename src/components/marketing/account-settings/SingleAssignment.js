// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'

import { Card, Button, Form, Row, Col } from 'react-bootstrap';

// import dashboard layout
import ProfileLayout from 'components/marketing/student/ProfileLayout';
import assignmentService from 'components/dashboard/features/assignments/assignmentService';
import PDFViewer from '../pages/courses/course-resume/PDFViewer';

const SingleAssignment = () => {
    const [file, setFile] = useState(null);

    const { user } = useSelector(
        (state) => state.auth
    );

    let { id, title } = useParams();
    const token = user?.data?.accessToken;
    const studentData = JSON.parse(localStorage.getItem('studentData'));

    const dashboardData = {
        avatar: `${studentData?.data?.profilePicture}`,
        name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
        linkname: 'Account Settings',
        link: '/marketing/student/student-edit-profile/'
    };

    const { data: assignment } = useQuery(
        ['assignment', id, token], // Include id and token in the query key
        () => assignmentService.getAssignment(token, id) // Pass a function that returns the data
    );

    const { data: group } = useQuery(
        ['group', id, token],
        () => {
            if (assignment?.data?.type === 'group') {
                return assignmentService.getGroup(token, id);
            }
            return Promise.resolve(null);
        },
        {
            enabled: assignment?.data?.type === 'group', // Only enable the query if the type is 'group'
            staleTime: Infinity, // Optional: to prevent refetching if data is unlikely to change
            cacheTime: Infinity, // Optional: to keep the data cached
        }
    );

    console.log(group);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let fileData = new FormData();

            if (assignment?.data?.type === 'group') {

                fileData.append('file', file);
                fileData.append('assignmentId', assignment?.data?.id);
                fileData.append('groupId', group?.data?.id);

            } else {

                fileData.append('file', file);
                fileData.append('assignmentId', assignment?.data?.id);
                fileData.append('studentId', studentData?.data?.id);

            }

            await assignmentService.submitAssignment(token, fileData);

            toast.success("Success. submited successfully...")

        } catch (err) {
            toast.error("Failed to submit. try again later")
        }
    }


    function capitalizeWords(str) {
        if (!str) {
            return "loading ..."
        }
        return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    }

    return (
        <ProfileLayout dashboardData={dashboardData}>
            <Card className="border-0">
                <Card.Header>
                    <div className="mb-3 mb-lg-0">
                        <h2 className="mb-0">{capitalizeWords(assignment?.data?.type)} Assignment</h2>
                        <h3 className="mb-0">{title} </h3>

                        <PDFViewer pdfUrl={assignment?.data?.file} />

                        <p className="mb-0">
                            {assignment?.data?.description}
                        </p>
                        <p className="mb-0">
                            Maximum no of submissions :  {assignment?.data?.submission}
                        </p>
                    </div>
                </Card.Header>

                <Card.Body>
                    <Row>
                        <Col>
                            <Form name="group1">
                                <input type="file" onChange={(e) => { setFile(e.target.files[0]) }} />
                            </Form>
                        </Col>
                        <Col xs="auto">
                            <Button className="btn btn-outline-secondary text-white btn-sm" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </ProfileLayout>
    );
};

export default SingleAssignment;
