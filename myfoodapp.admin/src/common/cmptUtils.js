import React, { useState } from 'react';
import { roundFixed } from './utils';
import * as moment from 'moment';

export const RenderImage = ({ image }) => {
  const [src, setSrc] = useState(`${image}`);
  const handleError = () => setSrc('img/dummy.png');
  return (
    <img
      className="img-fluid circle"
      style={{ width: '36px', height: '36px', margin: '0 auto' }}
      src={src}
      onError={handleError}
      alt=""
    />
  );
};

export const renderPriceFormatted = (fieldName) => ({ [fieldName]: price }) => {
  return `Bs. ${roundFixed(price, 2)}`;
};

export const renderYesNo = (fieldName) => ({ [fieldName]: booleanField }) =>
  booleanField ? 'Si' : 'No';
