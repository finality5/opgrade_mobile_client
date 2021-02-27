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
  const { img, setImg, host, user } = useContext(AppContext)
  const { quiz_key, class_key } = route.params
  const [textToast, setText] = useState('Processing...')
  const [showToast, setShow] = useState(false)

  const toastContent = {
    text: textToast,
    duration: 100000,
    position: 'bottom',
    style: { bottom: 400 },
    textStyle: {
      textAlign: 'center',
    },
  }

  // useEffect(() => {
  //   console.log('uid: ', user.uid)
  //   console.log('quiz_key: ', quiz_key)
  //   console.log('class_key: ',class_key)
  // }, [])

  const sendImage = (image_data) => {
    let req = new FormData()
    req.append('image', image_data.base64)
    req.append('uid', user.uid)
    req.append('class_key', class_key)
    req.append('quiz_key', quiz_key)
    const url = 'http://' + host + ':5000' + '/get_image'
    axios.post(url, req).then((res) => {
      if (res.status == 200) {
        console.log('@@', res.data)
        setImg(res.data.url)
        Toast.show({
          text: `Student ID: ${res.data.std_id}\n\nResult: ${res.data.score}/${res.data.total
            }   ${(
              (Math.round(res.data.score) / res.data.total) *
              100
            ).toFixed(2)}%`,
          duration: 10000,
          position: 'bottom',
          style: { bottom: 400 },
          textStyle: {
            textAlign: 'center',
          },
        })
        //navigation.replace('ResultScreen')
      }
      else { 
        Toast.show({
          text: `Error\nplease try again`,
          duration: 10000,
          position: 'bottom',
          style: { bottom: 400 },
          textStyle: {
            textAlign: 'center',
          },
        })
      }
    })
  }
  const takePicture = async () => {
    try {
      const options = { quality: 0.5, base64: true }
      const data = await camera.current.takePictureAsync(options)
      setText('Processing...')
      Toast.show(toastContent)
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
          <View style={styles.takePictureContainer}>
            <TouchableOpacity onPress={takePicture}>
              <View>
                <CircleWithinCircle />
              </View>
            </TouchableOpacity>
          </View>
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
