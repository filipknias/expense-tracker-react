import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { sortEntries } from '../redux/features/balanceSlice';

const SortEntriesDropdown = ({ type }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleSortEntry = (sortBy) => {
    dispatch(sortEntries({ uid: user.uid, type, sortBy }));
  };

  return (
    <Dropdown>
      <Dropdown.Toggle 
        as={FontAwesomeIcon} 
        icon={faArrowDownShortWide} 
        className="h5"
        style={{ cursor: 'pointer' }} 
      />
      <Dropdown.Menu>
        <p className="text-center mb-2">Sort by</p>
        <Dropdown.Item onClick={() => handleSortEntry('amount')}>Amount</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortEntry('createdAt')}>Created at</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default SortEntriesDropdown;