import React from "react";
import Form from "react-bootstrap/Form";

const DropdownComponent = ({ period, setPeriod }) => {
  const handleFilter = (e) => {
    setPeriod(e.target.value);
  };
  return (
    <Form.Group className='mt-4' controlId='filter'>
      <Form.Label className='fw-semibold'>Filter</Form.Label>
      <Form.Select
        onChange={handleFilter}
        value={period}
        defaultValue='Choose...'
      >
        <option value='day'>Day</option>
        <option value='week'>Week</option>
        <option value='month'>Month</option>
      </Form.Select>
    </Form.Group>
  );
};

export default DropdownComponent;
