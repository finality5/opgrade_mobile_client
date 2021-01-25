import React, { useRef, useContext, useState } from 'react'
import HeaderTop from '../components/HeaderTop'
import { AppContext } from '../context/context'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { Container, Content, Text, View } from 'native-base'
import { theme } from '../core/theme'
import axios from 'axios'

const CameraIndex = ({ navigation }) => {
  const camera = useRef(null)
  const { img, setImg, host } = useContext(AppContext)
  //const { imgUrl, setUrl } = useState()
  const sendImage = (image_data) => {
    let req = new FormData()
    req.append('image', image_data.base64)
    req.append('name', 'testestest')
    const url = 'http://' + host + ':5000' + '/get_image'
    //console.log(url)
    axios.post(url, req).then((res) => {
      console.log('@@', res.data.url)
      setImg(res.data.url)
    })
  }
  const takePicture = async () => {
    try {
      const options = { quality: 0.5, base64: true }
      const data = await camera.current.takePictureAsync(options)
      //setImg(data.uri)
      sendImage(data)
      navigation.replace('ResultScreen')
      console.log(data.uri, '<<<<<<<<<<<<<<<<<<<<<')
    } catch (error) {
      console.log(error, 'ERROR <<<<<<<<<<<<<')
    }
  }
  return (
    <Container style={styles.container}>
      <HeaderTop goBack={navigation.goBack} title="Camera" />
      <View style={styles.container_camera}>
        <RNCamera
          ref={camera}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes)
          }}
        />
        <View
          style={{
            position: 'absolute',
            width: 100,
            height: 100,
            borderStyle: 'solid',
            borderColor: 'white',
            borderWidth: 4,
            boxSizing: 'border-box',
            top: 80,
          }}
        ></View>
        <View
          style={{
            position: 'absolute',
            width: 100,
            height: 100,
            right: 0,
            top: 80,
            borderStyle: 'solid',
            borderColor: 'white',
            borderWidth: 4,
            boxSizing: 'border-box',
          }}
        ></View>
        <View
          style={{
            position: 'absolute',
            width: 100,
            height: 100,
            borderStyle: 'solid',
            borderColor: 'white',
            borderWidth: 4,
            boxSizing: 'border-box',
            bottom: 100,
          }}
        ></View>
        <View
          style={{
            position: 'absolute',
            width: 100,
            height: 100,
            borderStyle: 'solid',
            borderColor: 'white',
            borderWidth: 4,
            boxSizing: 'border-box',
            bottom: 100,
            right: 0,
          }}
        ></View>
        <View
          style={{
            flex: 1,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
          }}
        >
          <TouchableOpacity style={styles.capture} onPress={takePicture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  )
}

export default CameraIndex

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
  },
  container_camera: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
})
