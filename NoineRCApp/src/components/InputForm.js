
import React from 'react';
import { View, Text, TextInput } from 'react-native';
const InputForm = props => {
  return (
    <View style={styles.containerStyle}>
      <View style={styles.containerStyle2}>
        <Text style={styles.labelStyle}>{props.label}</Text>
      </View>
      <TextInput
        secureTextEntry={props.secureTextEntry}
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        autoCorrect={false}
        style={[styles.inputStyle, props.style]}
        value={props.value}
        onChangeText={props.onChangeText}
        multiline = {props.multiline}
      />
    </View>
  );
};
const styles = {
  inputStyle: {
    width: '80%',
    height:'100%',
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
  },
  labelStyle: {
    fontSize: 18,
    padding: 5,
    color:'#272727',
    borderRadius:20,
    backgroundColor: 'orange',
  },
  containerStyle2: {
    width:100,
    backgroundColor: 'orange',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: 'orange',
    justifyContent:'center'
  },
  containerStyle: {
    flexDirection: 'row',
    borderRadius: 20,
    borderColor: '#757575',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 11,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
  },
};

export default InputForm