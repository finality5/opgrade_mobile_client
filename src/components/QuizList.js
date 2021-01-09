import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const QuizList = ({ quiz }) => {
  return quiz.map((obj) => (
    <View style={styles.quiz} key={obj.quiz_id}>
      <Text>{obj.quiz_name}</Text>
    </View>
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
    justifyContent: 'center',
    flex: 1,
    fontFamily: 'Comfortaa',
  },
})
