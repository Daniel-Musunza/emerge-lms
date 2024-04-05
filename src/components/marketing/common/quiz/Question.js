import React, { Fragment, useState } from 'react';
import { ListGroup, Form } from 'react-bootstrap';

const Question = (props) => {
    const { item, recordAnswer } = props; // Destructuring props to access item and recordAnswer
    const [selectedValue, setSelectedValue] = useState(""); // State to track selected answer
console.log(item)
    // Function to handle selecting an answer
    const handleAnswerSelect = (answerId) => {
        setSelectedValue(answerId); // Update selected answer
        recordAnswer(answerId, item.id, item.resultId); // Call recordAnswer function from props
    };

    // Determine input type based on question interface
    const type = item.interface === 'checkbox' ? 'checkbox' : 'radio';

    return (
        <Fragment>
            <h3 className="mb-3">{item.question}</h3>
            {/* Render answer options */}
            {item.interface === 'button' ? (
                <Fragment>
                    {item.answers.map((answer, index) => (
                        <Form.Check
                            key={index}
                            type="radio"
                            id={`radio-${answer.id}`}
                            bsPrefix="d-grid"
                            className="mb-2"
                            // Handle click event to select answer
                            onClick={() => handleAnswerSelect(answer.id)}
                        >
                            <Form.Check.Input
                                type="radio"
                                className="btn-check"
                                name={'answer-' + item.id}
                                checked={selectedValue === answer.id} // Check if answer is selected
                            />
                            <Form.Check.Label className="btn btn-outline-light-primary text-dark-primary text-start">
                                {answer.answer}
                            </Form.Check.Label>
                        </Form.Check>
                    ))}
                </Fragment>
            ) : (
                <ListGroup>
                    {item.answers.map((answer, index) => {
                        return (
                            <ListGroup.Item
                                key={index}
                                className={`list-group-item-action ${
                                    selectedValue === answer.id ? 'bg-light' : ''
                                }`}
                                aria-current="true"
                                // Handle click event to select answer
                                onClick={() => handleAnswerSelect(answer.id)}
                            >
                                <Form.Check
                                    type={type}
                                    id={answer.id}
                                    name={'answer-' + item.id}
                                    label={answer.answer}
                                    value={answer.id}
                                    checked={selectedValue === answer.id} // Check if answer is selected
                                    onChange={() => {}} // Since onClick handles selection, onChange does nothing
                                />
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            )}
        </Fragment>
    );
};

export default Question;
