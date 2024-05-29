// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector} from 'react-redux'

import { Card } from 'react-bootstrap';

// import dashboard layout
import ProfileLayout from 'components/marketing/student/ProfileLayout';
import assignmentService from 'components/dashboard/features/assignments/assignmentService';

const Assignments = () => {
    const { user } = useSelector(
        (state) => state.auth
    );
    let { id, title} = useParams();
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

    console.log(assignment);

    return (
        <ProfileLayout dashboardData={dashboardData}>
            <Card className="border-0">
                <Card.Header>
                    <div className="mb-3 mb-lg-0">
                        <h3 className="mb-0">{title} </h3>
                        <p className="mb-0">
                            
                        </p>
                    </div>
                </Card.Header>

                <Card.Body>
                 
                </Card.Body>
            </Card>
        </ProfileLayout>
    );
};

export default Assignments;
