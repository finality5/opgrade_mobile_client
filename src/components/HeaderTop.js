import React from 'react'
import { StyleSheet } from 'react-native'
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text,
} from 'native-base'
import { theme } from '../core/theme'
const HeaderTop = ({ goBack,title }) => {
  return (
   
      <Header style={styles.header}>
        <Left>
        <Button transparent style={{ marginLeft: 30 }} onPress={goBack}>
                      <Icon name="ios-arrow-back" style={{color:'white'}} />
          </Button>
       
        </Left>
        <Body>
        <Title style={styles.content}>{ title}</Title>
        </Body>
        <Right>
          
        </Right>
      </Header>
  
  )
}

export default HeaderTop

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '140%',
  },
  header: {
    backgroundColor: theme.colors.opPrimary,
    fontWeight: 'bold',
  },
  content: {
    color: 'white',
  },
  
})