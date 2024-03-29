import React, { useState, useEffect, useContext } from 'react'
import Button from '../components/Button'
import HeaderTop from '../components/HeaderTop'
import Toast from '../components/Toast'

import axios from 'axios'
import { AppContext } from '../context/context'
import { Container, Content, Text, View } from 'native-base'
import { StyleSheet } from 'react-native'

import { Col, Row, Grid } from 'react-native-easy-grid'
const StatScreen = ({ route, navigation }) => {
  
  const [error, setError] = useState()
  const { title} = route.params

  return (
    <Container style={styles.container}>
      <HeaderTop goBack={navigation.goBack} title={title} />
      <Content padder>
        <Text style={styles.header}>Class Info</Text>
        <View style={styles.divider}></View>
        <Grid>
          <Row>
            <Col size={1}>
              <View style={styles.quiz}>
                <Text>STATISTIC</Text>
              </View>
            </Col>
            <Col size={2}>
              <View style={styles.quiz}>
                <Text>TEST</Text>
              </View>
            </Col>
          </Row>
        
        </Grid>
       

        <Toast message={error} onDismiss={() => setError('')} />
      </Content>
    </Container>
  )
}

export default StatScreen

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
})
