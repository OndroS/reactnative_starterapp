import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import ViewContainer from '../../components/ViewContainer';
import StatusbarBackground from '../../components/StatusbarBackground';
import {styles} from './styles'
import {firebaseRef} from '../../services/Firebase'
import {Actions} from 'react-native-router-flux'

export default class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      verifyPassword: ''
    }

    this._register = this._register.bind(this);
  }

  _register() {
    if (this.state.password == this.state.verifyPassword){
      firebaseRef.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error){
        console.log(error.code);
        console.log(error.message);
      })
      Actions.pagecontrol();
      //TODO: review it and get it done
    } else {
      console.log('Passwords did not match')
    }
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
            returnKeyType="next"
          />
          <View style={styles.hairline} />

          <TextInput
            style={styles.textInput}
            onChangeText={(verifyPassword) => this.setState({verifyPassword: verifyPassword})}
            value={this.state.verifyPassword}
            placeholder="PASSWORD"
            placeholderTextColor="black"
            secureTextEntry={true}
            autoCorrect={false}
            returnKeyType="done"
          />
          <View style={styles.hairline} />
        </View>

        <View style={styles.login}>
          <TouchableOpacity style={styles.loginButton} onPress={this._register}>
            <Text style={styles.loginButtonText}>
              CREATE ACCOUNT
            </Text>
          </TouchableOpacity>
        </View>
      </ViewContainer>
    )
  }
}
