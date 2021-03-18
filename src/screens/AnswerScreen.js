import React, { useState, useEffect, useContext } from 'react'

import HeaderTop from '../components/HeaderTop'
//import Toast from '../components/Toast'

import axios from 'axios'
import { AppContext } from '../context/context'
import {
  Container,
  Content,
  Text,
  View,
  Icon,
  Button,
  Form,
  Item,
  Input,
  Label,
  Toast,
} from 'native-base'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { theme } from '../core/theme'
import { Col, Row, Grid } from 'react-native-easy-grid'
const AnswerScreen = ({ route, navigation }) => {
  const { user, host } = useContext(AppContext)
  const [error, setError] = useState()
  const [text, onChangeText] = useState('')
  const { title, quiz_key, class_key, answer } = route.params
  const [data, setData] = useState([])
  const [selectAnswer, setAnswer] = useState()

  useEffect(() => {
    if (answer) {
      let answerArr = []
      Object.entries(answer).forEach(([key, value]) => {
        let tmp = {}
        for (let i = 0; i < value.quiz_answer.length; i++) {
          tmp[i] = value.quiz_answer[i]
        }
        answerArr.push({
          answer_key: key,
          answer_url: value.answer_url,
          answer_name: value.answer_name,
          answer_quiz: tmp,
        })
      })
      setData(answerArr)
      //console.log(answer)
    }
  }, [])

  // console.log('###', data)

  const OnClose = (reason) => {
    if (reason === 'timeout') {
      navigation.navigate('QuizIndex')
    }
  }

  const setDefault = () => {
    const url = `http://${host}:5000/defaultanswer`
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
    axios
      .post(url, {
        uid: user.uid,
        class_key: class_key,
        quiz_key:quiz_key,
        answer_key: selectAnswer,
      })
      .then((res) => {
        if (res.status === 200) {
          Toast.show({
            text: res.data.message,
            duration: 500,
            position: 'top',
            onClose: OnClose,
            style: {
              top: 400,
            },
            textStyle: {
              textAlign: 'center',
            },
          })
          console.log(res.data)
        } else {
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
      <Content padder>
        <Grid>
          <Col size={2}>
            <Text style={styles.header}>Answer Sheet</Text>
          </Col>
          <Col size={1}>
            {selectAnswer ? (
              <Button style={styles.submit} onPress={setDefault}>
                <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
                  Set Answer
                </Text>
              </Button>
            ) : null}
          </Col>
        </Grid>
        <View style={styles.divider}></View>
        <Grid>
          {data
            ? data.map((obj) => (
                <TouchableOpacity
                  style={{ marginTop: 20, padding: 5 }}
                  onPress={() => setAnswer(obj.answer_key)}
                  key={obj.answer_key}
                >
                  <Row>
                    <Col size={1}>
                      <View
                        style={[
                          styles.quiz,
                          {
                            backgroundColor:
                              obj.answer_key === selectAnswer
                                ? theme.colors.opPrimary
                                : '#EDEDED',
                          },
                        ]}
                      >
                        <Text
                          style={{
                            color:
                              obj.answer_key === selectAnswer
                                ? 'white'
                                : 'black',
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
                              obj.answer_key === selectAnswer
                                ? theme.colors.opPrimary
                                : '#EDEDED',
                          },
                        ]}
                      >
                        <Text
                          style={{
                            color:
                              obj.answer_key === selectAnswer
                                ? 'white'
                                : 'black',
                          }}
                        >
                          {obj.answer_name}
                        </Text>
                      </View>
                    </Col>
                  </Row>

                  <Row style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image
                      source={{ uri: obj.answer_url }}
                      style={[
                        styles.image,
                        obj.answer_key === selectAnswer
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
              ))
            : null}
          <Text style={styles.header}>Add Answer Sheet</Text>
          <View style={styles.divider}></View>
          <Row>
            <Form style={{ width: '100%' }}>
              <Item floatingLabel>
                <Label>Answer Name</Label>
                <Input onChangeText={onChangeText} value={text} />
              </Item>
            </Form>
          </Row>
          <Row>
            <Button
              iconLeft
              style={styles.button}
              onPress={() => {
                if (text !== '') {
                  navigation.navigate('CameraAnswer', {
                    quiz_key: quiz_key,
                    class_key: class_key,
                    answer_name: text,
                  })
                } else {
                  Toast.show({
                    text: `Answer sheet name is required`,
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
              <Text>Scan Answer</Text>
            </Button>
          </Row>
        </Grid>
      </Content>
    </Container>
  )
}

export default AnswerScreen

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
    width: 300,
    height: 400,
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
    width: 100,
  },
})
