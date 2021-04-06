import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  BackHandler,
  Image,
  TouchableOpacity
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import { getUser, storeUser } from '../../../config';
import { fonts, showInfo, colors } from '../../../utils';
import { IconMarker } from '../../../assets';
import {
  Icon, ButtonModal, Gap,
} from '../..';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapPoint = ({ navigation }) => {
  const [initialPosition, setInitialPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  const [markerPosition, setMarkerPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [newMarkerPosition, setNewMarkerPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [cardFooter, setCardFooter] = useState(false);
  const [cardHeader, setCardHeader] = useState(false);
  const [backHeader, setBackHeader] = useState(true);
  const [flag, setFlag] = useState(false);
  const [addressPosition, setAddressPosition] = useState('');

  useEffect(() => {
    const timeout = setTimeout(async () => {
      showInfo('TCoffee App mengumpulkan informasi lokasi anda. Tahan pada area lokasi yang ingin di simpan, lalu lepas untuk menyimpan.');
      currentLocation();
    });
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('backPress', onBackHandling);
    return () =>
      BackHandler.removeEventListener('backPress', onBackHandling);
  });

  const onBackHandling = () => {
    const resetPosition = {
      latitude: markerPosition.latitude,
      longitude: markerPosition.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    setInitialPosition(resetPosition);
    navigation.goBack();
    console.log('did cancel');
  };

  const currentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const initialRegion = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        const initialMarker = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setInitialPosition(initialRegion);
        setMarkerPosition(initialMarker);
      },
      (error) => alert(error.message),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 3000 },
    );
  };

  const onMapLongPress = async (e) => {
    setFlag(true);
    setCardHeader(true);
    setCardFooter(true);
    const presLocation = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    };
    const presRegion = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    const NY = {
      id: 1,
      lat: e.nativeEvent.coordinate.latitude,
      lng: e.nativeEvent.coordinate.longitude,
    };
    setInitialPosition(presRegion);
    setNewMarkerPosition(presLocation);
    Geocoder.fallbackToGoogle('AIzaSyA3KMhK3xy20XzhcHcr6A4dosPEix4SRZA');
    await Geocoder.geocodePosition(NY).then((res) => {
      setAddressPosition(res[1].formattedAddress.toString());
    }).catch((err) => {
      setAddressPosition(`${newMarkerPosition.latitude.toString()},${newMarkerPosition.longitude.toString()}`);
    });
  };

  const onMapPress = () => {
    const clearLocation = {
      latitude: 0,
      longitude: 0,
    };
    setNewMarkerPosition(clearLocation);
    setCardHeader(false);
    setCardFooter(false);
    setFlag(false);
  };

  const backPressInitialPosition = () => {
    const backLocation = {
      latitude: markerPosition.latitude,
      longitude: markerPosition.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    setInitialPosition(backLocation);
  };

  const directPressInitialLocation = () => {
    const directLocation = {
      latitude: -7.33436,
      longitude: 110.03738,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    setInitialPosition(directLocation);
  };

  const onSaveModal = () => {
    getUser('user').then((res) => {
      const data = res;
      data.address = addressPosition;
      data.latitude = newMarkerPosition.latitude.toString();
      data.longitude = newMarkerPosition.longitude.toString();
      storeUser('user', res);
    });
    setCardHeader(false);
    setCardFooter(false);
    setBackHeader(false);
    setFlag(false);
    navigation.goBack();
  };

  const onCancelModal = () => {
    const backLocation = {
      latitude: markerPosition.latitude,
      longitude: markerPosition.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    setInitialPosition(backLocation);
    setCardHeader(false);
    setCardFooter(false);
    setFlag(false);
    setBackHeader(true);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        showUserLocation
        showsMyLocationButton
        zoomEnabled
        minZoomLevel={17}
        maxZoomLevel={30}
        style={styles.map}
        region={initialPosition}
        scrollEnabled
        onLongPress={(e) => onMapLongPress(e)}
        onPress={(e) => onMapPress(e)}
      >
          <Marker
            coordinate={markerPosition}
          >
            <View style={styles.radius}>
              <View style={styles.marker} />
            </View>
          </Marker>
          {flag && (
            <Marker
              coordinate={newMarkerPosition}
            >
              <View style={styles.markerWrap}>
                   <Image
                     source={IconMarker}
                     style={styles.markerPoint}
                   />
              </View>
            </Marker>
          )}
      </MapView>
          {backHeader && (
                <TouchableOpacity style={styles.cardBackWrapper} onPress={() => navigation.goBack()}>
                  <Icon icon="icon-back-map" />
                  <Text style={styles.cardBackContent}>
                   Kembali
                  </Text>
                </TouchableOpacity>
          )}
          {cardHeader && (
            <View style={styles.cardHeaderWrapper}>
              <Text style={styles.cardHeaderContent}>
                {`${newMarkerPosition.latitude.toString()},${newMarkerPosition.longitude.toString()}`}
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.buttonDirectWrapper}
            onPress={directPressInitialLocation}
          >
              <Icon icon="icon-to-location" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonInitialWrapper}
            onPress={backPressInitialPosition}
          >
              <Icon icon="icon-back-location" />
          </TouchableOpacity>
          {cardFooter && (
            <View style={styles.cardFooterWrapper}>
                <Text style={styles.cardFooterContent}>
                    {addressPosition}
                </Text>
                <View style={styles.buttonModalWrapper}>
                    <ButtonModal icon="beenhere" title="Simpan" type="map" height={14} width={10} onPress={onSaveModal} />
                    <Gap width={10} />
                    <ButtonModal icon="xlight" title="Batal" type="map" height={12} width={10} onPress={onCancelModal} />
                </View>
            </View>
          )}
    </View>
  );
};

export default MapPoint;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%'
  },
  buttonModalWrapper: {
    flexDirection: 'row',
    marginTop: 10
  },
  cardHeaderWrapper: {
    position: 'absolute',
    top: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  cardBackWrapper: {
    position: 'absolute',
    top: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
    width: '25%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 8,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    left: 10
  },
  cardHeaderContent: {
    fontSize: 14,
    fontFamily: fonts.sfProDisplay.medium,
  },
  cardBackContent: {
    fontSize: 14,
    fontFamily: fonts.sfProDisplay.bold,
    color: colors.text.default
  },
  cardFooterWrapper: {
    position: 'absolute',
    bottom: 15,
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  cardFooterContent: {
    fontSize: 14,
    fontFamily: fonts.sfProDisplay.medium,
    textAlign: 'center'
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,122,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,122,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    borderWidth: 3,
    borderColor: 'white',
    overflow: 'hidden',
    backgroundColor: '#007AFF',
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  markerPoint: {
    width: 19,
    height: 25,
  },
  buttonInitialWrapper: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonDirectWrapper: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
