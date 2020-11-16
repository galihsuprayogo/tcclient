import React from 'react';
import { InputPicker } from '../..';

const CoffeePicker = ({
  datacoffees, target, title, labelType,
}) => {
  const destructeringElement = {
    type: [{
      id: 0,
      value: '',
    }],
    procedure: [{
      id: 0,
      value: '',
    }],
    output: [{
      id: 0,
      value: '',
    }],
    grade: [{
      id: 0,
      value: '',
    }],
  };

  const returnElement = (value, target) => {
    switch (target) {
      case 'type':
        value.type.splice(0, 1);
        return value.type;
      case 'procedure':
        value.procedure.splice(0, 1);
        return value.procedure;
      case 'output':
        value.output.splice(0, 1);
        return value.output;
      case 'grade':
        value.grade.splice(0, 1);
        return value.grade;
    }
  };

  const listCoffee = (datacoffees, target) => {
    datacoffees.map((coffee) => {
      if (target === 'type') {
        destructeringElement.type.push({ id: coffee.id, value: coffee.type });
      }
      if (target === 'procedure') {
        destructeringElement.procedure.push({ id: coffee.id, value: coffee.procedure });
      }
      if (target === 'output') {
        destructeringElement.output.push({ id: coffee.id, value: coffee.output });
      }
      if (target === 'grade') {
        destructeringElement.grade.push({ id: coffee.id, value: coffee.grade });
      }
    });
    return returnElement(destructeringElement, target);
  };

  return (
    <InputPicker
      title={title}
      labelType={labelType}
      selectedCoffees={listCoffee(datacoffees, target)}
    />
  );
};

export default CoffeePicker;
