import React, { useContext } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { logoutUser } from '../api/auth-api'
import { AppContext } from '../context/context'
import HeaderTop from '../components/HeaderTop'

import { View} from 'react-native'
const Dashboard = () => {
  const { displayName } = useContext(AppContext)

  return (
    <Background>
      <HeaderTop />
      <Logo />
      <Header>{displayName}</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
      <Button mode="outlined" onPress={logoutUser}>
        Logout
      </Button>
    </Background>
  )
}

export default Dashboard
