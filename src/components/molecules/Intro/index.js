import React, { useState } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useDispatch } from 'react-redux';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, ScrollView
} from 'react-native';
import { colors, fonts } from '../../../utils';
import { globalAction } from '../../../redux';
import { DataIntro, Gap } from '../..';

const Intro = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {' '}
        {item.title}
        {' '}
      </Text>
      <Gap height={23} />
      <Text style={styles.contentText}>
        {' '}
        {item.text}
        {' '}
      </Text>
      { item.description !== '' && (
        <>
          <Gap height={13} />
          <Text style={styles.contentText}>
            {' '}
            {item.description}
            {' '}
          </Text>
        </>
      )}
      { item.photo !== '' && item.key === 'two' && (
        <>
          <Gap height={30} />
          <Image source={item.photo} style={styles.photo} />
        </>
      )}
      { item.photo !== '' && item.photoSecond !== '' && item.key === 'three' && (
       <>
        <Gap height={30} />
        <View style={styles.photoThreeWrapper}>
          <Image source={item.photo} style={styles.photoSecond} />
          <Gap width={8} />
          <Image source={item.photoSecond} style={styles.photoSecond} />
        </View>
       </>
      )}
      {item.key === 'one' && (
       <>
        <Gap height={5} />
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Text style={styles.linkText}>
          {' '}
          {'Kebijakan Privasi'}
          {' '}
          </Text>
        </TouchableOpacity>
       </>
      )}
    </View>
  );

  const onDone = () => {
    dispatch({ type: globalAction.SET_INTRO, value: true });
  };

  const nextButton = () => (
    <Text style={styles.buttonText}> Lewati </Text>
  );

  const doneButton = () => (
    <Text style={styles.buttonText}> Setuju </Text>
  );

  return (
  <>
    <AppIntroSlider
      data={DataIntro.data}
      renderItem={renderItem}
      onDone={onDone}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
      dotClickEnabled={false}
      showNextButton
      renderNextButton={nextButton}
      renderDoneButton={doneButton}
    />
    {visible && (
      <View style={styles.modalWrapper}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollWrapper}>
          <Text style={styles.headerText}> Kebijakan Privasi </Text>
           <Gap height={10} />
           <Text style={styles.contentModalText}>
           Developer sebagai mahasiswa Informatika Universitas Sanata Dharma menjaga dan menghormati kerahasiaan informasi anda. Untuk
           lebih detail tujuan digunakannya informasi anda, silahkan baca kebijakan privasi di bawah ini.
           </Text>
           <Gap height={13} />
           <Text style={styles.subHeaderModal}>Informasi apa yang kami kumpulkan ? dan Mengapa ?</Text>
           <Gap height={5} />
           <Text style={styles.subContentModal}>1. Lokasi</Text>
           <Gap height={7} />
           <Text style={styles.contentModalText}>
           Kami menggunakan izin lokasi untuk menampilkan lokasi UMKM petani kopi.
           Sebagaimana sangat dibutuhkan untuk pembeli menemukan tujuan dari hasil pencarian pembelian berupa navigasi.
           Persetujuan ini sangat penting bagi developer untuk memberikan pelayanan yang maksimal.
           </Text>
           <Gap height={13} />
           <Text style={styles.subHeaderModal}>Bagaimana kami menggunakan informasi lokasi anda ?</Text>
           <Gap height={5} />
           <Text style={styles.contentModalText}>
           Kami tidak menjual informasi lokasi anda ke pihak ketiga. Melainkan kami olah sebagai bahan penelitian tugas akhir.
           Berikut alur informasi lokasi bekerja :
           </Text>
           <Gap height={7} />
           <Text style={styles.contentModalText}>
           1) Petani kopi selaku pemilik UMKM membuat profil toko, disertakan lokasi berupa alamat, latitude, longitude.
           </Text>
           <Gap height={3} />
           <Text style={styles.contentModalText}>
           2) Developer menghitung jarak antara lokasi petani dengan pembeli untuk kemudian diolah dalam algoritma tugas akhir.
           </Text>
           <Gap height={3} />
           <Text style={styles.contentModalText}>
           3) Pembeli melakukan navigasi ke lokasi petani yang telah selesai diolah dalam bentuk latitude dan longitude.
           </Text>
           <Gap height={13} />
           <Text style={styles.subHeaderModal}>Layanan Pengguna</Text>
           <Gap height={7} />
           <Text style={styles.contentModalText}>
           kami sangat menerima keluhan, apresiasi, dan kritik yang berkaitan dengan penggunaan informasi lokasi anda.
           Jika memang diperlukan, pengguna dapat mengirim melalui kontak developer :
           </Text>
           <Text style={styles.linkEmail}>
           suprayogogalih@gmail.com
           </Text>
        </ScrollView>
        <TouchableOpacity style={styles.buttonModal} onPress={() => setVisible(false)}>
            <Text style={styles.buttonTextModal}> Tutup </Text>
        </TouchableOpacity>
      </View>
    )}
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    borderRadius: 5,
    padding: 40,
  },
  scrollWrapper: {
    marginBottom: 35
  },
  modalWrapper: {
    position: 'absolute',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    width: '80%',
    height: '70%',
    top: '15%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  buttonModal: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: colors.primary,
    padding: 5,
    borderRadius: 7
  },
  buttonTextModal: {
    color: colors.text.default,
    fontFamily: fonts.Akkurat.bold
  },
  buttonText: {
    color: colors.secondary,
    fontFamily: fonts.sfProDisplay.heavy
  },
  dot: {
    backgroundColor: colors.secondary,
    width: 7,
    height: 7,
    borderRadius: 20,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 15,
  },
  activeDot: {
    backgroundColor: 'white',
    width: 9,
    height: 9,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 15,
  },
  headerText: {
    fontFamily: fonts.sfProDisplay.heavy,
    fontSize: 16,
    textAlign: 'center',
    color: colors.text.default
  },
  contentText: {
    fontFamily: fonts.sfProDisplay.regular,
    fontSize: 14,
    textAlign: 'center'
  },
  linkText: {
    fontFamily: fonts.sfProDisplay.regular,
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: 'blue'
  },
  linkEmail: {
    fontFamily: fonts.sfProDisplay.regular,
    fontSize: 14,
    textAlign: 'left',
    textDecorationLine: 'underline',
    color: 'blue'
  },
  contentModalText: {
    fontFamily: fonts.sfProDisplay.light,
    textAlign: 'left',
  },
  subHeaderModal: {
    fontFamily: fonts.sfProDisplay.bold,
    textAlign: 'left',
    fontSize: 17
  },
  subContentModal: {
    fontFamily: fonts.Akkurat.bold,
    textAlign: 'left',
    fontSize: 14
  },
  photo: {
    height: '60%',
    width: '65%'
  },
  photoSecond: {
    height: '75%',
    width: '60%'
  },
  photoThreeWrapper: {
    flex: 1,
    marginTop: -50,
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default Intro;
