import React, { useRef,useContext } from 'react'
import HeaderTop from '../components/HeaderTop'
import { AppContext } from '../context/context'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { Container, Content, Text, View } from 'native-base'
const CameraIndex = ({ navigation }) => {
  const camera = useRef(null)
  const { img, setImg } = useContext(AppContext)
  const takePicture = async () => {
    try {
      const options = { quality: 0.5, base64: true }
      const data = await camera.current.takePictureAsync(options)
      setImg(data.uri)
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
          flashMode={RNCamera.Constants.FlashMode.on}
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
