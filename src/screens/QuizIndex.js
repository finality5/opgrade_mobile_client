import React, { useState, useEffect, useContext } from 'react'
//import Button from '../components/Button'
import HeaderTop from '../components/HeaderTop'
//import Toast from '../components/Toast'
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
  Toast,
} from 'native-base'
import { StyleSheet, Image } from 'react-native'
import { theme } from '../core/theme'
import { Col, Row } from 'react-native-easy-grid'

const answerParse = (arr) => {
  let tmp = {}
  for (let i = 0; i < arr.length; i++) {
    tmp[i] = arr[i]
  }
  return tmp
}
const quizType = (type) => {
  switch (type) {
    case '0':
      return '50 questions'
    case '1':
      return '40 questions'
    default:
      return
  }
}

const QuizIndex = ({ route, navigation }) => {
  const { user, host, setAnswer } = useContext(AppContext)
  const { quiz, Class_key } = route.params
  const [error, setError] = useState()
  const [isFetch, setFetch] = useState(false)
  const [data, setData] = useState('')

  useEffect(() => {
    navigation.addListener('focus', () => {
      setFetch(true)
      const url = `http://${host}:5000/getquizeach?uid=${user.uid}&class_key=${Class_key}&quiz_key=${quiz.quiz_key}`
      axios.get(url).then((res) => {
        setData(res.data.quiz_data)
        setFetch(false)
        //console.log('$$$', res.data.quiz_data)
      })
    })
  }, [])
  //console.log('@@@', data)

  useEffect(() => {
    if (data) {
      if (data.answer !== '' && data.default !== '' && data.quiz_type === '0')
        setAnswer({
          answer_key: data.default,
          answer_name: data.answer[[data.default]].answer_name,
          quiz_answer: answerParse(data.answer[[data.default]].quiz_answer),
        })
      //setAnswer(answerParse(data.answer[[data.default]].quiz_answer))
      if (data.answer !== '' && data.default !== '' && data.quiz_type === '1') {
        // console.log('#',data.default)
        // let ans = [...data.default.map(key => answerParse(data.answer[[key]].quiz_answer))]
        // console.log(ans)
        setAnswer({
          answer_key: data.default,
          answer_name: [...data.default.map(key => data.answer[[key]].answer_name)],
          quiz_answer: [...data.default.map(key => answerParse(data.answer[[key]].quiz_answer))],
        })
      }
    }
  }, [data])

  return (
    <Container style={styles.container}>
      <HeaderTop goBack={navigation.goBack} title="Quiz" />
      {!isFetch && data !== '' ? (
        <Content padder>
          <Text style={styles.header}>{data.quiz_name}</Text>
          <View style={styles.divider}></View>
          <Row>
            <Col size={1}>
              <View style={styles.quiz}>
                <Text>Form</Text>
              </View>
            </Col>
            <Col size={2}>
              <View style={styles.quiz}>
                <Text>{quizType(data.quiz_type)}</Text>
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
                <Text>{data.date}</Text>
              </View>
            </Col>
          </Row>
          {data.answer !== '' &&
                  data.default !== '' &&
                  data.quiz_type === '0'?<Row>
            <Col size={1}>
              <View style={styles.quiz}>
                <Text>Key</Text>
              </View>
            </Col>
            <Col size={2}>
              <View style={styles.quiz}>
                <Text>
                  {data.answer !== '' &&
                  data.default !== '' &&
                  data.quiz_type === '0'
                    ? data.answer[[data.default]].answer_name
                    : 'NO ANSWER'}
                </Text>
              </View>
            </Col>
          </Row>:data.answer !== '' &&
                  data.default !== '' &&
                  data.quiz_type === '1'?data.default.map((key,index)=><Row>
                  <Col size={1}>
                    <View style={styles.quiz}>
                        <Text>{`Key ${index+1}`}</Text>
                    </View>
                  </Col>
                  <Col size={2}>
                    <View style={styles.quiz}>
                      <Text>
                        {data.answer !== '' &&
                        data.default !== '' &&
                        data.quiz_type === '1'
                          ? data.answer[[key]].answer_name
                          : 'NO ANSWER'}
                      </Text>
                    </View>
                  </Col>
                </Row>):null}
          <Row>
            <Col>
              <View style={{ padding: 10 }}>
                <Button
                  iconLeft
                  style={styles.button}
                  onPress={() => {
                    if (data.answer !== '' && data.default !== '') {
                      navigation.navigate('CameraIndex', {
                        quiz_key: data.quiz_key,
                        class_key: Class_key,
                        student_key: null,
                        quiz_type: data.quiz_type
                      })
                    } else {
                      Toast.show({
                        text: `Please select answer or add answer`,
                        duration: 3000,
                        position: 'top',
                        style: { top: 300 },
                        textStyle: {
                          textAlign: 'center',
                        },
                      })
                    }
                  }}
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
                  onPress={() => {
                    if (data.answer !== '' && data.default !== '') {
                      navigation.navigate('ReviewScreen', {
                        title: 'Review',
                        quiz: data,
                        class_key: Class_key,
                      })
                      //console.log(data.answer !== '' && data.default !== '')
                    } else {
                      Toast.show({
                        text: `Please select answer or add answer`,
                        duration: 3000,
                        position: 'top',
                        style: { top: 300 },
                        textStyle: {
                          textAlign: 'center',
                        },
                      })
                    }
                  }}
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
                      title: data.quiz_name,
                      quiz_key: data.quiz_key,
                      class_key: Class_key,
                      answer: data.answer,
                      quiz_type: data.quiz_type,
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
      ) : (
        <Spinner style={{ top: 300 }} color={theme.colors.opAlter} />
      )}
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
    marginTop: 280,
    width: 160,
  },
})
