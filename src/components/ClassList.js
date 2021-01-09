import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { AppContext } from './../context/context'
import { theme } from '../core/theme'
import { Card, CardItem, Text, Body, Button, Icon } from 'native-base'

const boxColor = ['opAlter', 'opSecondary', 'opPrimary']

const ClassList = () => {
  const { user } = useContext(AppContext)
  if (user) {
    console.log('@', user.class_data)
    return user.class_data.map((obj, index) => (
      <View
        key={obj.class_id}
        style={{
          width: '100%',
          height: 170,
          backgroundColor: theme.colors[[boxColor[index % 3]]],
          borderRadius: 20,
          padding: 20,
          marginTop: 7,
          marginBottom: 7,
        }}
      >
        <Text style={styles.header}>{obj.class_name}</Text>
        <View
          style={{
            row: {
              flex: 1,
              flexDirection: 'row',
            },
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <Button
              iconLeft
              style={{
                backgroundColor: theme.colors[[boxColor[index % 3]]],
              }}
            >
              <Icon name="ios-paper" />
              <Text>{obj.quiz.length}</Text>
            </Button>
            <Button
              iconLeft
              style={{
                backgroundColor: theme.colors[[boxColor[index % 3]]],
              }}
            >
              <Icon name="ios-person" />
              <Text>{obj.student.length}</Text>
            </Button>
          </View>
        </View>
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
    fontWeight: 'bold',
    fontFamily: 'Comfortaa',
  },
})
