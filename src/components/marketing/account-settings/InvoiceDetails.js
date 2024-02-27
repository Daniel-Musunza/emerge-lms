// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { Card } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';

// import sub components
import PrintInvoiceDetails from './PrintInvoiceDetails';

// import profile layout wrapper
import ProfileLayout from 'components/marketing/student/ProfileLayout';

const InvoiceDetails = () => {
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current
	});
	const {  studentData } = useSelector((state) => state.students);

	const dashboardData = {
		avatar: `${studentData?.data?.profilePicture}`,
		name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
		linkname: 'Account Settings',
		link: '/marketing/student/student-edit-profile/'
	};

	return (
		<ProfileLayout dashboardData={dashboardData}>
			<Card>
				<Link
					to="#"
					className="text-muted print-link no-print text-end me-5 mt-3 "
					onClick={handlePrint}
				>
					<i className="fe fe-printer"></i>
				</Link>
				<PrintInvoiceDetails ref={componentRef} />
			</Card>
		</ProfileLayout>
	);
};

export default InvoiceDetails;
