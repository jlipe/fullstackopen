import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap'

const Filter = (props) => {
  return(
    <div>
      <label htmlFor="filter">Filter shown with:</label>
      <InputGroup className="mb-3">
        <FormControl id="filter" onChange={props.handleFilterChange} value={props.filter} />
      </InputGroup>
    </div>
  );
}

export default Filter;