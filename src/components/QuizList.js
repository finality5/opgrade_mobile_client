import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'native-base'
const QuizList = ({ quiz, class_key, navigation }) => {
  return quiz.map((obj) => (
    <Button
      style={styles.quiz}
      key={obj.quiz_key}
      onPress={() =>
        navigation.navigate('QuizIndex', {
          quiz: obj,
          Class_key: class_key,
        })
      }
    >
      <Text>{obj.quiz_name}</Text>
    </Button>
  ))
}

export default QuizList

const styles = StyleSheet.create({
  quiz: {
    width: '90%',
    height: 37,
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15,

    fontFamily: 'Comfortaa',
  },
})
