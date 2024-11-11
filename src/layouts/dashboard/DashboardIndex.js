// import node module libraries
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

const DashboardIndex = () => {
	
	return (
		<div
			id="db-wrapper"
			className={`${overflowHidden ? 'chat-layout' : ''} ${
				showMenu ? '' : 'toggled'
			}`}
		>
		
		</div>
	);
};
export default DashboardIndex;
