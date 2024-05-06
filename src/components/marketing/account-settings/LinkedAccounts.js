// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { useQuery } from 'react-query';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'react-bootstrap';

// import MDI icons
import Icon from '@mdi/react';
import { mdiFacebook, mdiGoogle, mdiGithub, mdiTwitter } from '@mdi/js';

// import profile layout wrapper
import ProfileLayout from 'components/marketing/student/ProfileLayout';

const LinkedAccounts = () => {
	const { user } = useSelector(
		(state) => state.auth
	);

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
						<h3 className="mb-0">Linked Accounts</h3>
						<p className="mb-0">
							You can link your social accounts into your emerges accounts & also
							access your history of linked accounts and manage your accounts in
							this sections.
						</p>
					</div>
				</Card.Header>

				{/*  Card body  */}
				<Card.Body>
					<div className="mb-5 d-md-flex">
						{/*  facebook  */}
						<div>
							<Icon
								path={mdiFacebook}
								className="me-3 h1 color-facebook "
								size={1.4}
							/>
						</div>
						<div className="mt-1">
							<h3 className="mb-0">Facebook</h3>
							<p>
								Enable one-click login and receive more personalized course
								recommendations.
							</p>
							<Link to="#" className="btn btn-dark btn-sm">
								Remove my Facebook Account
							</Link>
						</div>
					</div>
					{/*  Google  */}
					<div className="mb-5 d-md-flex border-top pt-5">
						<div>
							<Icon
								path={mdiGoogle}
								className="me-3 h1 color-google "
								size={1.4}
							/>
						</div>
						<div className="mt-1">
							<h3 className="mb-0">Google</h3>
							<p>
								Enable one-click login and receive more personalized course
								recommendations.
							</p>
							<Link to="#" className="btn btn-outline-secondary btn-sm">
								Link my Google Account
							</Link>
						</div>
					</div>

					{/*  github  */}
					<div className="mb-5 d-md-flex border-top pt-5">
						<div>
							<Icon
								path={mdiGithub}
								className="me-3 h1 color-github "
								size={1.4}
							/>
						</div>
						<div className="mt-1">
							<h3 className="mb-0">Github</h3>
							<p>
								Enable one-click login and receive more personalized course
								recommendations.
							</p>
							<Link to="#" className="btn btn-outline-secondary btn-sm">
								Link my Github Account
							</Link>
						</div>
					</div>

					{/*  twitter  */}
					<div className="mb-5 d-md-flex border-top pt-5">
						<div>
							<Icon
								path={mdiTwitter}
								className="me-3 h1 color-twitter "
								size={1.4}
							/>
						</div>
						<div className="mt-1">
							<h3 className="mb-0">Twitter</h3>
							<p>
								Enable one-click login and receive more personalized course
								recommendations.
							</p>
							<Link to="#" className="btn btn-outline-secondary btn-sm">
								Link my Twitter Account
							</Link>
						</div>
					</div>
				</Card.Body>
			</Card>
		</ProfileLayout>
	);
};

export default LinkedAccounts;
