import React, { useState, useEffect, useContext } from 'react'
import Button from '../components/Button'
import HeaderTop from '../components/HeaderTop'
import Toast from '../components/Toast'
import ClassList from '../components/ClassList'
import axios from 'axios'
import { AppContext } from '../context/context'
import { Container, Content, Text, View } from 'native-base'
import { StyleSheet } from 'react-native'
import { theme } from '../core/theme'
const ClassIndex = ({ route, navigation }) => {
  const { user, setUser } = useContext(AppContext)
  const [error, setError] = useState()
  const { title, classId } = route.params

  return (
    <Container style={styles.container}>
      <HeaderTop goBack={navigation.goBack} title={title} />
      <Content padder>
        <Text style={styles.header}>{title}</Text>
        <View style={styles.divider}></View>
        <Text style={styles.header}>Quiz</Text>
        <View style={styles.divider}></View>
        <Toast message={error} onDismiss={() => setError('')} />
      </Content>
    </Container>
  )
}

export default ClassIndex

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
    marginTop: 20,
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
})
