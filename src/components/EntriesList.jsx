import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSackDollar, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const EntriesList = ({ entries }) => {
  return (
    <ListGroup className="mt-4">
      {entries.map(({ id, name, amount, type }) => (
        <ListGroup.Item key={id} className="d-flex align-items-center justify-content-between py-3">
          <div className="d-flex align-items-center gap-3">
            <FontAwesomeIcon icon={faSackDollar} className="text-success h5 mb-1" />
            <h5 className="mb-1">{name}</h5>
          </div>
          <div className="d-flex align-items-center gap-3">
            <p className={`${type === 'expense' ? 'text-danger' : 'text-success'} h5 mb-1`}>
              {type === 'expense' ? '-' : '+'}
              {amount} $
            </p>
            <FontAwesomeIcon 
              icon={faEllipsisVertical} 
              className="text-muted h5 mb-1" 
              style={{ cursor: 'pointer' }}  
            />
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default EntriesList;