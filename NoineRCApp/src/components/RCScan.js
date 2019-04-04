import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
// symbol polyfills
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');

// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

export default class RCScan extends Component{

    
    render(){
        return(
            <View>
            <Text>asda</Text>
           </View>
        )
    }


  }
