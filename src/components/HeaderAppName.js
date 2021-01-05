import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'

const HeaderAppName = (props) => <Text style={styles.header} {...props} />

const styles = StyleSheet.create({
  header: {
    fontSize: 50,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 40,
  },
})

export default HeaderAppName
