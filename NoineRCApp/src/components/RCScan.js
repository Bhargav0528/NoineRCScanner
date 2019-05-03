import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
  Platform,
  ScrollView,
  ActivityIndicator,
  Picker
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import { RNDocScanner } from 'rn-doc-scanner';
import InputForm from './InputForm';

// symbol polyfills
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');

// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

export default class RCScan extends Component{

    state = {name: '', contact: '', numPlate: '', clicked: false ,
    imageuri: '', processing: false, plateText: '', flaskurl: '',
    testImage: null, fillDetails: false, Notif: 'Loading...',
    driveruri:'', licenseuri:'', clickingFor: 'plate', picked: false,
  subjects: {a:'---',b:'aaa', c:'bbb', d: 'ccc'}, currState: '',
  states: ['Choose State','KA','MH','AP','DE','TE']};

    screenWidth = 0;
    screenHeight = 0;

    componentWillMount() {
        this.screenWidth = Dimensions.get('window').width;
        this.screenHeight = Dimensions.get('window').height;
    }

    cleanUrl(url){
      url = url.replace('%2F','%252F');
      return url
    }

    async getNumPlate() {
      console.log("processing")
      try {
        url = this.state.flaskurl
        url = this.cleanUrl(url)
        console.log("URLLLLLLLLLLL",url)
        let response = await fetch(
          //'https://morning-brushlands-82535.herokuapp.com/card?url='+url+"&state="+this.state.currState
          'https://10.60.2.49/card?url='+url+"&state="+this.state.currState

          //'http://192.168.1.7:5000/plate?url=https://i.ibb.co/7RLK4PM/test1.jpg'
        );
        console.log("Banthu")
        js = await response.json()
        console.log(js.card);
        this.setState({processing:true, plateText:js.card, subjects: js.card})
      } catch (error) {
        console.error(error);
      }
    }

    _handleCamera = () => {
      // argument false means auto document detection
      // argument true means manual cropping
      if(this.state.clickingFor === 'driver' || this.state.clickingFor === 'license')
        this.setState({ fillDetails: true }, ()=>{
          this.uploadDetails.bind(this) });
      else {
        RNDocScanner.getDocumentCrop(true, this.state.imageuri)
          .then(res => {
            console.log(res)
            this.setState({ testImage: res, fillDetails: true }, ()=>{
              this.uploadDetails() })
          })
          .catch(err => {
            console.log(err)
          })
        }
      }

