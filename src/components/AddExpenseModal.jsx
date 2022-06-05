import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const AddExpenseModal = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);

  return (
    <>
      <Button 
        className="mt-4 w-100 d-flex align-items-center justify-content-center gap-2"
        onClick={() => setOpen(true)}
      >
        <FontAwesomeIcon icon={faPlus} />
        Add new expense
      </Button>
      <Modal show={open} onHide={() => setOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add new expense</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Expense name"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="amount">Amount</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Expense amount"
                id="amount"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-start">
            <Button type="submit" variant="primary">Save</Button>
            <Button variant="secondary" onClick={() => setOpen(false)}>Close </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default AddExpenseModal;