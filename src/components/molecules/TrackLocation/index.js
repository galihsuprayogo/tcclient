import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Mapview, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class TrackLocation extends Component{
    constructor(props) {
        super(props);

        this.state = {
            latitude : 0,
            longitude : 0,
            error : null,
            routeCoordinates : [],
            destination : {
                latitude : -7.386105,
                longitude : 110.914015
            }
        }
    }

    componentDidMount() {
        this.watchPosition();
    }

    getMapRegion = () => ({
        latitude : this.state.latitude,
        longitude : this.state.longitude,
        latitudeDelta : LATITUDE_DELTA,
        longitudeDelta : LONGITUDE_DELTA
    });

    watchPosition = () => {
        this.watchID = Geolocation.watchPosition(
            position => {
                console.log(position);
                const { latitude, longitude }  = position.coords;
                const { routeCoordinates } = this.state;
                const newCoordinate = { latitude, longitude };

                this.setState({
                    latitude,
                    longitude,
                    routeCoordinates : routeCoordinates.concat([newCoordinate])
                });
            },
            error => this.setState({error : error.message}),
            {enableHighAccuracy : true, timeout: 200000, maximumAge : 1000}
        )
    }

    componentWillUnmount() {
        Geolocation.clearWatch(this.watchID)
    }

    render() {
        return(
            <View style={styles.container}>
                <Mapview
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={this.getMapRegion()}
                    showUserLocation={true}
                    showsMyLocationButton={true}
                    zoomEnabled={true}
                    zoomControlEnabled={true}
                    minZoomLevel={15}
                    maxZoomLevel={20}
                    followUserLocation={true}
                    loadingEnabled={true}
                >
                    <Polyline coordinates={this.state.routeCoordinates} strokeWidth={2} />
                    <Marker coordinate={this.getMapRegion()} />
                </Mapview>
            </View>
        )
    }
}

const styles  = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height : '100%',
    },
})

export default TrackLocation;
