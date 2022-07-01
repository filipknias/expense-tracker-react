import React from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faBan } from '@fortawesome/free-solid-svg-icons';
import AddIncomeModal from './AddIncomeModal';
import { useSelector } from 'react-redux';
import EntriesList from './EntriesList';
import SortEntriesDropdown from './SortEntriesDropdown';

const IncomeCard = () => {
  const { income } = useSelector((state) => state.balance);

  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column justify-content-between gap-3">
        <div className="position-relative" style={{ flex: 1 }}>
          <Card.Title className="d-flex align-items-start justify-content-between gap-2">
            <div className="d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faMoneyBill} className="text-success" />
              Your income
            </div>
            <SortEntriesDropdown type="income" />
          </Card.Title>
          {income.length > 0 ? (
            <EntriesList entries={income} />
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center gap-2 position-absolute top-50 start-50 translate-middle w-100">
              <FontAwesomeIcon icon={faBan} className="text-muted h1" />
              <p className="text-muted h4 text-center">You have no income</p>
            </div>
          )}
        </div>
        <AddIncomeModal />
      </Card.Body>
    </Card>
  )
}

export default IncomeCard;