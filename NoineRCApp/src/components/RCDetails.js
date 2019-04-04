import React, {Component} from 'react';
import {Button, View, Text, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import { Dimensions } from 'react-native';
import InputForm from './InputForm';
import { blue } from 'ansi-colors';

export default class RCDetails extends Component{

    state = {name:'', contact:'', numPlate:''}
    screenWidth = 0;
    screenHeight = 0;


    componentWillMount(){
        this.screenWidth = Dimensions.get('window').width;
        this.screenHeight = Dimensions.get('window').height;
    }

    render()
    {
        return(
            <View style={{height:'100%', backgroundColor:'#EEEEEE'}}>
            <ScrollView contentContainerStyle={{alignItems:'center', marginTop:20, backgroundColor:'#EEEEEE'}} style={{flex:1}}>

                <View  style={{width:'30%', height:this.screenHeight/10, backgroundColor:'blue'}}>
                    <TouchableOpacity>
                        <Text>Tap</Text>
                    </TouchableOpacity>
                </View>

                <View style={{alignItems:'center', width:'80%', marginTop:10}}>
                    <InputForm
                        onChangeText={name => this.setState({ name: name })}
                        value={this.state.name}
                        label="Name"
                    />
                </View>

                <View style={{alignItems:'center', width:'80%', marginTop:10}}>
                    <InputForm
                        onChangeText={contact => this.setState({ contact: contact })}
                        value={this.state.contact}
                        label="Contact"
                    />
                </View>

                <View style={{alignItems:'center', width:'80%', marginTop:10}}>
                    <InputForm
                        onChangeText={numPlate => this.setState({ numPlate: numPlate })}
                        value={this.state.numPlate}
                        label="Prlate"
                    />
                    <Text style={{alignSelf:'flex-start', fontSize:18, marginTop:15}}>Processing</Text>
                </View>

                <View style={{ justifyContent:'center', marginTop:20, borderRadius:25, width:'100%', alignItems:'center'}}>
                    <TouchableOpacity style={{alignItems:'center',justifyContent:'center', width:'20%', height:this.screenHeight/10, backgroundColor:'#272727', borderRadius:25}}>
                        <Text style={{color:'orange', fontSize:18}}>Submit</Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
            </View>
        )
    }

}