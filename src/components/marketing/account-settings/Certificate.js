// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

// import layouts
import NavbarMegaMenu from 'layouts/marketing/navbars/mega-menu/NavbarMegaMenu';
import courseService from '../../dashboard/features/courses/courseService';
import CertificateTemplate from 'assets/images/certificate/certificate.png';

const Certificate = () => {
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

	let certificateId = '';

	const { data: certificate } = useQuery(
		['certificate', token, certificateId],
		() => courseService.getCertificate(token, certificateId)
	);

	return (
		<Fragment>
			<NavbarMegaMenu />
		<div className='certificate'>
			<div
				style={{
					width: '100%',
					height: '80vh',
					backgroundImage: `url(${CertificateTemplate})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					boxSizing: 'border-box',
					// Optional background color to ensure visibility
					backgroundColor: 'lightgray'
				}}
			>
				
			</div>
		</div>
		</Fragment>
	);
};

export default Certificate;