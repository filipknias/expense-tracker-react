import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { addNewEntry } from '../redux/features/balanceSlice';
import { deleteRequest } from '../redux/features/requestSlice';
import { useSelector, useDispatch } from 'react-redux';

const AddIncomeModal = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { requests } = useSelector((state) => state.requests);
  const addIncomeRequest = requests.find((request) => request.type === 'income/add');

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addNewEntry({ 
      type: 'income',
      name, 
      amount, 
      uid: user.uid,
      setOpen, 
    }));
  };

  useEffect(() => {
    if (!open) {
      setName('');
      setAmount(0);
      dispatch(deleteRequest({ type: 'income/add' }));
    }
  }, [open]);

  return (
    <>
      <Button 
        className="mt-4 w-100 d-flex align-items-center justify-content-center gap-2"
        onClick={() => setOpen(true)}
      >
        <FontAwesomeIcon icon={faPlus} />
        Add new income
      </Button>
      <Modal show={open} onHide={() => setOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add new income</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {addIncomeRequest && addIncomeRequest.isError && (
              <Alert variant="danger" className="d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faTriangleExclamation} />
                Something went wrong
              </Alert>
            )}
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Income name"
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
                min="1"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-start">
            <Button 
              type="submit" 
              variant="primary"
              disabled={addIncomeRequest && addIncomeRequest.loading}
            >
              Save
            </Button>
            <Button variant="secondary" onClick={() => setOpen(false)}>Close</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default AddIncomeModal;