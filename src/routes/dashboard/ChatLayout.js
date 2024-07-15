// import node module libraries
import React, { useState } from 'react';
import { useOutlet, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux'
// import sub components

// import context provider
import ChatProvider from 'context/providers/ChatProvider';
import ProfileLayout from 'components/marketing/student/ProfileLayout';

const ChatLayout = () => {
	const outlet = useOutlet();
	
	const studentData = JSON.parse(localStorage.getItem('studentData'));

	const dashboardData = {
		avatar: `${studentData?.data?.profilePicture}`,
		name: `${studentData?.data?.firstName} ${studentData?.data?.lastName}`,
		linkname: 'Account Settings',
		link: '/marketing/student/student-edit-profile/'
	};
	
	return (
		<ProfileLayout dashboardData={dashboardData}>
				<ChatProvider>{outlet}</ChatProvider>
		</ProfileLayout>
	);
};
export default ChatLayout;
