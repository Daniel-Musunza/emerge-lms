// import node module libraries
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

// import sub custom components
import Sidebar from './sidebar/Sidebar';
import ChatBox from './chatbox/ChatBox';
import {useParams } from 'react-router-dom';
const Chat = () => {
	const [hideChatBox, setHideChatBox] = useState(false);
	let { id, name } = useParams();
	return (
		<Row className="g-0 w-full">
			{/* <Col xl={3} lg={12} md={12} xs={12}>
				<Sidebar hideChatBox={hideChatBox} setHideChatBox={setHideChatBox} />
			</Col> */}
			<Col xl={12} lg={12} md={12} xs={12}>
				<ChatBox hideChatBox={hideChatBox} setHideChatBox={setHideChatBox}  name={name}/>
			</Col>
		</Row>
	);
};

export default Chat;
