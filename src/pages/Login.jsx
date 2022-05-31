import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Container className="h-100">
      <Row className="h-100 align-items-center justify-content-center">
        <Col xl={6}>
          <Card className="shadow-sm py-2">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <Card.Title as="h4">Expense Tracker</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Sign in to your account</Card.Subtitle>
                </div>
                <FontAwesomeIcon className="display-6" icon={faAddressCard} />
              </div>
              <Form className="mt-3">
                <Form.Group className="mb-3" controlId="e-mail">
                  <Form.Label htmlFor="e-mail">Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" required />
                </Form.Group>
                <div className="mb-3">
                  <Card.Link as={Link} to="/register">Create new account</Card.Link>
                </div>
                <Button variant="primary" type="submit" className="w-100 d-flex align-items-center justify-content-center gap-2">
                  <FontAwesomeIcon icon={faUser} />
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login;