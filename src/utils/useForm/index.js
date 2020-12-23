import { useState } from 'react';

export const useForm = (initialValue) => {
  const [values, setValues] = useState(initialValue);
  return [
    values,
    (formType, formValue) => {
      setValues({ ...values, [formType]: formValue });
    },
  ];
};
