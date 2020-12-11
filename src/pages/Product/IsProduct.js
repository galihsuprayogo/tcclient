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
          name="Header nama coffe-Arabica-Fullwash-Roast Bean- Rp. 50.000,-"
          value="Kledung, Temanggung, Jawa Tengah, 27777"
        />
        <List
          type="image"
          image="dummycoffe2"
          name="Ambu Coffe-Robusta-Semi Wash-Green Bean- Rp. 80.000,-"
          value="Posong, Temanggung, Jawa Tengah, 27777"
        />
        <List
          type="image"
          image="dummycoffe3"
          name="Header nama coffe"
          value="Tanon, Temanggung, Jawa Tengah, 27777"
        />
        <List
          type="image"
          image="dummycoffe4"
          name="Header nama coffe"
          value="Random, Temanggung, Jawa Tengah, 27777"
        />
        <List
          type="image"
          image="dummycoffe3"
          name="Header nama coffe"
          value="Tanon, Temanggung, Jawa Tengah, 27777"
        />
      </>
    );
  };

  return (
    <Content />
  );
};
export default IsProduct;
