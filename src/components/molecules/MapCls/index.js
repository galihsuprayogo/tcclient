import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Platform,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import {PERMISSIONS, request} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import {colors, fonts} from '../../../utils';
import {Icon, Button, ButtonModal, Gap} from '../../../components'
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

class MapCls extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initialPosition : {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            },
            markerPosition: {
                latitude: 0,
                longitude: 0,
            },
            addressPosition : '',
            iconValue : '',
            modalVisible : false,
            propSwipe : false,
            error : null
        };
    }

    componentDidMount() {
        this.requestLocationPermission();
    }

    requestLocationPermission = async () => {
        if(Platform.OS === 'android'){
            var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            if(response === 'granted'){
                this.currentLocation();
            }
        }else {
            var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
            if(response === 'granted'){
                this.currentLocation();
            }
        }
    }

    currentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                console.log(JSON.stringify(position));
                var initialRegion = {
                    latitude : position.coords.latitude,
                    longitude : position.coords.longitude,
                    latitudeDelta : LATITUDE_DELTA,
                    longitudeDelta : LONGITUDE_DELTA
                }
                var initialMarker = {
                    latitude : position.coords.latitude + SPACE,
                    longitude : position.coords.longitude + SPACE,
                }
                this.setState({initialPosition : initialRegion})
                this.setState({markerPosition : initialMarker})
            },
            error => this.setState({error : error.message}),
            {enableHighAccuracy : true, timeout : 10000, maximumAge : 1000},
        )
    }

    modalProp = () => {
        return (
                <Modal
                    isVisible={this.state.modalVisible}
                    hasBackdrop={false}
                    propagateSwipe={this.state.propSwipe}
                    style={{flex : 1}}
                    onBackdropPress={ () => alert('halo gan')}
                >
                    <View style={{ flex: 1,  flexDirection : 'column', justifyContent: 'space-between'}}>
                        <View style={styles.textInputWrapper}>
                            <Icon icon={'aright'}/>
                            <TextInput
                                style={styles.textInput}
                                value={this.state.markerPosition.latitude.toString() + ','+this.state.markerPosition.longitude.toString()}
                                placeholderTextColor ={'black'}
                                editable={false}
                            />
                            <Button
                                type={'icon-button'}
                                icon={this.state.iconValue}
                                onPress={() => {
                                    var resetPosition = {
                                        latitude: 0,
                                        longitude: 0,
                                    }
                                    this.setState({modalVisible:false})
                                    this.setState({markerPosition : resetPosition})
                                }}
                            />
                        </View>
                            <View style={styles.modalFooter}>
                                <Text style={styles.headingFooter}> {this.state.addressPosition} </Text>
                                    <ScrollView
                                        horizontal={true}
                                        contentContainerStyle={{ width: `${100 * 2}%` }}
                                        showsHorizontalScrollIndicator={false}
                                        scrollEventThrottle={100}
                                        decelerationRate="fast"
                                        pagingEnable
                                    >
                                        <View style={styles.contentFooter} onStartShouldSetResponder={() => true}>
                                            <Gap width={10}/>
                                            <ButtonModal icon={'beenhere'} title={'Simpan Lokasi'}/>
                                            <Gap width={10}/>
                                            <ButtonModal icon={'direction'} title={'Petunjuk Arah'}/>
                                            <Gap width={10}/>
                                            <ButtonModal icon={'navigation'} title={'Mulai'}/>
                                        </View>
                                    </ScrollView>
                            </View>
                    </View>
                </Modal>
        )
    }

    onMapViewPress = async  (eventName, e) => {
        // console.log(eventName, e.nativeEvent)
        var presLocation = {
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
        }
        var presRegion = {
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }
        var NY = {
            id : 1,
            lat: e.nativeEvent.coordinate.latitude,
            lng: e.nativeEvent.coordinate.longitude
        };
        this.setState({initialPosition: presRegion})
        this.setState({markerPosition: presLocation})

        Geocoder.fallbackToGoogle("AIzaSyA3KMhK3xy20XzhcHcr6A4dosPEix4SRZA");
        await Geocoder.geocodePosition(NY).then(res => {
            this.setState({addressPosition : res[1].formattedAddress.toString()})
            this.setState({iconValue:'x'})
            this.setState({propSwipe:true})
            this.setState({modalVisible:true})
            console.log(res[1].formattedAddress)
        }).catch(err => {
            this.setState({addressPosition : this.state.markerPosition.latitude.toString() + ','+ this.state.markerPosition.longitude.toString()})
            this.setState({iconValue:'x'})
            this.setState({propSwipe:true})
            this.setState({modalVisible:true})
        })
    }

    render() {
        return (
            <View style={styles.container}>
                    {
                        this.modalProp()
                    }
                <MapView
                    provider={this.props.provider}
                    showUserLocation={true}
                    showsMyLocationButton={true}
                    zoomEnabled={true}
                    zoomControlEnabled={true}
                    minZoomLevel={15}
                    maxZoomLevel={20}
                    style={styles.map}
                    region={this.state.initialPosition}
                    scrollEnabled={true}
                    onLongPress={e => this.onMapViewPress('onMapPress',e)}
                >
                    <Marker
                        coordinate={this.state.markerPosition}
                    >
                        <View style={styles.radius}>
                            <View style={styles.marker}/>
                        </View>
                    </Marker>
                </MapView>
            </View>
        );
    }
}

MapCls.propTypes = {
    provider: ProviderPropType,
};

const styles = StyleSheet.create({
    container: {
        flex : 1,
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height : '100%',
    },
    textInput : {
        color : colors.text.default,
        fontFamily : fonts.sfProDisplay.regular,
        fontSize : 14,
        textAlign  : 'center',
    },
    textInputWrapper : {
        borderRadius : 7,
        backgroundColor : 'white',
        paddingHorizontal: 10,
        paddingTop : 5,
        flexDirection: 'row',
        alignItems : 'center',
        justifyContent: 'space-between'
    },
    modalFooter : {
        borderRadius : 5,
        backgroundColor : 'white',
        paddingVertical : 15,
    },
    contentFooter : {
        flexDirection: 'row',
    },
    headingFooter : {
        textAlign: 'center',
        paddingBottom : 10,
        color : colors.text.default,
        fontFamily: fonts.sfProDisplay.regular,
        fontSize: 15
    },
    radius : {
        height : 50,
        width : 50,
        borderRadius : 50/2,
        overflow : 'hidden',
        backgroundColor : 'rgba(0,122,255,0.1)',
        borderWidth : 1,
        borderColor : 'rgba(0,122,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    marker : {
        height : 20,
        width : 20,
        borderRadius : 20/2,
        borderWidth: 3,
        borderColor: 'white',
        overflow: 'hidden',
        backgroundColor : '#007AFF'
    }
});

export default MapCls;
