import React from 'react';
import { Nav, Modal, Tab } from 'react-bootstrap';
import Demo from './Demo';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

const LoginModal = ({updateShowModal}) => {
  // set modal display state
  return (
    <>
        {/* tab container to do either signup or login component plus demo*/}
        <Tab.Container defaultActiveKey='demo'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='demo'>Demo</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
            <Tab.Pane eventKey='demo'>
                <Demo updateShowModal={updateShowModal}/>
              </Tab.Pane>
              <Tab.Pane eventKey='login'>
                <LoginForm  updateShowModal={updateShowModal}/>
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm updateShowModal={updateShowModal}/>
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </>
)}   

export default LoginModal