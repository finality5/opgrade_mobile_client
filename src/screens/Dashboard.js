import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
//import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { logoutUser } from '../api/auth-api'
import HeaderTop from '../components/HeaderTop'
import Toast from '../components/Toast'
import { AppContext } from '../context/context'
import { initialUserFetch } from '../api/auth-api'
import ClassList from '../components/ClassList'
import axios from 'axios'
import { Container,Content} from 'native-base'
const Dashboard = () => {
  const { user, setUser } = useContext(AppContext)
  const [error, setError] = useState()
  const [test, setTest] = useState()

  useEffect(() => {
    if (!user) {
      const response = initialUserFetch()
      if (response.error) {
        setError(response.error)
      } else {
        response.then((res) => {
          //console.log('#',res)
          setUser(res)
        })
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

  // return (
  //   <Background>
  //     <HeaderTop />
  //     {/* <Logo />
  //     <Header>{test ? test : 'NO DATA'}</Header>
  //     <Paragraph>
  //       Your amazing app starts here. Open you favorite code editor and start
  //       editing this project.
  //     </Paragraph> */}
  //     <Container>
  //       <Content padder>
  //       <ClassList />
  //       </Content>
  //     </Container>

  //     <Button
  //       mode="outlined"
  //       onPress={() => {
  //         setUser()
  //         logoutUser()
  //       }}
  //     >
  //       Logout
  //     </Button>
  //     <Toast message={error} onDismiss={() => setError('')} />
  //   </Background>
  // )
  return (
    <Container style={styles.container}>
      <HeaderTop/>
      <Content padder>
        
        <ClassList />
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
      </Content>
    </Container>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
  }
})