import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import firebase from 'firebase/app'
import 'firebase/auth'
import { theme } from './src/core/theme'
import {
  AuthLoadingScreen,
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  ClassIndex,
  QuizIndex,
  CameraIndex,
  ResultScreen,
  StatScreen
} from './src/screens'
import { FIREBASE_CONFIG } from './src/core/config'
import { AppProvider } from './src/context/context'

const Stack = createStackNavigator()
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG)
}

const App = () => {
  return (
    <AppProvider>
      <Provider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="AuthLoadingScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="AuthLoadingScreen"
              component={AuthLoadingScreen}
            />
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="ClassIndex" component={ClassIndex} />
            <Stack.Screen name="QuizIndex" component={QuizIndex} />
            <Stack.Screen name="CameraIndex" component={CameraIndex} />
            <Stack.Screen name="ResultScreen" component={ResultScreen} />
            <Stack.Screen name="StatScreen" component={StatScreen} />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </AppProvider>
  )
}

export default App
