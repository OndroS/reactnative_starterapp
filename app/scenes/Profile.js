import React, {Component} from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusbarBackground from '../components/StatusbarBackground'
import firebase from 'firebase'

export default class Profile extends Component {

  getUserProfileData() {

  }

  render() {

    console.log('getUserProfileData ', this.getUserProfileData())

    return (
      <ViewContainer>
        <StatusbarBackground />

        <View style={styles.profilePicture}>
          <View style={styles.profilePictureBorder}>
          <Image style={styles.profilePictureImage} source={require('../resources/logo.png')} />
          </View>
        </View>

        <View style={styles.name}>
          <Text style={styles.nameText}>
            ONDREJ SARNECKY
          </Text>
        </View>

        <View style={styles.runnersDescription}>
          <Text style={styles.runnersDescriptionText}>
            LOREM IPSUM DOLOR IT SAMET
          </Text>
          <Text style={styles.runnersDescriptionText}>
            TA LEBO PRETO LEBO ZATO TATO 
          </Text>
          <Text style={styles.runnersDescriptionText}>
            LEBO DACO ZACO NACO PRECO
          </Text>
        </View>

        <View style={styles.personalDescription}>
          <View style={styles.columnOne}>
            <Text style={styles.personalDescriptionText}>COUNTRY OF BIRTH</Text>
            <Text style={styles.personalDescriptionText}>YEAR OF BIRTH</Text>
            <Text style={styles.personalDescriptionText}>CURRENT CITY</Text>
          </View>
          <View style={styles.columnTwo}>
            <Text style={styles.personalDescriptionText}>SLOVAKIA</Text>
            <Text style={styles.personalDescriptionText}>1993</Text>
            <Text style={styles.personalDescriptionText}>BRATISLAVA</Text>
          </View>
        </View>
      </ViewContainer>
    )
  }
}

const styles = StyleSheet.create({
  profilePictureBorder: {
    borderWidth: 1,
    borderColor: '#2C0F66',
    width: 102,
    overflow: 'hidden'
  },
  profilePictureImage: {
    width: 100,
    height: 100
  },
  profilePicture: {
    alignItems: 'center',
    marginTop: 80
  },
  name: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 24
  },
  nameText: {
    fontSize: 24,
    color: '#2C0F66'
  },
  runnersDescription: {
    alignItems: 'center',
    marginBottom: 100,
    paddingRight: 35,
    paddingLeft: 35
  },
  runnersDescriptionText: {
    fontSize: 12
  },
  personalDescription: {
    flex: 1,
    flexDirection: 'row'
  },
  personalDescriptionText: {
    fontSize: 12,
    marginBottom: 40
  },
  columnOne: {
    flex: 1,
    paddingLeft: 70
  },
  columnTwo: {
    flex: 1,
    paddingLeft: 70
  }
})
