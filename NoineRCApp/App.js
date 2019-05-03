
import React, {Component} from 'react';
import {Text, View, Image, StatusBar} from 'react-native';
import RCScan from './src/components/RCScan';
import firebase from 'firebase';

export default class App extends Component{

  state = { splash: true };

  componentWillMount(){
    // Initialize Firebase
    setTimeout(() => this.setState({ splash: false }), 3000);
    if (!firebase.apps.length) {
      const config = {
        apiKey: "AIzaSyDBa5IOIdomv1I8Fi8LCw9ueSsg2_S_doE",
    authDomain: "malpr-4c337.firebaseapp.com",
    databaseURL: "https://malpr-4c337.firebaseio.com",
    projectId: "malpr-4c337",
    storageBucket: "malpr-4c337.appspot.com",
    messagingSenderId: "384049723713"

      };
      firebase.initializeApp(config);
    }
  }

  render() {
   if (this.state.splash) {
     return (
          <View style={{ flex: 1, backgroundColor: '#272727', justifyContent: 'center', alignItems: 'center' }} >
            <StatusBar hidden />
            <View style={{ borderRadius: 100, backgroundColor: 'orange', height: '40%', width: '20%', justifyContent: 'center', alignItems: 'center' }} >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>RCScanner</Text>
            </View>
          </View>
         //<Image source={require('./src/resources/splash.png')} style={{ flex: 1 }} />
     );
   }
   return (
     <View style={{flex:1}}>
       <StatusBar hidden />
       <RCScan />
     </View>
   );
 }
}