import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import HeaderAppName from '../components/HeaderAppName'

const StartScreen = ({ navigation }) => (
  <Background>
    <HeaderAppName>Opgrade</HeaderAppName>
    <Logo />
    <Header>Camera Grading App</Header>
    <Paragraph>
    Start grading your exams in easier way for better quality of measurement.
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('RegisterScreen')}
    >
      Sign Up
    </Button>
  </Background>
)

export default StartScreen
