import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet } from 'react-native'
import Button from '../components/Button'
import { logoutUser } from '../api/auth-api'
import HeaderTop from '../components/HeaderTop'
import Toast from '../components/Toast'
import { AppContext } from '../context/context'
import {
  initialUserFetch,
  initialHostFetch,
  initialUserFetch2,
} from '../api/auth-api'
import ClassList from '../components/ClassList'
import axios from 'axios'
import { Container, Content, Spinner, View } from 'native-base'
import { theme } from '../core/theme'
const Dashboard = ({ navigation }) => {
  const { user, setUser, setHost, ticker } = useContext(AppContext)
  const [error, setError] = useState()
  const [isFetch, setFetch] = useState(false)
  
  //const [test, setTest] = useState()

  useEffect(() => {
    if (!user) {
      setFetch(true)
      const response2 = initialUserFetch2()
      if (response2.error) {
        setError(response2.error)
        setFetch(false)
      } else {
        response2
          .then((res) => {
            setFetch(false)
            setUser(res)
          })
          .catch((err) => {
            setFetch(false)
            setError(err)
          })
      }

      const host = initialHostFetch()
      if (host.error) {
        setError(host.error)
      } else {
        host
          .then((result) => {
            //console.log('###',result)
            setHost(result)
          })
          .catch((err) => setError(err))
      }
    }
  }, [ticker])

  return (
    <Container style={styles.container}>
      <HeaderTop goBack={navigation.goBack} title="Classes" />
      <Content padder>
        {!isFetch ? (
          <View>
            <ClassList navigation={navigation} />
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
          </View>
        ) : (
            <Spinner style={{top:300}} color={theme.colors.opAlter} />
        )}

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
