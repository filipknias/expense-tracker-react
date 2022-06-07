import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faSackDollar, faEllipsisVertical, faBan } from '@fortawesome/free-solid-svg-icons';
import AddExpenseModal from './AddExpenseModal';
import { useSelector } from 'react-redux';
import EntriesList from './EntriesList';

const ExpensesCard = () => {
  const { expenses } = useSelector((state) => state.balance);

  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column justify-content-between gap-3">
        <div className="position-relative" style={{ flex: 1 }}>
          <Card.Title className="d-flex align-items-end justify-content-center gap-2">
            <FontAwesomeIcon icon={faMoneyBill} className="text-success" />
            Your expenses
          </Card.Title>
          {expenses.length > 0 ? (
            <EntriesList entries={expenses} />
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center gap-2 position-absolute top-50 start-50 translate-middle w-100">
              <FontAwesomeIcon icon={faBan} className="text-muted h1" />
              <p className="text-muted h4 text-center">You have no expenses</p>
            </div>
          )}
        </div>
        <AddExpenseModal />
      </Card.Body>
    </Card>
  )
}

export default ExpensesCard;