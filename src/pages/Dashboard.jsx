import React from 'react';
import Appbar from '../components/Appbar';
import ExpensesCard from '../components/ExpensesCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Dashboard = () => {
  return (
    <div className="d-flex flex-column h-100">
      <Appbar /> 
      <Container className="py-5" style={{ flex: 1 }}>
        <Row className="h-100">
          <Col xl={4}>
            <ExpensesCard />
          </Col>  
        </Row> 
      </Container>
    </div>
  )
}

export default Dashboard;