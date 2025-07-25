import React from 'react';
import { Button } from 'reactstrap';

export default function Counter({ onChangeCount, count }) {
  function counterQuantityChanged(step) {
    onChangeCount(count + step);
  }

  return (
    <>
      <Button
        color="link"
        onClick={function () {
          counterQuantityChanged(-1);
        }}
      >
        <em className="fas fa-minus"></em>
      </Button>
      &nbsp;
      <label>{count}</label>
      &nbsp;
      <Button
        color="link"
        onClick={function () {
          counterQuantityChanged(1);
        }}
      >
        <em className="fas fa-plus"></em>
      </Button>
    </>
  );
}
