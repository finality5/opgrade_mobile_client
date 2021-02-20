import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { AppContext } from './../context/context'
import { theme } from '../core/theme'
import { Card, CardItem, Text, Body, Button, Icon } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'

const boxColor = ['opAlter', 'opSecondary', 'opPrimary']

const ClassList = ({ navigation }) => {
  const { user } = useContext(AppContext)
  if (user) {
    //console.log('@', user.class_data)
    return user.class_data.map((obj, index) => (
      <Button
        key={obj.class_key}
        style={{
          width: '100%',
          height: 170,
          backgroundColor: theme.colors[[boxColor[index % 3]]],
          borderRadius: 20,
          padding: 10,
          marginTop: 7,
          marginBottom: 7,
        }}
        onPress={() =>
          navigation.navigate('ClassIndex', {
            title: obj.class_name,
            classId:obj.class_id
          })
        }
      >
        <Grid>
          <Row>
            <Text style={styles.header}>{obj.class_name}</Text>
          </Row>

          <Row style={styles.buttonContainer}>
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
          </Row>
        </Grid>
      </Button>
    ))
  } else return null
}

export default ClassList

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 40,
    padding: 5,
  },
  header: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Comfortaa',
    marginTop: 20,
  },
})
