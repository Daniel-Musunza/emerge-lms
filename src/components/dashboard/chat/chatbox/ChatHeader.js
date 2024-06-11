// import node module libraries
import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

// import custom components
import { Avatar } from 'components/elements/bootstrap/Avatar';
import GKTippy from 'components/elements/tooltips/GKTippy';

// import context file
import { ChatContext } from 'context/Context';

// import hook file
import useChatOperations from 'hooks/useChatOperations';

const ChatHeader = (props) => {
	const { hideChatBox, setHideChatBox } = props;

	const {
		ChatState: { loggedInUserId, activeThread }
	} = useContext(ChatContext);

	const { getGroupDetails, getUserDetailsById } = useChatOperations();

	let ActiveChatInfo =
		activeThread.type === 'user'
			? getUserDetailsById(activeThread.userId)
			: getGroupDetails(activeThread);

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
