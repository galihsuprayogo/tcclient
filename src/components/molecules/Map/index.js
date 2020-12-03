import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Dimensions, Text, Animated, Image, ScrollView, TouchableOpacity
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import { fonts, colors } from '../../../utils';
import { IconMarker, IconGoogle } from '../../../assets';
import { Gap, ButtonModal } from '../..';
import { Button } from '..';
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
  const [fit, setFit] = useState([]);
  const [error, setError] = useState('');
  const [direct, setDirect] = useState(false);
  const [cardFooter, setCardFooter] = useState(true);
  const [cardHeader, setCardHeader] = useState(true);
  const [cardButton, setCardButton] = useState(false);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [zoom, setZoom] = useState(15);
  const [boxOne, setBoxOne] = useState(true);
  const [boxTwo, setBoxTwo] = useState(false);
  let mapIndex = 0;
  const mapAnimation = new Animated.Value(0);

  useEffect(() => {
    onScrollCardToMarker();
    watchPosition();
    console.log('route coordinate ', routeCoordinates);
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
        // setRouteCoordinates(routeCoordinates.concat([changeOriginCoordinate]));
      },
      (error) => setError(error.message),
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 },
    );
    return () => Geolocation.clearWatch(watchID);
  };

  const onReady = (result) => {
    setFit(result);
    _map.current.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: (width / 10),
        bottom: (height / 10),
        left: (width / 10),
        top: (height / 10),
      },
    });
    setTime(result.duration);
  };

  const onMapViewDirection = () => (
    <MapViewDirections
      origin={originCoordinate}
      destination={destinationCoordinate}
      waypoints={routeCoordinates.slice(1, 0)}
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

  const onStart = () => {
    setCardFooter(false);
    setCardHeader(false);
    setCardButton(true);
    setBoxOne(false);
    setBoxTwo(true);
    setZoom(22);
    setTimeTraveler();
  };

  const offStart = () => {
    setCardFooter(true);
    setCardHeader(true);
    setCardButton(false);
    setBoxOne(true);
    setBoxTwo(false);
    setZoom(15);
  };
  const setTimeTraveler = () => {
    var d = Number(time);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : '';
    var mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : '';
    var sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : '';

    console.log(console.log(hDisplay, mDisplay, sDisplay));
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
        region={getMapRegion()}
        showUserLocation
        showsMyLocationButton
        zoomEnabled
        minZoomLevel={zoom}
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
            onMapViewDirection()
          )}
      </MapView>
      {boxOne && (
        <View style={styles.labelBox}>
            <Text style={styles.labelBoxTitle}>
              skor hasil perhitungan menggunakan promethee
            </Text>
        </View>
      )}
      {boxTwo && (
        <View style={styles.labelBoxSecond}>
            <Text style={styles.labelBoxTitleSecond}>
              Petunjuk Arah
            </Text>
        </View>
      )}
      {cardHeader && (
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
      )}
      {cardFooter && (
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
                    <ButtonModal icon="navigation" title="Mulai" type="map" height={12} width={15} onPress={() => onStart()} />
                  </View>
                </View>
              </View>
            ))}
      </Animated.ScrollView>
      )}
      { cardButton && (
      <View style={styles.labelBoxBottom}>
          <IconGoogle />
        <View style={styles.labelBoxBottomTextWrapper}>
          <Text style={styles.labelBoxBottomTextTime}> Mins </Text>
          <Text style={styles.labelBoxBottomTextDuration}> Km </Text>
        </View>
        <TouchableOpacity style={styles.labelBoxBottomButton} onPress={() => offStart()}>
            <Button type="icon-button" icon="x" onPress={() => offStart()} />
        </TouchableOpacity>
      </View>
      )}
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
  labelBoxSecond: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 10 : 5,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'green',
    width: '95%',
    height: '14%',
    alignItems: 'center',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  labelBoxTitleSecond: {
    fontSize: 25,
    fontFamily: fonts.sfProDisplay.heavy,
    color: 'white'
  },
  labelBoxBottom: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '100%',
    height: '9%',
    alignItems: 'center',
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
    padding: 20,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  labelBoxBottomButton: {
    borderWidth: 2,
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    borderColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelBoxBottomTextWrapper: {
    alignItems: 'center'
  },
  labelBoxBottomTextTime: {
    fontSize: 18,
    fontFamily: fonts.Akkurat.bold
  },
  labelBoxBottomTextDuration: {
    fontSize: 15,
    fontFamily: fonts.Akkurat.normal
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
