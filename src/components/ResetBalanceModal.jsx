import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { resetBalance } from '../redux/features/balanceSlice';

const ResetBalanceModal = () => {
  const [open, setOpen] = useState(false);  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { requests } = useSelector((state) => state.requests);
  const resetBalanceRequest = requests.find((request) => request.type === 'balance/reset');

  const handleResetBalance = () => {
    dispatch(resetBalance({ uid: user.uid, setOpen }));
  };

  return (
    <>
      <Button 
        variant="danger" 
        className="w-100 d-flex align-items-center justify-content-center gap-2"
        onClick={() => setOpen(true)}  
      >
        <FontAwesomeIcon icon={faTrash} />
        Reset your balance
      </Button>
      <Modal show={open} onHide={() => setOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reset your balance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {resetBalanceRequest && resetBalanceRequest.isError && (
            <Alert variant="danger" className="d-flex align-items-center gap-2 mb-3">
              <FontAwesomeIcon icon={faTriangleExclamation} />
              Something went wrong
            </Alert>
          )}
          <p className="mb-0">Do you want to reset all your income and expenses ?</p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start">
          <Button 
            variant="danger" 
            onClick={handleResetBalance}
            disabled={resetBalanceRequest && resetBalanceRequest.loading}  
          >
            Delete
          </Button>
          <Button variant="secondary" onClick={() => setOpen(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ResetBalanceModal;