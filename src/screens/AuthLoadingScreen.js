import React, { useContext} from 'react'
import { ActivityIndicator } from 'react-native'
import firebase from 'firebase/app'
import Background from '../components/Background'
import { theme } from '../core/theme'
import { AppContext } from '../context/context'
const AuthLoadingScreen = ({ navigation }) => {
  const { setDisplayName } = useContext(AppContext)
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is logged in
      setDisplayName(user.displayName)
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      })
    } else {
      // User is not logged in
      setDisplayName()
      navigation.reset({
        index: 0,
        routes: [{ name: 'StartScreen' }],
      })
    }
  })

  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Background>
  )
}

export default AuthLoadingScreen
