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
  Toast
} from 'native-base'
import { theme } from '../core/theme'
import { AppContext } from '../context/context'
const HeaderTop = ({ goBack, title }) => {
  const { ticker,setTicker } = useContext(AppContext)
  return (
    <Header style={styles.header}>
      <Left>
        {title === "Classes" ? (<Button transparent onPress={ ()=>setTicker(!ticker)} style={{ marginLeft: 30 }}>
            <Icon name="menu" style={{ color: 'white' }} />
          </Button>):title === 'result'?(
            <Button transparent style={{ marginLeft: 30 }} onPress={() => {
              Toast.hide()
              goBack()
            }}>
            <Icon name="ios-arrow-back" style={{ color: 'white' }} />
          </Button>):(
          <Button transparent style={{ marginLeft: 30 }} onPress={goBack}>
            <Icon name="ios-arrow-back" style={{ color: 'white' }} />
          </Button>)
        }
      </Left>
      <Body>
        <Title style={styles.content}>{title}</Title>
      </Body>
      <Right></Right>
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
