import React, { useState, useEffect, useContext } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { logoutUser } from '../api/auth-api'
import HeaderTop from '../components/HeaderTop'
import Toast from '../components/Toast'
import { AppContext } from '../context/context'
import { initialUserFetch } from '../api/auth-api'
import axios from 'axios'
const Dashboard = () => {
  const { user, setUser } = useContext(AppContext)
  const [error, setError] = useState()
  const [test, setTest] = useState()

  useEffect(() => {
    // if (!user) {
    //   const response = initialUserFetch()
    //   if (response.error) {
    //     setError(userData.error)
    //   } else {
    //     response.then((res) => {
    //       setUser(res.data)
    //     })
    //   }
    // }
    axios
      .get('http://192.168.2.53:5000/test')
      .then((res) => {
        setTest(res.message)
      })
      .catch((err) => setError(err.message))
  }, [])

  return (
    <Background>
      <HeaderTop />
      <Logo />
      <Header>{test ? test : 'NO DATA'}</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() => {
          setUser()
          logoutUser()
        }}
      >
        Logout
      </Button>
      <Toast message={error} onDismiss={() => setError('')} />
    </Background>
  )
}

export default Dashboard
