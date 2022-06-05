import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faSackDollar, faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';

const ExpensesCard = () => {
  const listItems = [
    {
      id: 1,
      name: 'Food',
      amount: 123,
    },
    {
      id: 2,
      name: 'Bills',
      amount: 999,
    },
    {
      id: 3,
      name: 'Car',
      amount: 12000,
    },
  ];

  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column justify-content-between gap-3">
        <div>
          <Card.Title className="d-flex align-items-end justify-content-center gap-2">
            <FontAwesomeIcon icon={faMoneyBill} className="text-success" />
            Your expenses
          </Card.Title>
          <ListGroup className="mt-4">
            {listItems.map(({ id, name, amount }) => (
              <ListGroup.Item key={id} className="d-flex align-items-center justify-content-between py-3">
                <div className="d-flex align-items-center gap-3">
                  <FontAwesomeIcon icon={faSackDollar} className="text-success h5 mb-1" />
                  <h5 className="mb-1">{name}</h5>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <p className="text-success h5 mb-1">{amount} $</p>
                  <FontAwesomeIcon 
                    icon={faEllipsisVertical} 
                    className="text-muted h5 mb-1" 
                    style={{ cursor: 'pointer' }}  
                  />
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <Button className="mt-4 w-100 d-flex align-items-center justify-content-center gap-2">
          <FontAwesomeIcon icon={faPlus} />
          Add new expense
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ExpensesCard;