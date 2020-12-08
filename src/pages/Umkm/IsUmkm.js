import React, { Fragment } from 'react';
import { showMessage } from 'react-native-flash-message';
import { TextButton, List } from '../../components';
import { colors } from '../../utils';

const IsUmkm = ({ umkm, navigation }) => {
  const Content = () => {
    if (!umkm) {
      return <TextButton title="Masukkan Produk Kamu" onPress={onMessage} />;
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
        {/* <List */}
        {/*    type="image" */}
        {/*    image="dummycoffe3" */}
        {/*    name="Header nama coffe" */}
        {/*    value="Tanon, Temanggung, Jawa Tengah, 27777" */}
        {/* /> */}
      </>
    );
  };

  const onMessage = () => {
    showMessage({
      message: 'Ooops, Sepertinya kamu belum melengkapi profil UMKM!! ',
      type: 'default',
      backgroundColor: colors.message.error,
      color: 'white',
    });
  };

  return (
    <Content />
  );
};
export default IsUmkm;
