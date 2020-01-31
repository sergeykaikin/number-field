import React, { useState } from 'react';
import NumberField from '../NumberField';

const QuantityDisplayComponent = () => {
  const [quantity, setQuantity] = useState(101);

  return (
    <div>
      <p>
        You selected: {quantity}
      </p>
      <div>
        <NumberField label="L/XL" value={quantity} onChange={setQuantity} />
      </div>
    </div>
  )
};

export default QuantityDisplayComponent;
