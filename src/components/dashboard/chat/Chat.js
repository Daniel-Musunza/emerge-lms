// import node module libraries
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import ChatBox from './chatbox/ChatBox';
import {useParams } from 'react-router-dom';
const Chat = () => {
	const [hideChatBox, setHideChatBox] = useState(false);
	let { id, name } = useParams();
	return (
		<Row className="g-0 w-full">

			<Col xl={12} lg={12} md={12} xs={12}>
				<ChatBox hideChatBox={hideChatBox} setHideChatBox={setHideChatBox}  name={name} courseId={id}/>
			</Col>
		</Row>
	);
};

export default Chat;
