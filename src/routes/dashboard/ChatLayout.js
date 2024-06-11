// import node module libraries
import React, { useState } from 'react';
import { useOutlet, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux'
// import sub components
import NavbarVertical from './NavbarVertical';
import HeaderDefault from './HeaderDefault';

// import context provider
import ChatProvider from 'context/providers/ChatProvider';
import ProfileLayout from 'components/marketing/student/ProfileLayout';

const ChatLayout = (props) => {
	const outlet = useOutlet();
	const { children, className, overflowHidden } = props;
	const [showMenu, setShowMenu] = useState(true);
	const ToggleMenu = () => {
		return setShowMenu(!showMenu);
	};
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
		// <div
		// 	id="db-wrapper"
		// 	className={`${overflowHidden ? 'chat-layout' : ''} ${
		// 		showMenu ? '' : 'toggled'
		// 	}`}
		// >
		// 	<div className="navbar-vertical navbar">
		// 		<NavbarVertical
		// 			showMenu={showMenu}
		// 			onClick={(value) => setShowMenu(value)}
		// 		/>
		// 	</div>
		// 	<section id="page-content">
		// 		<div className="header">
		// 			<HeaderDefault
		// 				data={{
		// 					showMenu: showMenu,
		// 					SidebarToggleMenu: ToggleMenu
		// 				}}
		// 			/>
		// 		</div>
		<ProfileLayout dashboardData={dashboardData}>
				<ChatProvider>{outlet}</ChatProvider>
		</ProfileLayout>
		// 	</section>
		// </div>
	);
};
export default ChatLayout;
