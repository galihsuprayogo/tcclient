import React from 'react';
import {InputNumber} from '../../../components';

const PriceFormat = ({price}) => {
    return (
            <InputNumber priceFormat={price}/>
    )
}

export default PriceFormat;
