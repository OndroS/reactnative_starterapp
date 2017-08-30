import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
//import _ from 'loadsh'
import {firebaseRef} from '../../services/Firebase'
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import {styles} from './styles'
import {Actions} from 'react-native-router-flux'

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      status: ''
    }

    this._login = this._login.bind(this);
    this._register = this._register.bind(this);
  }

  _firebaseLogin () {
    Promise.all([
      firebaseRef.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    ]).then(function (e) {
        if (e) {
          console.log(e)
          Actions.pagecontrol()
        }
    }).catch(function(error){
      console.log(error.code)
      console.log(error.message)
    })
  }

  _login () {
    this._firebaseLogin()
    //Actions.pagecontrol() //DEVELOPER MODE!
  }

  _register () {
    Actions.register()
  }

  _onFocus () {

  }

  render() {
    return (
      <ViewContainer>
        <StatusbarBackground />
        <View style={styles.logo}>
          <Image style={styles.logoImg} source={require('../../resources/logo.png')}/>
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder="EMAIL"
            placeholderTextColor="black"
            autoCorrect={false}
            returnKeyType="next"
          />
          <View style={styles.hairline} />
          <TextInput
            style={styles.textInput}
            onChangeText={(password) => this.setState({password: password})}
            value={this.state.password}
            placeholder="PASSWORD"
            placeholderTextColor="black"
            secureTextEntry={true}
            autoCorrect={false}
            returnKeyType="done"
          />
          <View style={styles.hairline} />
        </View>

        <View style={styles.login}>
          <TouchableOpacity style={styles.loginButton} onPress={this._login}>
            <Text style={styles.loginButtonText}>
              LOG IN
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.register}>
          <TouchableOpacity style={styles.registerButton} onPress={this._register}>
            <Text style={styles.registerButtonText}>
              create account
            </Text>
          </TouchableOpacity>
        </View>
      </ViewContainer>
    )
  }
}
