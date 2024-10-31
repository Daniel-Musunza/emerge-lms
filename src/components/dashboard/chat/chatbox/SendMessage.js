// import node module libraries
import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { postMessage } from '../../features/chat/chatSlice';
import studentAction from 'store/studentAction';
import chatService from '../../features/chat/chatService';
import { toast } from 'react-toastify';

const SendMessage = (props) => {
	const dispatch = useDispatch();
	const [message, setMessage] = useState('');
	const [sendingMessage, setSendingMessage] = useState(false);
	const [studentData, setStudentData] = useState(null);
	const [messages, setMessages] = useState([]);
	const [studentDataLoading, setStudentDataLoading] = useState(true);
	const [messagesLoading, setMessagesLoading] = useState(true);
  
	const { user } = useSelector((state) => state.auth);
	const token = user?.data?.accessToken;
	const chatId = props?.chatId;
  
	// Fetch student data when token is available
	useEffect(() => {
	  const fetchStudentData = async () => {
		if (token) {
		  try {
			setStudentDataLoading(true);
			const response = await studentAction.getStudentData(token);
			setStudentData(response);
		  } catch (error) {
			console.error('Error fetching student data:', error);
		  } finally {
			setStudentDataLoading(false);
		  }
		}
	  };
	  fetchStudentData();
	}, [token]);
  
	const studentId = studentData?.id;
  
	// Fetch messages when token and chatId are available
	useEffect(() => {
	  const fetchMessages = async () => {
		if (token && chatId) {
		  try {
			setMessagesLoading(true);
			const response = await chatService.getChatMessages(token, chatId);
			setMessages(response || []);
		  } catch (error) {
			console.error('Error fetching messages:', error);
		  } finally {
			setMessagesLoading(false);
		  }
		}
	  };
	  fetchMessages();
	}, [token, chatId]);
  
	const refetchMessages = async () => {
	  if (token && chatId) {
		try {
		  const response = await chatService.getChatMessages(token, chatId);
		  setMessages(response || []);
		} catch (error) {
		  console.error('Error refetching messages:', error);
		}
	  }
	};
  
	const handleSubmit = async () => {
		
		setSendingMessage(true);
		try {
			let newMessage = {
				studentId: studentId,
				message: `${message.replace(/(?:\r\n|\r|\n)/g, '<br>')}`,
				chatId: chatId
			};
			if (message) {
				await dispatch(postMessage(newMessage));
				await refetchMessages(); // Refetch the messages to update the chat

				// Ensure the messages are updated after refetch
				refetchMessages().then((newData) => {
					
					props.setMessages(newData?.data?.data); // Assuming your API returns the messages in `data`
				});

				
				// Update the messages state in parent component
			}
		} catch (error) {
			toast.error(error.message);
		}
		setSendingMessage(false);
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
