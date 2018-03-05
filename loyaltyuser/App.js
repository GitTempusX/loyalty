import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import firebase from 'firebase';
import Expo from 'expo';

import ProductsList from './assets/containers/ProductsList';
import QRScreen from './assets/containers/QRScreen';
import reducers from './assets/reducers';
import Login from './assets/containers/Login';
import SignIn from './assets/containers/SignIn';
import Logout from './assets/containers/Logout';
import Scanner from './assets/containers/Scanner';

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async componentWillMount(){
    firebase.initializeApp({
      apiKey: 'AIzaSyC5Krk8fIY2fJFNbiODvXlslj9x97HsAko',
      authDomain: 'loyalty-eb0a2.firebaseapp.com',
      databaseURL: 'https://loyalty-eb0a2.firebaseio.com',
      projectId: 'loyalty-eb0a2',
      storageBucket: 'loyalty-eb0a2.appspot.com',
      messagingSenderId: '123456789',
    });

    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      console.log("Error");
      return <View/>;
    }
    return (
      <Provider store={createStore(reducers)}>
        <Router>
          <Scene hideNavBar>
            <Scene
              key='Login'
              component={Login}
            />
            <Scene 
              key='Logout'
              component={Logout}
            />
            <Scene
              key='SignIn'
              component={SignIn}
            />
            <Scene key='Main' initial>
              <Scene key='Products' component={ProductsList} title='Products List' initial/>
              <Scene key='QRCode' component={QRScreen} title='Codigo QR'/>
            </Scene>

            <Scene
              key='Scanner'
              component={Scanner}
            />
          </Scene>
            
        </Router>
      </Provider>

    );
  }
}
