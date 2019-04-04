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
  ActivityIndicator
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
    driveruri:'', licenseuri:'', clickingFor: 'plate'};

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
          'http://192.168.43.174:5000/plate?url='+url
          //'http://192.168.1.7:5000/plate?url=https://i.ibb.co/7RLK4PM/test1.jpg'
        );
        console.log("Banthu")
        js = await response.json()
        console.log(js.plate);
        this.setState({processing:true, plateText:js.plate})
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
              this.uploadDetails.bind(this) })
          })
          .catch(err => {
            console.log(err)
          })
        }
      }

    uploadDetails()
    {
      const Blob = RNFetchBlob.polyfill.Blob
      const fs = RNFetchBlob.fs
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
      window.Blob = Blob

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


        <View style={{ position: 'absolute', right: '-0.5%', borderColor: 'orange',
          borderWidth: 2, borderBottomLeftRadius: 180, elevation:11, width: '13%',
          backgroundColor:'#27272780', shadowColor:'#000', borderTopLeftRadius: 180,
          height: '100%', shadowOffset: {width:2, height:2}, shadowOpacity:0.2}}>
        </View>
        <View style={{ position: 'absolute', left: '84%', height: '100%', width: '20%', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={this.takePicture.bind(this)}
          style = {{ height: '20%', width: '50%', zIndex: 10 }}
        >
            <Image source={require('../resources/shutter_new.png')} style={{ height: '100%', width: '100%' }}/>
        </TouchableOpacity>
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
            <View style={{height:'100%', backgroundColor:'#EEEEEE'}}>
            <View style={{position: 'absolute', top: '-0.3%', borderColor: 'orange',
              borderWidth: 2, borderBottomLeftRadius: 40, borderBottomRightRadius: 40,
              justifyContent:"center", alignItems:"center", elevation:11,
              backgroundColor:'#272727', shadowColor:'#000', width: '100%',
              shadowOffset: {width:2, height:2}, shadowOpacity:0.2}}>
              <Text style={{fontSize:21, color:'orange'}}>MALPR</Text>
            </View>
            <ScrollView contentContainerStyle={{alignItems:'center', marginTop: 30, backgroundColor:'#EEEEEE'}} style={{flex:1}}>
            <View style={{flexDirection:'row', justifyContent:'space-between', width:'85%', marginTop:10, marginBottom:15}}>
            <View  style={{width:this.screenHeight/1.5, height:this.screenWidth/4}}>
                  {this.takeDriverPic()}
                </View>
                <View  style={{width:this.screenHeight/1.5, height:this.screenWidth/4}}>
                {this.takeLicensePic()}
                </View>
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
                        label="Plate"
                    />
                    <Text style={{alignSelf:'flex-start', fontSize:18, marginTop:10, marginLeft: 115}}>
                    {this.state.Notif}
                    </Text>
                </View>

                <View style={{ justifyContent:'center', marginTop:10, borderRadius:25, width:'100%', alignItems:'center'}}>
                    <TouchableOpacity
                    onPress={()=>{this.setState(
                      { clicked: false, imageuri: '', processing: false, plateText: '', flaskurl: '',
                        Notif: 'Loading...', fillDetails: false, name: '', contact: '', numPlate: '',
                        driveruri:'', licenseuri:'', clickingFor: 'plate' }
                    )}}
                      style={{alignItems:'center',justifyContent:'center', width:'20%', height:this.screenHeight/9, backgroundColor:'#272727', borderRadius:25}}
                    >
                        <Text style={{color:'orange', fontSize:19}}>Submit</Text>
                    </TouchableOpacity>
                </View>
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