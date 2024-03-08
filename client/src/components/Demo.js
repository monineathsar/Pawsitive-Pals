// see SignupForm.js for comments
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client'

const Demo = ({updateShowModal}) => {

    const [validated] = useState(false);
    const [login] = useMutation(LOGIN);

    const handleButtonClick = async (event, email, password) => {
        event.preventDefault();

        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await login( {
                variables: {email , password}
            });

            Auth.login(data.login.token);
            updateShowModal(false);
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <>
        {/* Login/demo modal */}
            <Form noValidate validated={validated}>
                <div className="d-grid gap-2">
                    {/* User Demo Button */}
                    <Button onClick={(event) => handleButtonClick(event, 'test@gmail.com', 'test')}
                        variant='primary' size="lg" block>
                        User
                    </Button>
                    {/* Admin Demo Button */}
                    <Button onClick={(event) => handleButtonClick(event, 'admin@gmail.com', 'admin')}
                        variant='secondary' size="lg" block>
                        Admin
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default Demo;
