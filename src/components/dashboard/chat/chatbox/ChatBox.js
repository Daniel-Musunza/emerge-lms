// import node module libraries
import React, { useContext, useRef, useEffect } from 'react';
import SimpleBar from 'simplebar-react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import chatService from '../../features/chat/chatService';

// import sub custom components
import ChatHeader from './ChatHeader';
import Message from './Message';
import ChatFooter from './ChatFooter';
import moment from 'moment'
// import context file
import { ChatContext } from 'context/Context';

// import hook file
import useChatOperations from 'hooks/useChatOperations';

const ChatBox = (props) => {
	const { hideChatBox, setHideChatBox } = props;
	const {
		ChatState: { activeThread }
	} = useContext(ChatContext);
	const { getThreadMessages } = useChatOperations();
	const thread = getThreadMessages(activeThread.messagesId);

	// Auto scroll to bottom when the new chat has been added.
	const messagesEndRef = useRef(null);
	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
			inline: 'nearest'
		});
	};

	const { user } = useSelector(state => state.auth);
	const token = user?.data?.accessToken;
	const courseId = props.courseId;

	const { data: chat, isLoading: chatLoading } = useQuery(
		['groupChat', token, courseId],
		() => chatService.getGroupChat(token, courseId)
	);

	const chatId = chat?.data.id


	const { data: messages, isLoading: messagesLoading } = useQuery(
		['groupChat', token, chatId],
		() => chatService.getChatMessages(token, chatId)
	);

	const getDate = (timestamp) => {
		return moment(timestamp).format("MMMM DD, yyyy");
	};

	const getTime = (timestamp) => {
		return moment(timestamp).format('hh:mm a')
	};


	const chatMessages = messages?.data.flatMap(innerArray => {
		if (Array.isArray(innerArray)) {
			return innerArray.map(x => {// Log each message object
				return {
					date: getDate(x.createdAt),
					message: x.message,
					time: getTime(x.createdAt),
					userId: x.userId,
					sender: x.sender,
					id: x.id
				};
			});
		} else { // Log non-array items for debugging
			return []; // Return an empty array for non-array items
		}
	});

	useEffect(scrollToBottom);

	return (
		<div
			className={`chat-body w-100 vh-100 ${hideChatBox ? 'chat-body-visible' : ''
				}`}
		>
			<ChatHeader hideChatBox={hideChatBox} setHideChatBox={setHideChatBox} name={props.name} />
			<SimpleBar className="vh-100" style={{ maxHeight: '70vh' }}>
				<div className="px-4 py-4 h-100 messages-container">
					{chatMessages?.length === 0
						? null
						: chatMessages?.map((item, index) => {
							return <Message chatScript={item} key={index} />;
						})}
				</div>
				<div ref={messagesEndRef} />
			</SimpleBar>
			<ChatFooter chatId={chatId} />
		</div>
	);
};
export default ChatBox;
