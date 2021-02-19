import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet } from 'react-native'
import Button from '../components/Button'
import { logoutUser } from '../api/auth-api'
import HeaderTop from '../components/HeaderTop'
import Toast from '../components/Toast'
import { AppContext } from '../context/context'
import { initialUserFetch, initialHostFetch } from '../api/auth-api'
import ClassList from '../components/ClassList'
import axios from 'axios'
import { Container, Content } from 'native-base'
import { theme } from '../core/theme'
const Dashboard = ({ navigation }) => {
  const { user, setUser, setHost } = useContext(AppContext)
  const [error, setError] = useState()
  //const [test, setTest] = useState()

  useEffect(() => {
    if (!user) {
      const response = initialUserFetch()
      if (response.error) {
        setError(response.error)
      } else {
        response
          .then((res) => {
            console.log('###',res)
            setUser(res)
          })
          .catch((err) => setError(err))
      }
      const host = initialHostFetch()
      if (host.error) {
        setError(host.error)
      } else {
        host
          .then((result) => {
            console.log('###',result)
            setHost(result)
          })
          .catch((err) => setError(err))
      }
    }
    // axios
    //   .get('http://192.168.2.53:5000/class')
    //   .then((res) => {
    //     console.log('#',res.data.class_data)
    //     //setTest(res.data.message)
    //   })
    //   .catch((err) => setError(err.message))
  }, [])

  return (
    <Container style={styles.container}>
      <HeaderTop goBack={navigation.goBack} title="Classes" />
      <Content padder>
        {!error ? <ClassList navigation={navigation} /> : error}
        <Content style={{ marginTop: 100 }}>
          <Button
            mode="outlined"
            onPress={() => {
              setUser()
              logoutUser()
            }}
          >
            Logout
          </Button>
        </Content>
        <Toast message={error} onDismiss={() => setError('')} />
      </Content>
    </Container>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
  },
})
