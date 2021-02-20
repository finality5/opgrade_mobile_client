import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Col, Row} from 'react-native-easy-grid'
const StudentList = ({ student}) => {
    return student.map(obj=>
    (<Row key={obj.student_key}>
              <Col size={1}>
                <View style={styles.student}>
                  <Text>{obj.student_id}</Text>
                </View>
              </Col>
              <Col size={2}>
                <View style={styles.student}>
                  <Text>{obj.student_name}</Text>
                </View>
              </Col>
            </Row>)
    )
}

export default StudentList

const styles = StyleSheet.create({student: {
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
  },})
