import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScaleBalanced, faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const calculatePercent = (amount, total) => {
  return parseInt((amount / total) * 100);
};

const BalanceCard = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const { expenses, income } = useSelector((state) => state.balance);
  const percentIncome = calculatePercent((totalIncome - totalExpenses), totalIncome);
  const percentExpenses = calculatePercent(totalExpenses, totalIncome);

  useEffect(() => {
    setTotalExpenses(() => expenses.reduce((total, value) => total + parseInt(value.amount), 0));
    setTotalIncome(() => income.reduce((total, value) => total + parseInt(value.amount), 0));
  }, [expenses, income]);

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title className="d-flex align-items-end justify-content-center gap-2 mb-4">
          <FontAwesomeIcon icon={faScaleBalanced} className="text-info" />
          Your balance
        </Card.Title>
        <div className="d-flex gap-3 mx-auto w-100 mb-4">
          <div className="bg-success text-white text-center w-50 rounded p-3 h-100">
            <p className="mb-2">Income</p>
             <div className="d-flex align-items-center justify-content-center gap-2">
                <FontAwesomeIcon icon={faArrowTrendUp} className="h4" />
                <h3>{totalIncome}$</h3>
             </div>
          </div>
           <div className="bg-danger text-white text-danger text-center w-50 rounded p-3 h-100">
            <p className="mb-2">Expenses</p>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <FontAwesomeIcon icon={faArrowTrendDown} className="h4" />
              <h3>{totalExpenses}$</h3>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column gap-3">
          <div>
            <h5 className="mb-3">Income</h5>
            <ProgressBar variant="success" now={percentIncome} label={`${percentIncome}%`} />
          </div>
          <div>
            <h5 className="mb-3">Expenses</h5>
            <ProgressBar variant="danger" now={percentExpenses} label={`${percentExpenses}%`} />
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default BalanceCard;