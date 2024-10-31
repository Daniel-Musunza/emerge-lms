// import node module libraries
import React, { useContext, useRef, useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import chatService from '../../features/chat/chatService';

// import sub custom components
import ChatHeader from './ChatHeader';
import Message from './Message';
import ChatFooter from './ChatFooter';


const ChatBox = (props) => {
	const { hideChatBox, setHideChatBox } = props;
	const [messages, setMessages] = useState([]);

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

	const [chat, setChat] = useState(null);
	const [chatLoading, setChatLoading] = useState(true);
	const [messagesLoading, setMessagesLoading] = useState(true);

	useEffect(() => {
		const fetchChat = async () => {
			if (token && courseId) {
				try {
					setChatLoading(true);
					const response = await chatService.getGroupChat(token, courseId);
					setChat(response);
				} catch (error) {
					console.error('Error fetching chat:', error);
				} finally {
					setChatLoading(false);
				}
			}
		};
		fetchChat();
	}, [token, courseId]);

	useEffect(() => {
		const fetchMessages = async () => {
			if (token && chat?.id) {
				try {
					setMessagesLoading(true);
					const response = await chatService.getChatMessages(token, chat.id);
					setMessages(response || []);
				} catch (error) {
					console.error('Error fetching messages:', error);
				} finally {
					setMessagesLoading(false);
				}
			}
		};
		fetchMessages();
	}, [token, chat?.id]);

	const refetchMessages = async () => {
		if (token && chat?.id) {
			try {
				const response = await chatService.getChatMessages(token, chat.id);
				setMessages(response || []);
			} catch (error) {
				console.error('Error refetching messages:', error);
			}
		}
	};

	const getDate = (timestamp) => {
		return moment(timestamp).format('MMMM DD, yyyy');
	};

	const getTime = (timestamp) => {
		return moment(timestamp).format('hh:mm a');
	};

	let chatMessages = messages.flatMap(innerArray => {
		if (Array.isArray(innerArray)) {
			return innerArray.map(x => {
				return {
					date: getDate(x.createdAt),
					message: x.message,
					time: getTime(x.createdAt),
					userId: x.userId,
					sender: x.sender,
					id: x.id
				};
			});
		} else {
			return [];
		}
	});

	useEffect(() => {
		scrollToBottom();
	}, [chatMessages]);




	return (
		<div
			className={`chat-body w-100 vh-100 ${hideChatBox ? 'chat-body-visible' : ''}`}
		>
			<ChatHeader hideChatBox={hideChatBox} setHideChatBox={setHideChatBox} name={props.name} />
			<SimpleBar className="vh-100" style={{ maxHeight: '70vh' }}>
				<div className="px-4 py-4 h-100 messages-container">
					{chatMessages.length === 0
						? null
						: chatMessages.map((item, index) => {
							return <Message chatScript={item} key={index} />;
						})}
				</div>
				<div ref={messagesEndRef} />
			</SimpleBar>
			<ChatFooter chatId={chatId} setMessages={setMessages} />
		</div>
	);
};

export default ChatBox;
