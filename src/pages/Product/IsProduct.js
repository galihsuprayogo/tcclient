import React, { Fragment } from 'react';
import { TextButton, List } from '../../components';

const IsProduct = ({ product, navigation }) => {
  const Content = () => {
    if (!product) {
      return <TextButton title="Masukkan Produk Kamu" onPress={() => alert('not yet')} />;
    }
    return (
      <>
        <List
          type="image"
          image="dummycoffe1"
          name="Arabica"
          value="Header nama coffe-Arabica-Fullwash-Roast Bean- Rp. 50.000,-"
        />
        <List
          type="image"
          image="dummycoffe2"
          name="Arabica"
          value="Header nama coffe-Arabica-Fullwash-Roast Bean- Rp. 50.000,-"
        />
        <List
          type="image"
          image="dummycoffe4"
          name="Arabica"
          value="Header nama coffe-Arabica-Fullwash-Roast Bean- Rp. 50.000,-"
        />
        <List
          type="image"
          image="dummycoffe4"
          name="Robusta"
          value="Header nama coffe-Arabica-Fullwash-Roast Bean- Rp. 50.000,-"
        />
        <List
          type="image"
          image="dummycoffe3"
          name="Robusta"
          value="Header nama coffe-Arabica-Fullwash-Roast Bean- Rp. 50.000,-"
        />
      </>
    );
  };

  return (
    <Content />
  );
};
export default IsProduct;
