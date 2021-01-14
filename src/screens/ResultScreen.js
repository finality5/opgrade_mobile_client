import React, { useState, useEffect, useContext } from 'react'

import HeaderTop from '../components/HeaderTop'
import Toast from '../components/Toast'

import axios from 'axios'
import { AppContext } from '../context/context'
import {
  Container,
  Content,
  Text,
  View,
  Button,
  Icon,
  Spinner,
} from 'native-base'
import { StyleSheet, Image } from 'react-native'
import { theme } from '../core/theme'
import { Col, Row, Grid } from 'react-native-easy-grid'

const ResultScreen = ({ route, navigation }) => {
  const { img, setImg } = useContext(AppContext)
  const [error, setError] = useState()

  return (
    <Container style={styles.container}>
      <HeaderTop goBack={navigation.goBack} title="result" />
      <Content padder>
        {/* <Text style={styles.header}>Grading Result</Text> */}
        <View style={styles.divider}></View>
        {img ? (
          <Image
            source={{ uri: img }}
            style={{ height: 600, width: null, flex: 1 }}
          />
        ) : (
          <Spinner color="blue" />
        )}
        <Button
          iconLeft
          style={styles.button}
          onPress={() => {
            setImg()
            navigation.replace('CameraIndex')
          }}
        >
          <Icon name="ios-camera" />
          <Text>Scan Again</Text>
        </Button>
        <Toast message={error} onDismiss={() => setError('')} />
      </Content>
    </Container>
  )
}

export default ResultScreen

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
  },
  header: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Comfortaa',
    marginTop: 30,
    marginLeft: 10,
  },
  divider: {
    width: '80%',
    height: 0,
    borderColor: '#EDEDED',
    borderStyle: 'solid',
    borderWidth: 2,
    marginTop: 15,
    marginLeft: 5,
  },
  quiz: {
    width: '90%',
    height: 37,
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    flex: 1,
    fontFamily: 'Comfortaa',
  },
  button: {
    backgroundColor: theme.colors.opPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    fontFamily: 'Comfortaa',
    marginTop: 20,
  },
})
