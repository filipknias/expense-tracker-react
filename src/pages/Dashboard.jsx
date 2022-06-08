import React, { useEffect } from 'react';
import Appbar from '../components/Appbar';
import ExpensesCard from '../components/ExpensesCard';
import IncomeCard from '../components/IncomeCard';
import BalanceCard from '../components/BalanceCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { fetchBalance } from '../redux/features/balanceSlice';
import { useSelector, useDispatch } from 'react-redux';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  
  useEffect(() => {
    // Fetch balance on page load
    dispatch(fetchBalance({ uid: user.uid }));
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <Appbar /> 
      <Container className="py-5" style={{ flex: 1 }}>
        <Row className="h-100">
          <Col xl={4}>
            <BalanceCard />
          </Col>
          <Col xl={4}>
            <ExpensesCard />
          </Col> 
          <Col xl={4}>
            <IncomeCard />
          </Col> 
        </Row> 
      </Container>
    </div>
  )
}

export default Dashboard;