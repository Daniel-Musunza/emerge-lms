// import node module libraries
import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { postMessage } from '../../features/chat/chatSlice';
import studentAction from 'store/studentAction';
import chatService from '../../features/chat/chatService';
// import context file
import { ChatContext } from 'context/Context';
// import utility file
import { getDateValue, getTimeValue } from 'helper/utils';
import { toast } from 'react-toastify';

const SendMessage = (props) => {
	const dispatch = useDispatch();
	const [message, setMessage] = useState('');
	const [sendingMessage, setSendingMessage] = useState(false);
	const { user } = useSelector(state => state.auth);
	const token = user?.data?.accessToken;

	const { data: studentData, isLoading: studentDataLoading } = useQuery(
		['studentData', token],
		() => studentAction.getStudentData(token),
		{
			enabled: !!token, // Only fetch data when token is available
		}
	);

	const studentId = studentData?.data?.id;

	const {
		ChatState: { loggedInUserId, activeThread },
		ChatDispatch
	} = useContext(ChatContext);

	const chatId = props?.chatId;

	const { data: messages, refetch: refetchMessages } = useQuery(
		['groupChatMessages', token, chatId],
		() => chatService.getChatMessages(token, chatId),
		{
			enabled: !!token && !!chatId, // Fetch only if token and chatId are available
		}
	);

	const handleSubmit = async () => {
		setSendingMessage(true)
		try {
			let newMessage = {
				studentId: studentId,
				message: `${message.replace(/(?:\r\n|\r|\n)/g, '<br>')}`,
				chatId: chatId
			};

			if (message) {
				await dispatch(postMessage(newMessage));
				await refetchMessages(); // Refetch the messages to update the chat
				
				props?.setMessages(messages?.data); // Update the messages state in parent component
			}
		} catch (error) {
			toast.error(error.message)
		}
		setSendingMessage(false)
		setMessage('');

	};

	return (
		<div className="bg-white p-2 rounded-3 shadow-sm">
			<div className="position-relative">
				<Form.Control
					as="textarea"
					placeholder="Type a New Message"
					id="Excerpt"
					value={message}
					onChange={({ target }) => setMessage(target.value)}
					className="form-control border-0 form-control-simple no-resize"
					style={{ height: '40px' }}
				/>
			</div>
			<div className="position-absolute end-0 mt-n7 me-4">
				{sendingMessage ? (
					<span className="fs-3 text-primary "> sending ...</span>
				) : (
					<Button
						variant="none"
						bsPrefix="btn"
						type="submit"
						className="fs-3 text-primary btn-focus-none"
						onClick={handleSubmit}
					>
						<i className="fe fe-send"></i>
					</Button>
				)}

			</div>
		</div>
	);
};

export default SendMessage;
