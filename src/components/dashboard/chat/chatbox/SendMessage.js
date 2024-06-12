// import node module libraries
import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useQuery } from 'react-query';
// import context file
import { ChatContext } from 'context/Context';
import { useSelector, useDispatch } from 'react-redux';
import { postMessage } from '../../features/chat/chatSlice';
import studentAction from 'store/studentAction';
// import utility file
import { getDateValue, getTimeValue } from 'helper/utils';

const SendMessage = (chatId) => {
	const dispatch = useDispatch();
	const [message, setMessage] = useState('Hi');
	const { user } = useSelector(state => state.auth);

	const token = user?.data?.accessToken;

	const { data: studentData, isLoading: studentDataLoading } = useQuery(
		['studentData', token],
		() => studentAction.getStudentData(token),
		{
			enabled: !!token, // Only fetch data when token is available
		}
	);

	let studentId = studentData?.data?.id;

	const {
		ChatState: { loggedInUserId, activeThread },
		ChatDispatch
	} = useContext(ChatContext);

	const handleSubmit = async () => {
		const dummyMsg = [
			'Hi',
			'Hello !',
			'Hey :)',
			'How do you do?',
			'Are you there?',
			'I am doing good :)',
			'Hi can we meet today?',
			'How are you?',
			'May I know your good name?',
			'I am from codescandy',
			'Where are you from?',
			"What's Up!"
		];
		let newMessage = {
			studentId: studentId,
			message: `${message.replace(/(?:\r\n|\r|\n)/g, '<br>')}`,
			chatId: chatId.chatId.chatId
		};

		if (message) {
			await dispatch(postMessage(newMessage))
		}
		setMessage(dummyMsg[Math.floor(Math.random() * dummyMsg.length)]);
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
				<Button
					variant="none"
					bsPrefix="btn"
					type="submit"
					className="fs-3 text-primary btn-focus-none"
					onClick={handleSubmit}
				>
					<i className="fe fe-send"></i>
				</Button>
			</div>
		</div>
	);
};
export default SendMessage;
