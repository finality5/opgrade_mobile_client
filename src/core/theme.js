import { DefaultTheme } from 'react-native-paper'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    primary: '#121330',
    secondary: '#414757',
    error: '#f13a59',
    success: '#00B386',
    opPrimary: '#4294d0',
    opSecondary: '#2c393fff',
    opAlter: '#78909cff',
  },
  host:'192.168.2.53:5000/'
}
