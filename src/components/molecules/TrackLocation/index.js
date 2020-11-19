import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -7.400206;
const LONGITUDE = 110.913001;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = 'AIzaSyA3KMhK3xy20XzhcHcr6A4dosPEix4SRZA';

class TrackLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      originCoordinate: {
        latitude: 0,
        longitude: 0,
      },
      routeCoordinates: [],
      initialCoordinates: [
        {
          latitude: -7.400206,
          longitude: 110.913001,
        },
        {
          latitude: -7.398565,
          longitude: 110.911993,
        },
      ],
      error: null,
    };
    this.mapView = null;
  }

  componentDidMount() {
    this.watchPosition();
  }

    getMapRegion = () => ({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });

    watchPosition = async () => {
      this.watchID = await Geolocation.watchPosition(
        (position) => {
          const changeOriginCoordinate = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          this.setState({ originCoordinate: changeOriginCoordinate });
          // const { latitude, longitude } = position.coords;
          const { routeCoordinates } = this.state;
          const newCoordinate = changeOriginCoordinate;

          this.setState({ routeCoordinates: routeCoordinates.concat([newCoordinate]) });
          console.log('array of moving', this.state.routeCoordinates);
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 },
      );
    }

    componentWillUnmount() {
      Geolocation.clearWatch(this.watchID);
    }

    onReady = (result) => {
      // console.log('coordinate nih gan', result.coordinates);
      this.mapView.fitToCoordinates(result.coordinates, {
        edgePadding: {
          right: (width / 10),
          bottom: (height / 10),
          left: (width / 10),
          top: (height / 10),
        },
      });
    }

    currentLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(JSON.stringify(position));
          const newCoordinate = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
        }
      );
    }

    onMapViewPress = (msg, e) => {
      this.currentLocation();
      console.log('before slicing', this.state.initialCoordinates);
      console.log('after slicing', this.state.initialCoordinates.splice(0, 1));
      console.log('new coordinate 0', this.state.initialCoordinates);
    }

    render() {
      return (
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            ref={(c) => this.mapView = c}
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            showUserLocation
            showsMyLocationButton
            zoomEnabled
            minZoomLevel={10}
            maxZoomLevel={30}
            followUserLocation
            loadingEnabled
            onLongPress={(e) => this.onMapViewPress('moving a new loc', e)}
          >
            <Marker coordinate={this.state.originCoordinate} />
            <Marker coordinate={this.state.initialCoordinates[1]} />
            <MapViewDirections
              origin={this.state.initialCoordinates[0]}
              destination={this.state.initialCoordinates[1]}
              waypoints={this.state.initialCoordinates.slice(1, -1)}
              mode="DRIVING"
              apikey={GOOGLE_MAPS_APIKEY}
              language="en"
              strokeWidth={4}
              strokeColor="blue"
              onStart={(params) => {
                console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
              }}
              onReady={this.onReady}
            />
          </MapView>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
  },
});

export default TrackLocation;
