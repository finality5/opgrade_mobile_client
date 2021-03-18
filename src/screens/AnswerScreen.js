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
import { StyleSheet } from 'react-native'
import { theme } from '../core/theme'
import { Col, Row, Grid } from 'react-native-easy-grid'
const AnswerScreen = ({ route, navigation }) => {
  const [error, setError] = useState()
  const [text, onChangeText] = useState('')
  const { title, quiz_key, class_key, answer } = route.params
  const [data, setData] = useState([])

  useEffect(() => {
    if (answer) {
      Object.entries(answer).forEach(([key, value]) => {
        let tmp = {}
        for (let i = 0; i < value.quiz_answer.length; i++) {
          tmp[i] = value.quiz_answer[i]
        }
        setData((prev) => [
          ...prev,
          {
            answer_key: key,
            answer_url: value.answer_url,
            answer_name: value.answer_name,
            answer_quiz: tmp,
          },
        ])
      })
      //console.log(answer)
    }
  }, [])

  console.log('###', data)

  return (
    <Container style={styles.container}>
      <HeaderTop goBack={navigation.goBack} title={title} />
      <Content padder>
        <Text style={styles.header}>Answer Sheet</Text>
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
