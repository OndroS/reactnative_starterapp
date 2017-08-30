import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
//import _ from 'loadsh'
import {firebaseRef} from '../../services/Firebase'
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import {styles} from './styles'
import {Actions} from 'react-native-router-flux'
import firebase from 'firebase'
import FBSDK, {LoginManager, GraphRequest, GraphRequestManager} from 'react-native-fbsdk'

export default class Facebook extends Component {

  constructor(props){
    super(props);

    this.state = {
      user_id: '',
      user_full_name: '',
      user_first_name: '',
      user_last_name: '',
      user_email: ''
    }

    this._loginFacebok = this._loginFacebok.bind(this)
  }

  componentDidMount() {

  }

  _loginFacebok() {
    const self = this;
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      function(result) {
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          Actions.pagecontrol();
          // Create response callback.
          const responseInfoCallback = function(error, result) {
            if (error) {
              console.log(error)
              alert('Error fetching data: ' + error.toString());
            } else {
              console.log(result)
              self.setState({
                user_id: result.id,
                user_full_name: result.name,
                user_first_name: result.first_name,
                user_last_name: result.last_name,
                user_email: result.email
              })
              self._writeUserData(result.id, result.name, result.first_name, result.last_name, result.email)
              //alert('Success fetching data: ' + result.toString());
            }
          }
          // Create a graph request asking for user email and names with a callback to handle the response.
          const infoRequest = new GraphRequest(
            '/me',
            {
              parameters: {
                fields: {
                  string: 'email,name,first_name,middle_name,last_name'
                }
              }
            },
            responseInfoCallback
          );
          // Start the graph request.
          new GraphRequestManager().addRequest(infoRequest).start()
        }
      },
      function(error) {
        alert('Login fail with error: ' + error);
      }
    );
  }

  _writeUserData(id, fullName, firstName, lastName, email) {
    firebase.database().ref('users/' + id).set({
      user_id: id,
      user_full_name: fullName,
      user_first_name: firstName,
      user_last_name: lastName,
      user_email: email
    });
  }


  _loginClassic() {
    Actions.login()
  }

  render() {

    // Create a graph request asking for user information with a callback to handle the response.

    console.log('NAME ', this.state.user_full_name)

    return (
      <ViewContainer>
        <StatusbarBackground />

        <View style={styles.logo}>
          <Image style={styles.logoImg} source={require('../../resources/logo.png')}/>
        </View>

        <View style={styles.login}>
          <TouchableOpacity style={styles.loginButton} onPress={this._loginFacebok}>
            <Text style={styles.loginButtonText}>
              Facebook login
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.register}>
          <TouchableOpacity style={styles.registerButton} onPress={this._loginClassic}>
            <Text style={styles.registerButtonText}>
              login
            </Text>
          </TouchableOpacity>
        </View>
      </ViewContainer>
    )
  }
}
