// this component should render a bootstrap card to send an email to the creator
// the card should have a form with a text area and a submit button
// the form should have an action to send the email
// the form should have a method of post

import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

export const Letters = () => {
    const [emailBody, setEmailBody] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emailBody }),
            });

            if (!response.ok) {
                throw new Error(`Failed to send email: ${response.statusText}`);
            }
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    };

    return (
        <Card className="mt-3">
        <Card.Body>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="emailBody">
                <Form.Label>Your Message</Form.Label>
                <Form.Control as="textarea" rows={3} value={emailBody} onChange={(e) => setEmailBody(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Send Email
            </Button>
            </Form>
        </Card.Body>
        </Card>
    );
};
