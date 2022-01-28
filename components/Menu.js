import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Animated, TouchableOpacity, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import MenuItem from './MenuItem'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return { action: state.action }
}

function mapDispatchToProps(dispatch) {
  return {
    closeMenu: () =>
      dispatch({
        type: 'CLOSE_MENU',
      }),
  }
}

const screenHeight = Dimensions.get('window').height

const Menu = (props) => {
  const top = useRef(new Animated.Value(screenHeight)).current

  useEffect(() => {
    toggleMenu()
  }, [])

  useEffect(() => {
    toggleMenu()
  })

  const toggleMenu = () => {
    if (props.action == 'openMenu') {
      Animated.spring(top, {
        toValue: 54,
        useNativeDriver: false,
      }).start()
    }

    if (props.action == 'closeMenu') {
      Animated.spring(top, {
        toValue: screenHeight,
        useNativeDriver: false,
      }).start()
    }
  }

  return (
    <AnimatedContainer style={{ top: top }}>
      <Cover>
        <Image
          source={{
            uri: 'https://img1.baidu.com/it/u=3983561783,2317987665&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
          }}
        />
        <Title>JAMES</Title>
        <Subtitle>Designer at Space</Subtitle>
      </Cover>
      <TouchableOpacity
        onPress={props.closeMenu}
        style={{
          position: 'absolute',
          top: 120,
          left: '50%',
          marginLeft: -22,
          zIndex: 1,
        }}
      >
        <CloseView>
          <Ionicons name="close" size={44} color="#546bfb" />
        </CloseView>
      </TouchableOpacity>
      <Content>
        {items.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </Content>
    </AnimatedContainer>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`

const Title = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: 600;
`

const Subtitle = styled.Text`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
`

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: #fff;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`

const Container = styled.View`
  position: absolute;
  background: #fff;
  width: 100%;
  height: 100%;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`

const AnimatedContainer = Animated.createAnimatedComponent(Container)

const Cover = styled.View`
  height: 142px;
  background: #000;
  justify-content: center;
  align-items: center;
`

const Content = styled.View`
  height: ${screenHeight}px;
  background: #f0f3f5;
  padding: 50px;
`

const items = [
  {
    icon: 'settings',
    title: 'Account',
    text: 'settings',
  },
  {
    icon: 'card',
    title: 'Billing',
    text: 'payments',
  },
  {
    icon: 'compass',
    title: 'Learn React',
    text: 'start course',
  },
  {
    icon: 'exit',
    title: 'Log out',
    text: 'see you soon!',
  },
]
