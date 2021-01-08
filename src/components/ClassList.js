import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { AppContext } from './../context/context'
import { theme } from '../core/theme'
import { Card, CardItem, Text, Body } from 'native-base'

const ClassList = () => {
  const { user } = useContext(AppContext)
  if (user) {
    console.log('@', user.class_data)
    return user.class_data.map((obj) => (
      <View
        key={obj.class_id}
        style={styles.container}
      >
            <Text style={ styles.header}>{obj.class_name}</Text>
      </View>
    ))
  } else return null
}

export default ClassList

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 170,
    backgroundColor: '#00C7C7',
    borderRadius: 20,
    padding: 20,
    marginTop: 7,
    marginBottom: 7,
    },
    header: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
    }
})
