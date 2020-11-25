import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Dimensions, Text, Animated, Image, ScrollView, TouchableOpacity
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import { fonts } from '../../../utils';
import { IconMarker } from '../../../assets';
import { Gap, ButtonModal } from '../../atoms';
import { markers } from '../../atoms/MapData';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -7.400206;
const LONGITUDE = 110.913001;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const GOOGLE_MAPS_APIKEY = 'AIzaSyA3KMhK3xy20XzhcHcr6A4dosPEix4SRZA';

const Map = () => {
  const [coffeeCoordinates] = useState(markers);
  const [coffees] = useState([
    {
      name: 'Medusa Coffee',
      score: 1.6666
    },
    {
      name: 'Tempik Coffee',
      score: 1.5666
    },
    {
      name: 'Rumah Posong Coffee',
      score: 1.3245
    },
    {
      name: 'Pentil Coffee',
      score: 0.9876
    },
    {
      name: 'Exelco Coffee',
      score: 0.4567
    },
  ]);
  const [originCoordinate, setOriginCoordinate] = useState({
    latitude: 0,
    longitude: 0
  });
  const [destinationCoordinate, setDestinationCoordinate] = useState({
    latitude: 0,
    longitude: 0
  });
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [error, setError] = useState('');
  const [direct, setDirect] = useState(false);
  let mapIndex = 0;
  const mapAnimation = new Animated.Value(0);

  useEffect(() => {
    onScrollCardToMarker();
    watchPosition();
  });

  const getMapRegion = () => ({
    latitude: originCoordinate.latitude,
    longitude: originCoordinate.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const watchPosition = async () => {
    const watchID = await Geolocation.watchPosition(
      (position) => {
        const changeOriginCoordinate = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        setOriginCoordinate(changeOriginCoordinate);
        const newCoordinate = changeOriginCoordinate;
        console.log('route coordinate ', routeCoordinates);
        setRouteCoordinates(routeCoordinates.concat([newCoordinate]));
      },
      (error) => setError(error.message),
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 },
    );
    return () => Geolocation.clearWatch(watchID);
  };

  const onReady = (result) => {
    _map.current.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: (width / 10),
        bottom: (height / 10),
        left: (width / 10),
        top: (height / 10),
      },
    });
  };

  const onMapViewDirection = () => (
    <MapViewDirections
      origin={originCoordinate}
      destination={destinationCoordinate}
      waypoints={routeCoordinates.slice(1, -1)}
      mode="DRIVING"
      apikey={GOOGLE_MAPS_APIKEY}
      language="en"
      strokeWidth={4}
      strokeColor="blue"
      onStart={(params) => {
        console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
      }}
      onReady={onReady}
    />
  );

  onScrollCardToMarker = () => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= coffeeCoordinates.length) {
        index = coffeeCoordinates.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = coffeeCoordinates[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            },
            350
          );
          const x = mapIndex;
          _scrollViewHeader.current.scrollTo({ x, y: 0, animated: true });
        }
      }, 10);
    });
  };

  const onMarkerPress = (e) => {
    console.log(e.nativeEvent.coordinate.latitude);
  };

  const interpolations = coffeeCoordinates.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp'
    });

    return { scale };
  });

  const onDirection = (destination) => {
    setDirect(true);
    setDestinationCoordinate(destination);
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);
  const _scrollViewHeader = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        showUserLocation
        showsMyLocationButton
        zoomEnabled
        minZoomLevel={15}
        maxZoomLevel={30}
        followUserLocation
        loadingEnabled
      >
        {coffeeCoordinates.map((coordinate, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
              <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate.coordinate} onPress={(e) => onMarkerPress(e)}>
                <Animated.View style={[styles.markerWrap]}>
                  <Animated.Image
                    source={IconMarker}
                    style={[styles.marker, scaleStyle]}
                    resizeMode="cover"
                  />
                </Animated.View>
              </MapView.Marker>
          );
        })}

      <Marker coordinate={originCoordinate}>
          <View style={styles.radiusOrigin}>
              <View style={styles.markerOrigin} />
          </View>
      </Marker>
          {direct && (
          <MapViewDirections
            origin={originCoordinate}
            destination={destinationCoordinate}
            waypoints={routeCoordinates.slice(1, -1)}
            mode="DRIVING"
            apikey={GOOGLE_MAPS_APIKEY}
            language="en"
            strokeWidth={4}
            strokeColor="blue"
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={onReady}
          />
          )}
      </MapView>
      <View style={styles.labelBox}>
          <Text style={styles.labelBoxTitle}>
             skor hasil perhitungan menggunakan promethee
          </Text>
      </View>
      <ScrollView
        ref={_scrollViewHeader}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{ // iOS only
          top: 0,
          left: 0,
          bottom: 0,
          right: 20
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 0
        }}
      >
        {coffees.map((coffee, index) => (
          <TouchableOpacity key={index} style={styles.chipsItem}>
            <Text style={styles.chipsText}>{`${index + 1}). ${coffee.name} : ${coffee.score}`}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        pagingEnabled
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
            {coffeeCoordinates.map((marker, index) => (
              <View style={styles.card} key={index}>
                <Image
                  source={marker.image}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.textContent}>
                  <Text numberOfLines={1} style={styles.cardTitle}>
                    {' '}
                    {marker.title }
                    {' '}
                  </Text>
                  <Text numberOfLines={1} style={styles.cardDescription}>
                    {' '}
                    {marker.description }
                    {' '}
                  </Text>
                  <Text numberOfLines={1} style={styles.cardAddress}>
                    {' '}
                    {marker.address }
                    {' '}
                  </Text>
                  <View style={styles.button}>
                    <ButtonModal icon="direction" title="Petunjuk Arah" type="map" height={14} width={14} onPress={() => onDirection(marker.coordinate)} />
                    <Gap width={10} />
                    <ButtonModal icon="navigation" title="Mulai" type="map" height={12} width={15} />
                  </View>
                </View>
              </View>
            ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
  },
  button: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginTop: 5
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  cardTitle: {
    fontFamily: fonts.Akkurat.bold,
    fontSize: 13,
  },
  cardDescription: {
    fontFamily: fonts.Akkurat.normalItalic,
    fontSize: 12,
    color: '#333',
  },
  cardAddress: {
    fontFamily: fonts.Akkurat.normalItalic,
    fontSize: 11,
    color: '#444',
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 70,
    paddingHorizontal: 10
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsText: {
    fontFamily: fonts.sfProDisplay.medium,
    fontSize: 14
  },
  radiusOrigin: {
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
  markerOrigin: {
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
  marker: {
    width: 19,
    height: 25,
  },
  labelBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
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
  labelBoxTitle: {
    fontSize: 15,
    fontFamily: fonts.sfProDisplay.boldItalic,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
});
export default Map;
