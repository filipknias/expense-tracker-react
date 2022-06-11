import React, { useEffect } from 'react';
import Appbar from '../components/Appbar';
import ExpensesCard from '../components/ExpensesCard';
import IncomeCard from '../components/IncomeCard';
import BalanceCard from '../components/BalanceCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { fetchBalance } from '../redux/features/balanceSlice';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { requests } = useSelector((state) => state.requests);
  const fetchBalanceRequest = requests.find((request) => request.type === 'balance/fetch');
  
  useEffect(() => {
    // Fetch balance on page load
    dispatch(fetchBalance({ uid: user.uid }));
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <Appbar /> 
      <Container className="py-5 px-4" style={{ flex: 1 }}>
        {fetchBalanceRequest && fetchBalanceRequest.isError && (
          <Alert variant="danger" className="d-flex align-items-center gap-2">
            <FontAwesomeIcon icon={faTriangleExclamation} />
            Something went wrong
          </Alert>
        )}
        <Row className="h-100 gap-5 gap-lg-0">
          <Col lg={4} className="h-100">
            <BalanceCard />
          </Col>
          <Col lg={4} className="h-100">
            <ExpensesCard />
          </Col> 
          <Col lg={4} className="h-100">
            <IncomeCard />
          </Col> 
        </Row> 
      </Container>
    </div>
  )
}

export default Dashboard;