import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signInUser } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, password, navigate }));
  };

  return (
    <Container className="h-100">
      <Row className="h-100 align-items-center justify-content-center">
        <Col xl={5}>
          <Card className="shadow-sm py-2">
            <Card.Body>
              <Card.Title className="display-6 text-muted text-center">Sign in to your account</Card.Title>
              <Card.Subtitle as="h4" className="text-center mt-1 mb-5">Expense Tracker</Card.Subtitle>
              <Form className="mt-3" onSubmit={handleSubmit}>
                {error && (
                  <Alert variant="danger" className="d-flex align-items-center gap-2">
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                    {error}
                  </Alert>
                )}
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="e-mail">Email address</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    id="e-mail"
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    id="password"
                    required  
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </Form.Group>
                <div className="mb-3">
                  <Card.Link as={Link} to="/register">Create new account here</Card.Link>
                </div>
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 d-flex align-items-center justify-content-center gap-2"
                  disabled={loading}
                >
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