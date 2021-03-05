import React, { useState, useEffect, useContext } from 'react'
import HeaderTop from '../components/HeaderTop'
import Toast from '../components/Toast'
import axios from 'axios'
import { AppContext } from '../context/context'
import { Container, Content, Text, View, Spinner } from 'native-base'
import { StyleSheet, Image } from 'react-native'
import { theme } from '../core/theme'

import { Col, Row, Grid } from 'react-native-easy-grid'

const status = {0:'graded',1:'ungraded',2:'duplicate'}

const ReviewScreen = ({ route, navigation }) => {
  const { user, host } = useContext(AppContext)
  const [error, setError] = useState()
  const { title,quiz,class_key,student,status } = route.params
  const [data, setData] = useState()
  const [isFetch, setFetch] = useState(false)
 
  

  

  return (
    <Container style={styles.container}>
      <HeaderTop goBack={navigation.goBack} title={title} />
      {!isFetch ? (
        <Content padder>
          <Text style={styles.header}>{quiz.quiz_name}</Text>
          <View style={styles.divider}></View>
          <Row>
            <Col size={1}>
              <View style={styles.quiz}>
                <Text>{ student.student_id}</Text>
              </View>
            </Col>
            <Col size={2}>
              <View style={styles.quiz}>
                <Text>{ student.student_name}</Text>
              </View>
            </Col>
          </Row>
         
          <Toast message={error} onDismiss={() => setError('')} />
        </Content>
      ) : (
        <Spinner style={{ top: 300 }} color={theme.colors.opAlter} />
      )}
    </Container>
  )
}

export default ReviewScreen

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
