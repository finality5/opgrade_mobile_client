import React, { useState, useEffect, useContext } from 'react'
import Button from '../components/Button'
import HeaderTop from '../components/HeaderTop'
import Toast from '../components/Toast'
import axios from 'axios'
import { AppContext } from '../context/context'
import { Container, Content, Text, View, Spinner } from 'native-base'
import { StyleSheet, Image } from 'react-native'
import { theme } from '../core/theme'

import { Col, Row, Grid } from 'react-native-easy-grid'
const ReviewScreen = ({ route, navigation }) => {
  const { user, host } = useContext(AppContext)
  const [error, setError] = useState()
  const { title, quiz, class_key } = route.params
  const [data, setData] = useState()
  const [isFetch, setFetch] = useState(false)
  const [grade, setGrade] = useState([])
  const [ungrade, setUngrade] = useState([])
  const [duplicate, setDuplicate] = useState([])

  const ScoreFetch = () => { 
    setFetch(true)
    const url = `http://${host}:5000/getscore?uid=${user.uid}&class_key=${class_key}&quiz_key=${quiz.quiz_key}`
    axios.get(url).then((res) => {
      setData(res.data.score_data)
      setFetch(false)
      //console.log('$$$', res.data.score_data)
    })
  }
  // useEffect(() => {
  //   // console.log('###uid', user.uid)
  //   // console.log('###quizKey', quiz.quiz_key)
  //   // console.log('###classKey', class_key)
  //   ScoreFetch();
  // }, [])

  useEffect(() => {
    navigation.addListener('focus', () => {
      setFetch(true)
      const url = `http://${host}:5000/getscore?uid=${user.uid}&class_key=${class_key}&quiz_key=${quiz.quiz_key}`
      axios.get(url).then((res) => {
        setData(res.data.score_data)
        setFetch(false)
        //console.log('$$$', res.data.score_data)
      })
    })
  }, [])

  useEffect(() => {
    if (data) {
      setGrade([...data.filter((obj) => obj.graded && !obj.duplicate)])
      setUngrade([...data.filter((obj) => !obj.graded && !obj.duplicate)])
      setDuplicate([...data.filter((obj) => obj.graded && obj.duplicate)])
    }
  }, [data])

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
                <Text>Graded</Text>
              </View>
            </Col>
            <Col size={2}>
              <View style={styles.quiz}>
                <Text>{grade.length}</Text>
              </View>
            </Col>
          </Row>
          <Row>
            <Col size={1}>
              <View style={styles.quiz}>
                <Text>Ungraded</Text>
              </View>
            </Col>
            <Col size={2}>
              <View style={styles.quiz}>
                <Text>{ungrade.length}</Text>
              </View>
            </Col>
          </Row>
          <Row>
            <Col size={1}>
              <View style={styles.quiz}>
                <Text>Duplicate</Text>
              </View>
            </Col>
            <Col size={2}>
              <View style={styles.quiz}>
                <Text>{duplicate.length}</Text>
              </View>
            </Col>
          </Row>
          <Text style={styles.header}>Graded</Text>
          <View style={styles.divider}></View>
          <Grid>
            {data
              ? grade.map((obj) => (
                  <Row
                    key={obj.student_key}
                    onPress={() =>
                      navigation.navigate('StatusScreen', {
                        title: 'Status',
                        quiz: quiz,
                        class_key: class_key,
                        student: obj,
                        status: 0,
                      })
                    }
                  >
                    <Col size={1}>
                      <View style={styles.grade}>
                        <Text style={{ color: 'white' }}>{obj.student_id}</Text>
                      </View>
                    </Col>
                    <Col size={2}>
                      <View style={styles.grade}>
                        <Text style={{ color: 'white' }}>
                          {obj.student_name}
                        </Text>
                      </View>
                    </Col>
                  </Row>
                ))
              : null}
          </Grid>

          <Text style={styles.header}>Ungraded</Text>
          <View style={styles.divider}></View>
          <Grid>
            {data
              ? ungrade.map((obj) => (
                  <Row
                    key={obj.student_key}
                    onPress={() =>
                      navigation.navigate('StatusScreen', {
                        title: 'Status',
                        quiz: quiz,
                        class_key: class_key,
                        student: obj,
                        status: 1,
                      })
                    }
                  >
                    <Col size={1}>
                      <View style={styles.ungrade}>
                        <Text style={{ color: 'white' }}>{obj.student_id}</Text>
                      </View>
                    </Col>
                    <Col size={2}>
                      <View style={styles.ungrade}>
                        <Text style={{ color: 'white' }}>
                          {obj.student_name}
                        </Text>
                      </View>
                    </Col>
                  </Row>
                ))
              : null}
          </Grid>
          <Text style={styles.header}>Duplicate</Text>
          <View style={styles.divider}></View>
          <Grid>
            {data
              ? duplicate.map((obj) => (
                  <Row key={obj.student_key}>
                    <Col size={1}>
                      <View style={styles.quiz}>
                        <Text>{obj.student_id}</Text>
                      </View>
                    </Col>
                    <Col size={2}>
                      <View style={styles.quiz}>
                        <Text>{obj.student_name}</Text>
                      </View>
                    </Col>
                  </Row>
                ))
              : null}
          </Grid>
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
  grade: {
    width: '90%',
    height: 37,
    backgroundColor: theme.colors.success,
    borderRadius: 10,
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    flex: 1,
    fontFamily: 'Comfortaa',
  },
  ungrade: {
    width: '90%',
    height: 37,
    backgroundColor: theme.colors.opSecondary,
    borderRadius: 10,
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    flex: 1,
    fontFamily: 'Comfortaa',
  },
  duplicate: {
    width: '90%',
    height: 37,
    backgroundColor: '#ff8800',
    borderRadius: 10,
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    flex: 1,
    fontFamily: 'Comfortaa',
  },
})
