import React, { useState, useEffect, useContext } from 'react'
//import Button from '../components/Button'
import HeaderTop from '../components/HeaderTop'
import Toast from '../components/Toast'
import axios from 'axios'
import { AppContext } from '../context/context'
import { Container, Content, Text, View, Button, Icon } from 'native-base'
import { StyleSheet, Image } from 'react-native'
import { theme } from '../core/theme'
import { Col, Row } from 'react-native-easy-grid'

const QuizIndex = ({ route, navigation }) => {
  const { img, setImg } = useContext(AppContext)
  const [error, setError] = useState()
  const { quiz, Class_key } = route.params
  console.log('@@@', quiz)
  return (
    <Container style={styles.container}>
      <HeaderTop goBack={navigation.goBack} title="Quiz" />
      <Content padder>
        <Text style={styles.header}>{quiz.quiz_name}</Text>
        <View style={styles.divider}></View>
        <Row>
          <Col size={1}>
            <View style={styles.quiz}>
              <Text>Form</Text>
            </View>
          </Col>
          <Col size={2}>
            <View style={styles.quiz}>
              <Text>40 Question</Text>
            </View>
          </Col>
        </Row>
        <Row>
          <Col size={1}>
            <View style={styles.quiz}>
              <Text>Created</Text>
            </View>
          </Col>
          <Col size={2}>
            <View style={styles.quiz}>
              <Text>{quiz.date}</Text>
            </View>
          </Col>
        </Row>
        <Row>
          <Col>
            <View style={{ padding: 10 }}>
              <Button
                iconLeft
                style={styles.button}
                onPress={() =>
                  navigation.navigate('CameraIndex', {
                    quiz_key: quiz.quiz_key,
                    class_key: Class_key,
                    student_key: null,
                  })
                }
              >
                <Icon name="ios-camera" />
                <Text>Scan Exam</Text>
              </Button>
            </View>
          </Col>
          <Col>
            <View style={{ padding: 10 }}>
              <Button
                iconLeft
                style={styles.button}
                onPress={() =>
                  navigation.navigate('ReviewScreen', {
                    title: 'Review',
                    quiz: quiz,
                    class_key: Class_key,
                  })
                }
              >
                <Icon name="ios-paper" />
                <Text>Review</Text>
              </Button>
            </View>
          </Col>
        </Row>
        <Row>
          <Col>
            <View style={{ padding: 10 }}>
              <Button
                iconLeft
                style={[styles.button, { marginTop: 0 }]}
                onPress={() =>
                  navigation.navigate('AnswerScreen', {
                    title:quiz.quiz_name,
                    quiz_key: quiz.quiz_key,
                    class_key: Class_key,
                    
                  })
                }
              >
                <Icon
                  name="ios-key"
                  style={{
                    transform: [{ rotate: '90deg' }],
                  }}
                />
                <Text>Answer</Text>
              </Button>
            </View>
          </Col>
          <Col>
            <View style={{ padding: 10 }}>
              <Button
                iconLeft
                style={[styles.button, { marginTop: 0 }]}
                onPress={() =>
                  navigation.navigate('StatScreen', {
                    title: 'Stat',
                  })
                }
              >
                <Icon name="ios-stats" />
                <Text>Statistic</Text>
              </Button>
            </View>
          </Col>
        </Row>

        <Toast message={error} onDismiss={() => setError('')} />
      </Content>
    </Container>
  )
}

export default QuizIndex

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
    marginTop: 400,
    width: 160,
  },
})
