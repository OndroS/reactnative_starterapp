import React, {Component} from 'react'
import {View, Text, Image, ListView, StyleSheet, Dimensions} from 'react-native'
import MapView from 'react-native-maps'
import ViewContainer from '../components/ViewContainer'
import StatusbarBackground from '../components/StatusbarBackground'

const {width, height} = Dimensions.get('window');

const SCREEN_HIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATION = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGTITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATION;

export default class Discover extends Component {
  constructor(props) {
    super(props)

    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      }
    }
  }

  watchID: ?number = null;

  componentDidMount() {
   navigator.geolocation.getCurrentPosition((position) => {
     var lat = parseFloat(position.coords.latitude);
     var long = parseFloat(position.coords.longitude);

     var initialRegion = {
       latitude: lat,
       longitude: long,
       latitudeDelta: LATITUDE_DELTA,
       longitudeDelta: LONGTITUDE_DELTA
     }

     this.setState({initialPosition: initialRegion})
     this.setState({markerPosition: initialRegion})
   }, (error) => {
     alert(JSON.stringify(error)),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
   })

   this.watchID = navigator.geolocation.watchPosition((position) => {
     var lat = parseFloat(position.coords.latitude);
     var long = parseFloat(position.coords.longitude);

     var lastRegion = {
       latitude: lat,
       longitude: long,
       latitudeDelta: LATITUDE_DELTA,
       longitudeDelta: LONGTITUDE_DELTA
     }

     this.setState({initialPosition: lastRegion})
     this.setState({markerPosition: lastRegion})

   })

  }

  componentWillUnmount() {
    navigator.geolocation.cleclearWatch(this.watchID)
  }

   componentWillUnmount() {
     navigator.geolocation.clearWatch(this.watchID);
   }

  render() {
    return (
      <ViewContainer>
        <StatusbarBackground />
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={this.state.initialPosition}
          >
            <MapView.Marker
              coordinate={this.state.markerPosition}
            >
              <View style={styles.radius}>
                <View style={styles.marker}/>
              </View>
            </MapView.Marker>
          </MapView>
        </View>
      </ViewContainer>
    )
  }
}

const styles = StyleSheet.create({
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 112, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'
  }
})
