import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -7.386105;
const LONGITUDE = 110.914015;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapDirection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: [
        {
          latitude: -7.400158,
          longitude: 110.912995,
        },
        {
          latitude: -7.386105,
          longitude: 110.914015,
        },
      ],
    };
    this.mapView = null;
  }

    onMapPress = (e) => {
      this.setState({
        coordinates: [
          ...this.state.coordinates,
          e.nativeEvent.coordinate,
        ],
      });
    }

    render() {
      return (
        <MapView
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={StyleSheet.absoluteFill}
          ref={(c) => this.mapView = c}
          onPress={this.onMapPress}
        >
          {this.state.coordinates.map((coordinate, index) => <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />)}
          {(this.state.coordinates.length >= 2) && (
            <MapViewDirections
              origin={this.state.coordinates[0]}
              waypoints={(this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1) : []}
              destination={this.state.coordinates[this.state.coordinates.length - 1]}
              apikey="AIzaSyA3KMhK3xy20XzhcHcr6A4dosPEix4SRZA"
              strokeWidth={3}
              strokeColor="hotpink"
              optimizeWaypoints
              onStart={(params) => {
                console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
              }}
              onReady={(result) => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);

                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: (width / 20),
                    bottom: (height / 20),
                    left: (width / 20),
                    top: (height / 20),
                  },
                });
              }}
              onError={(errorMessage) => {
                console.log(errorMessage);
              }}
            />
          )}
        </MapView>
      );
    }
}

export default MapDirection;
