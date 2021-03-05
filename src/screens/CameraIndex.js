import React, { useRef, useContext, useState, useEffect } from 'react'
import HeaderTop from '../components/HeaderTop'
import CircleWithinCircle from '../components/CircleWithinCircle'
import { AppContext } from '../context/context'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { RNCamera } from 'react-native-camera'
import {
  Container,
  Content,
  Text,
  View,
  Button,
  Icon,
  Toast,
} from 'native-base'
import { theme } from '../core/theme'
import axios from 'axios'

const CameraIndex = ({ route, navigation }) => {
  const camera = useRef(null)
  const { setImg, host, user,setToast } = useContext(AppContext)
  const { quiz_key, class_key,student_key } = route.params
  const [onProcess, setProcess] = useState(false)
 
  // useEffect(() => {
  //   console.log('uid: ', user.uid)
  //   console.log('quiz_key: ', quiz_key)
  //   console.log('class_key: ',class_key)
  // }, [])

  const OnClose = (reason) => {
    if (reason === 'user') {
      navigation.navigate('ResultScreen')
    }
  }

  const sendImage = (image_data) => {
    let req = new FormData()
    req.append('image', image_data.base64)
    req.append('uid', user.uid)
    req.append('class_key', class_key)
    req.append('quiz_key', quiz_key)
    req.append('student_key', student_key)
    const url = 'http://' + host + ':5000' + '/get_image'
    axios
      .post(url, req)
      .then((res) => {
        setProcess(false)
        if (res.status === 200) {
          console.log('@@', res.data)
          const displayText = `Student ID: ${res.data.std_id}\n\nResult: ${
            res.data.score
          }/${res.data.total}   ${(
            (Math.round(res.data.score) / res.data.total) *
            100
          ).toFixed(2)}%`
          setImg(res.data.url)
          setToast(displayText)
          Toast.show({
            text: displayText,
            duration: 5000,
            position: 'top',
            onClose: OnClose,
            buttonText: 'See result',
            buttonStyle: {
              backgroundColor: '#2c393fff',
              left: 110,
              marginTop: 20,
            },
            style: {
              top: 400,
              flexDirection: 'column',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
            textStyle: {
              textAlign: 'center',
            },
          })
          //navigation.replace('ResultScreen')
        } else if (res.status === 201) {
          console.log('@@@', res.data.message)
          Toast.show({
            text: `Error: ${res.data.message}\n\nplease try again.`,
            duration: 3000,
            position: 'top',
            style: { top: 400 },
            textStyle: {
              textAlign: 'center',
            },
          })
        }
      })
      .catch((error) => {
        setProcess(false)
        console.log('###', error.message)
        Toast.show({
          text: `Error: ${error.message}\n\nplease try again.`,
          duration: 3000,
          position: 'top',
          style: { top: 400 },
          textStyle: {
            textAlign: 'center',
          },
        })
      })
  }
  const takePicture = async () => {
    try {
      const options = { quality: 0.5, base64: true }
      const data = await camera.current.takePictureAsync(options)
      setProcess(true)
      Toast.show({
        text: `Processing...`,
        duration: 10000,
        position: 'top',
        style: { top: 400 },
        textStyle: {
          textAlign: 'center',
        },
      })
      sendImage(data)

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
          {!onProcess ? (
            <View style={styles.takePictureContainer}>
              <TouchableOpacity onPress={takePicture}>
                <View>
                  <CircleWithinCircle />
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
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
    alignSelf: 'center',
    margin: 20,
  },
  takePictureContainer: {
    position: 'absolute',
    paddingVertical: 20,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
