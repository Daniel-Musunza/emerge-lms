// import node module libraries
import React, { Fragment, useContext } from 'react';

const ChatHeader = (props) => {
	
	return (
		<div className="bg-white border-top border-bottom px-4 py-3 sticky-top">
			<div className="d-flex justify-content-between align-items-center">
				<div className="d-flex align-items-center">
					
					<div className="ms-2">
						<h4 className="mb-0 capitalize">{props.name} Group Chat</h4>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ChatHeader;
