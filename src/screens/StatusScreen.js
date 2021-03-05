import React, { useState, useEffect, useContext } from 'react'
import HeaderTop from '../components/HeaderTop'

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
  Toast
} from 'native-base'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { theme } from '../core/theme'

import { Col, Row, Grid } from 'react-native-easy-grid'

//const status = { 0: 'graded', 1: 'ungraded', 2: 'duplicate' }

const ReviewScreen = ({ route, navigation }) => {
  const { user, host } = useContext(AppContext)
  const [error, setError] = useState()
  const { title, quiz, class_key, student, status } = route.params
  const [isFetch, setFetch] = useState(false)
  const [selectScore, setScore] = useState()

  const OnClose = (reason) => {
    if (reason === 'timeout') {
      navigation.navigate('ReviewScreen')
    }
  }

  const removeDuplicate = () => {
    const filtered = student.quiz.filter((obj) => obj.score_key !== selectScore)
    let data = []
    filtered.forEach(obj => data.push(obj.score_key));
    const url = `http://${host}:5000/duplicate`
    Toast.show({
      text: 'Processing...',
      duration: 10000,
      position: 'top',
      onClose: OnClose,
      style: {
        top: 400,
      },
      textStyle: {
        textAlign: 'center',
      },
    })
    axios.post(url, { uid: user.uid, class_key: class_key, score_key: data }).then(res => {
      if (res.status === 200) {
        Toast.show({
          text: res.data.message,
          duration: 1500,
          position: 'top',
          onClose: OnClose,
          style: {
            top: 400,
          },
          textStyle: {
            textAlign: 'center',
          },
        })
        //console.log(res.data)
      }
      else { 
        Toast.show({
          text: res.data.message,
          duration: 10000,
          position: 'top',
          onClose: OnClose,
          style: {
            top: 400,
          },
          textStyle: {
            textAlign: 'center',
          },
        })
      }
    })
  }

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
            <React.Fragment>
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
            </React.Fragment>
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

          
        </Content>
      ) : !isFetch && status === 2 ? (
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
          <Row>
            <Col size={3}>
              <Text style={styles.header}>Select Answer Paper</Text>
            </Col>
            <Col size={1}>
              {selectScore ? (
                <Button style={styles.submit} onPress={removeDuplicate}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
                    Submit
                  </Text>
                </Button>
              ) : null}
            </Col>
          </Row>
          <View style={styles.divider}></View>
          {student.quiz.map((obj) => (
            <TouchableOpacity
              key={obj.score_key}
              style={{ marginTop: 20, padding: 5 }}
              onPress={() => setScore(obj.score_key)}
            >
              <Row>
                <Col size={1}>
                  <View
                    style={[
                      styles.quiz,
                      {
                        backgroundColor:
                          obj.score_key === selectScore
                            ? theme.colors.opPrimary
                            : '#EDEDED',
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color:
                          obj.score_key === selectScore ? 'white' : 'black',
                      }}
                    >
                      Date
                    </Text>
                  </View>
                </Col>
                <Col size={2}>
                  <View
                    style={[
                      styles.quiz,
                      {
                        backgroundColor:
                          obj.score_key === selectScore
                            ? theme.colors.opPrimary
                            : '#EDEDED',
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color:
                          obj.score_key === selectScore ? 'white' : 'black',
                      }}
                    >
                      {obj.date}
                    </Text>
                  </View>
                </Col>
              </Row>
              <Row>
                <Col size={1}>
                  <View
                    style={[
                      styles.quiz,
                      {
                        backgroundColor:
                          obj.score_key === selectScore
                            ? theme.colors.opPrimary
                            : '#EDEDED',
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color:
                          obj.score_key === selectScore ? 'white' : 'black',
                      }}
                    >
                      Result
                    </Text>
                  </View>
                </Col>
                <Col size={2}>
                  <View
                    style={[
                      styles.quiz,
                      {
                        backgroundColor:
                          obj.score_key === selectScore
                            ? theme.colors.opPrimary
                            : '#EDEDED',
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color:
                          obj.score_key === selectScore ? 'white' : 'black',
                      }}
                    >
                      {obj.result}
                    </Text>
                  </View>
                </Col>
              </Row>
              <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  source={{ uri: obj.url }}
                  style={[
                    styles.image,
                    obj.score_key === selectScore
                      ? {
                          borderColor: theme.colors.opPrimary,
                          borderWidth: 5,
                          borderRadius: 10,
                        }
                      : null,
                  ]}
                />
              </Row>
            </TouchableOpacity>
          ))}

         
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
    borderRadius: 10,
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    flex: 1,
    fontFamily: 'Comfortaa',
    backgroundColor: '#EDEDED',
  },
  button: {
    backgroundColor: theme.colors.opPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    fontFamily: 'Comfortaa',
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
    flex: 0,
    marginBottom: 20,
  },
  submit: {
    backgroundColor: theme.colors.opSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    fontFamily: 'Comfortaa',
    marginTop: 30,
    height: 10,
    width: 65,
  },
})
