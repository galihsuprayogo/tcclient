import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, Image, Platform, Dimensions } from 'react-native';
import { Icon } from '../../../components';
import MapView, {
    PROVIDER_GOOGLE,
    Marker,
    Callout,
    Polygon
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';

const Map = () => {

    const { width, height } = Dimensions.get('window')
    const SCREEN_HEIGHT = height
    const SCREEN_WIDTH = width
    const ASPECT_RATIO = width/height
    const LATTITUDE_DELTA = 0.0922
    const LONGTITUDE_DELTTA = LATTITUDE_DELTA * ASPECT_RATIO


    const [initialPosition, setInitialPosition] = useState({
        latitude : 0,
        longitude : 0,
        latitudeDelta : 0,
        longitudeDelta : 0
    })

    const [markerPosition, setMarkerPosition] = useState({
        latitude : 0,
        longitude : 0
    })

    useEffect(() => {
        requestLocationPermission();
    });

    const requestLocationPermission = async () => {
        if(Platform.OS === 'android'){
            var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            if(response === 'granted'){
                currentLocation();
            }
        }else {
            var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
            if(response === 'granted'){
                currentLocation();
            }
        }
    }

    const currentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                console.log(JSON.stringify(position));
                var initialPosition = {
                    latitude : position.coords.latitude,
                    longitude : position.coords.longitude,
                    latitudeDelta : LATTITUDE_DELTA,
                    longitudeDelta : LONGTITUDE_DELTTA
                }
                var markerPosition = {
                    latitude : position.coords.latitude,
                    longitude : position.coords.longitude
                }
                setInitialPosition(initialPosition)
                setMarkerPosition(markerPosition)
            },
            error => Alert.alert(error.message),
            {enableHighAccuracy : true, timeout : 10000, maximumAge : 1000}
        )
    }

    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            showUserLocation={true}
            style={styles.mapWrapper}
            region={initialPosition}>
            <Marker coordinate={markerPosition}>
            </Marker>
        </MapView>
    )
}

const styles = StyleSheet.create({
    mapWrapper : {
        height : '100%'
    }
})
export default Map;
