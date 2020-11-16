import React from 'react';
import { InputNumber } from '../..';

const PriceFormat = ({ price }) => (
  <InputNumber priceFormat={price} />
);

export default PriceFormat;
