import React, { useRef } from 'react'
import styled from 'styled-components'
import {
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { setStatusBarHidden } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

function Project(props) {
  const cardWidth = useRef(new Animated.Value(315)).current
  const cardHeight = useRef(new Animated.Value(460)).current
  const titleTop = useRef(new Animated.Value(20)).current
  const opacity = useRef(new Animated.Value(0)).current

  const tabBarHeight = useBottomTabBarHeight()

  const openCard = () => {
    Animated.spring(cardWidth, {
      toValue: screenWidth,
      useNativeDriver: false,
    }).start()
    Animated.spring(cardHeight, {
      toValue: screenHeight - tabBarHeight,
      useNativeDriver: false,
    }).start()
    Animated.spring(titleTop, {
      toValue: 40,
      useNativeDriver: false,
    }).start()
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: false,
    }).start()

    setStatusBarHidden(true, 'fade')
  }

  const closeCard = () => {
    Animated.spring(cardWidth, {
      toValue: 315,
      useNativeDriver: false,
    }).start()
    Animated.spring(cardHeight, {
      toValue: 460,
      useNativeDriver: false,
    }).start()
    Animated.spring(titleTop, {
      toValue: 20,
      useNativeDriver: false,
    }).start()
    Animated.timing(opacity, {
      toValue: 0,
      useNativeDriver: false,
    }).start()

    setStatusBarHidden(false, 'fade')
  }

  return (
    <TouchableWithoutFeedback onPress={openCard}>
      <AnimatedContainer style={{ width: cardWidth, height: cardHeight }}>
        <Cover>
          <Image source={props.image} />
          <AnimatedTitle style={{ top: titleTop }}>{props.title}</AnimatedTitle>
          <Author>by {props.author}</Author>
        </Cover>
        <Text>{props.text}</Text>
        <TouchableOpacity
          style={{ position: 'absolute', top: 20, right: 20 }}
          onPress={closeCard}
        >
          <AnimatedCloseView style={{ opacity: opacity }}>
            <Ionicons name="close" size={24} color="#546bfb" />
          </AnimatedCloseView>
        </TouchableOpacity>
      </AnimatedContainer>
    </TouchableWithoutFeedback>
  )
}

export default Project

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background-color: #fff;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`

const AnimatedCloseView = Animated.createAnimatedComponent(CloseView)

const Container = styled.View`
  width: 315px;
  height: 460px;
  border-radius: 14px;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`

const AnimatedContainer = Animated.createAnimatedComponent(Container)

const Cover = styled.View`
  height: 290px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`

const Image = styled.Image`
  width: 100%;
  height: 290px;
`

const Title = styled.Text`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  width: 300px;
`

const AnimatedTitle = Animated.createAnimatedComponent(Title)

const Author = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`

const Text = styled.Text`
  font-size: 17px;
  margin: 20px;
  line-height: 24px;
  color: #3c4560;
`
