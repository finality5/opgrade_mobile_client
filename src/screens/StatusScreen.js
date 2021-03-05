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
  Spinner,
  Button,
  Icon,
} from 'native-base'
import { StyleSheet, Image } from 'react-native'
import { theme } from '../core/theme'

import { Col, Row, Grid } from 'react-native-easy-grid'

const status = { 0: 'graded', 1: 'ungraded', 2: 'duplicate' }

const ReviewScreen = ({ route, navigation }) => {
  const { user, host } = useContext(AppContext)
  const [error, setError] = useState()
  const { title, quiz, class_key, student, status } = route.params
  const [data, setData] = useState()
  const [isFetch, setFetch] = useState(false)

  console.log('@@@', student)

  return (
    <Container style={styles.container}>
      <HeaderTop goBack={navigation.goBack} title={title} />
      {!isFetch && (status === 0 || status === 1) ? (
        <Content padder>
          <Text style={styles.header}>{quiz.quiz_name}</Text>
          <View style={styles.divider}></View>
          <Row>
            <Col size={1}>
              <View style={styles.quiz}>
                <Text>{student.student_id}</Text>
              </View>
            </Col>
            <Col size={2}>
              <View style={styles.quiz}>
                <Text>{student.student_name}</Text>
              </View>
            </Col>
          </Row>
          {status === 0 ? (
            <>
              <Row>
                <Col size={1}>
                  <View style={styles.quiz}>
                    <Text>Date</Text>
                  </View>
                </Col>
                <Col size={2}>
                  <View style={styles.quiz}>
                    <Text>{student.quiz[0].date}</Text>
                  </View>
                </Col>
              </Row>
              <Row>
                <Col size={1}>
                  <View style={styles.quiz}>
                    <Text>Result</Text>
                  </View>
                </Col>
                <Col size={2}>
                  <View style={styles.quiz}>
                    <Text>{student.quiz[0].result}</Text>
                  </View>
                </Col>
              </Row>
              <Row>
                <Image
                  source={{ uri: student.quiz[0].url }}
                  style={{
                    width: 355,
                    height: 500,
                    borderRadius: 10,
                    overflow: 'hidden',
                    marginTop: 20,
                  }}
                />
              </Row>
            </>
          ) : null}
          <Row>
            <Button
              iconLeft
              style={styles.button}
              onPress={() =>
                navigation.navigate('CameraIndex', {
                  quiz_key: quiz.quiz_key,
                  class_key: class_key,
                  student_key: student.student_key,
                })
              }
            >
              <Icon name="ios-camera" />
              <Text>{status === 0 ? 'Rescan' : 'Scan Exam'}</Text>
            </Button>
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
  button: {
    backgroundColor: theme.colors.opPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    fontFamily: 'Comfortaa',
    marginTop: 20,
  },
})