    uploadDetails()
    {
      console.log(
      "dasda"
      )
      const Blob = RNFetchBlob.polyfill.Blob
      const fs = RNFetchBlob.fs
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
      window.Blob = Blob

      console.log(
        "dssasda"
        )

    const uploadImage = (uri, imageName, mime = 'image') => {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        let uploadBlob = null
      const imageRef = firebase.storage().ref().child(imageName)
        fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          console.log(imageRef.getDownloadURL)
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          //firebase.database().ref(`branch/${this.state.branch}/notes/sem_${this.state.sem}/${this.state.subject}`).push().key

              //ToastAndroid.show('Processing', ToastAndroid.SHORT);
              console.log(url)
              this.setState({processing:null, flaskurl:url},()=>{
                this.getNumPlate()
              })

              resolve(url)
            });



        })

    }
    console.log("adsasd")
     ToastAndroid.show('Processing, Please Wait...',ToastAndroid.SHORT)
     //console.log('chapName', this.state.chap+`${this.state.mimeType.split("/")[1]}`)
     g= uploadImage(this.state.testImage, "Hello2" , ".jpg")

    }


    takeDriverPic()
    {
      if(this.state.driveruri !== '')
      {
        return <View style={{width:'100%', height:'100%', borderRadius:20, elevation:6, alignItems:'center', justifyContent:'center'}}>
          <Image source={{uri:this.state.driveruri}} style={{width:'80%', height:'80%'}} />
        </View>
      }
      else
      {
        return <TouchableOpacity style={{width:'100%', height:'100%', borderRadius:20, elevation:6, alignItems:'center', justifyContent:'center'}} onPress={()=>{
          this.setState({clicked: false, clickingFor: 'driver'}
          )
        }}>
          <Image source={require('../resources/pic.png')} style={{width:'40%', height:'60%',scaleX:1.4, scaleY:1.4}} />
                        <Text style={{fontSize:17, color:'black'}}>Upload Driver's Image</Text>
        </TouchableOpacity>
      }
    }

    takeLicensePic()
    {
      if(this.state.licenseuri !== '')
      {
        return <View style={{width:'100%', height:'100%', borderRadius:20, elevation:6, alignItems:'center', justifyContent:'center'}}>
          <Image source={{uri:this.state.licenseuri}} style={{width:'80%', height:'80%'}} />
        </View>
      }
      else
      {
        return <TouchableOpacity style={{width:'100%', height:'100%', borderRadius:20, elevation:6, alignItems:'center', justifyContent:'center'}} onPress={()=>{
          this.setState({clicked: false, clickingFor: 'license'}
          )
        }}>
          <Image source={require('../resources/pic.png')} style={{width:'40%', height:'60%',scaleX:1.4, scaleY:1.4}} />
                        <Text style={{fontSize:17, color:'black'}}>Upload License's Image</Text>
        </TouchableOpacity>
      }
    }

    clickOrPick() {
      if(this.state.picked)
      {
        return (
          <View style={{ position: 'absolute', left: '84%', height: '100%', width: '20%',
                        justifyContent: 'center', alignItems: 'center', zIndex: 15 }}>
            <TouchableOpacity
              onPress={this.takePicture.bind(this)}
              style = {{ height: '20%', width: '50%', zIndex: 10 }}
            >
                <Image source={require('../resources/shutter_new.png')} style={{ height: '100%', width: '100%' }}/>
            </TouchableOpacity>
          </View>
        )
      } else {
        return (
          <View style={{ position: 'absolute', left: '41%', top: '2%', height: '10%', width: '20%', zIndex: 15,
          borderColor: 'orange', borderWidth: 2, borderRadius: 25, elevation:11, backgroundColor:'#27272780',
          shadowColor:'#000', shadowOffset: {width:2, height:2}, shadowOpacity:0.2}}>
            <Picker
              selectedValue = {this.state.currState}
              onValueChange= {(itemValue, itemIndex) => {
                this.setState({currState: itemValue, picked: true})}}
              mode="dialog"
              style={{flex:1, zIndex: 15, color: 'white' }}>
              <Picker.Item label={this.state.states[0]} value={this.state.states[0]} />
              <Picker.Item label={this.state.states[1]} value={this.state.states[1]} />
              <Picker.Item label={this.state.states[2]} value={this.state.states[2]} />
              <Picker.Item label={this.state.states[3]} value={this.state.states[3]} />
              <Picker.Item label={this.state.states[4]} value={this.state.states[4]} />
              <Picker.Item label={this.state.states[5]} value={this.state.states[5]} />
            </Picker>
          </View>
        );
      }
    }

    cameraOrPic(){
      if(!this.state.clicked)
      {
        return <View style={styles.container}>

        <View style={{ position: 'absolute', left: '20%', height: '100%', width: '20%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{color:'white'}}>RNSCAN</Text>
        </View>
        <View style={{position: 'absolute', left: '-0.5%', borderColor: 'orange',
          borderWidth: 2, elevation:11, width: '8%', borderBottomRightRadius: 80,
          backgroundColor:'#27272780', shadowColor:'#000', borderTopRightRadius: 80,
          height: '100%', shadowOffset: {width:2, height:2}, shadowOpacity:0.2 }}>
        </View>

        {this.clickOrPick()}

        <View style={{ position: 'absolute', right: '-0.5%', borderColor: 'orange',
           borderWidth: 2, borderBottomLeftRadius: 180, elevation:11, width: '13%',
           backgroundColor:'#27272780', shadowColor:'#000', borderTopLeftRadius: 180,
           height: '100%', shadowOffset: {width:2, height:2}, shadowOpacity:0.2}}>
         </View>

        <View style={{ backgroundColor: 'black', width: '100%', top: '0%', position: 'absolute'}}/>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              console.log(barcodes)
            }}
        />
        </View>
      }

      else{
        if(this.state.imageuri!='' && this.state.processing==false && this.state.fillDetails == true)
        {
          if(this.state.processing==null)
          {
            this.setState({ Notif: 'Reading Plate: Please Wait...' });
          }
          else if(this.state.processing==true)
          {
            if (this.state.plateText === "Try Again!")
              this.setState({ Notif: 'Failure: Unable to Read Plate' });
            else
              this.setState({ Notif: 'Success: Plate Read', numPlate: this.state.plateText });
          }
          return (
            <View style={{height:'100%', backgroundColor:'#EE9129'}}>

              <View style={{ flex: 1, flexDirection: 'row', marginBottom: '3%'}}>
              <Text style={{fontSize:30, margin:20, alignSelf:'center', fontWeight: 'bold', color: 'white'}}>RC Card Details</Text>
                <View style={{ justifyContent:'center', marginTop:10, borderRadius:25, width:'100%', alignItems:'center'}}>
                      <TouchableOpacity
                      onPress={()=>{this.setState(
                        { clicked: false, imageuri: '', processing: false, plateText: '', flaskurl: '',
                          Notif: 'Loading...', fillDetails: false, name: '', contact: '', numPlate: '',
                          driveruri:'', licenseuri:'', clickingFor: 'plate', picked: false, currState: '' }
                      )}}
                        style={{alignItems:'center',justifyContent:'center', width:'20%',
                        height:this.screenHeight/9, backgroundColor:'#272727', borderRadius:25}}>
                          <Text style={{color:'#FAC07F', fontSize:19}}>Scan Again!</Text>
                      </TouchableOpacity>
                  </View>
                </View>
                <ScrollView>
    	{Object.keys(this.state.subjects).map(mod => {

      	//this.setState({ url: this.state.subjects[noti][mod]['url']})
      	return(
      	<View
      	key={mod}
          	style={{paddingLeft:5, paddingRight: 5, margin:5}}
          	>
          	<View
            	style={{
              	flexDirection: 'column',
              	alignItems: 'center',
              	borderRadius: 5,
              	padding: 10,
              	elevation:2,
                backgroundColor: '#FAC07F'

            	}}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
              	<Text style={{ margin: 5, fontSize: 20, fontWeight: 'bold' }}>{mod}:</Text>
                <Text style={{ margin: 5, fontSize: 20 }}>{this.state.subjects[mod]}</Text>
              </View>
          	</View>
        	</View>
      	)
    	})}
    	</ScrollView>

            </View>
          );
        }
      }
    }

    render(){
        return(
            <View style={styles.container}>
            {this.cameraOrPic()}
           </View>
        )
    }


    takePicture = async function() {

          const options = { quality: 0.5, base64: true };
          const data = await this.camera.takePictureAsync(options)

          if(this.state.clickingFor === 'plate')
            this.setState({clicked:true, imageuri:data.uri},()=>{
              this._handleCamera()
            });
          else if(this.state.clickingFor === 'driver')
            this.setState({clicked:true, driveruri:data.uri},()=>{
              this._handleCamera()
            });
          else if(this.state.clickingFor === 'license')
            this.setState({clicked:true, licenseuri:data.uri},()=>{
              this._handleCamera()
            });
        }
    }



const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black'
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    capture: {
      flex: 0,
      backgroundColor: '#000',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20
    }
  });
