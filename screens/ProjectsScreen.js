import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { PanResponder, Animated } from 'react-native'
import Project from '../components/Project'

function ProjectsScreen(props) {
  const pan = useRef(new Animated.ValueXY()).current
  const scale = useRef(new Animated.Value(0.9)).current
  const translateY = useRef(new Animated.Value(44)).current
  const thirdScale = useRef(new Animated.Value(0.8)).current
  const thirdTranslateY = useRef(new Animated.Value(-50)).current
  const [index, setIndex] = useState(0)
  let _panResponder
  const willMount = useRef(true)

  const getNextIndex = (i) => {
    let nextIndex = i + 1
    if (nextIndex > projects.length - 1) {
      return 0
    }
    return nextIndex
  }

  const initialPanResponder = () => {
    if (willMount.current || _panResponder == null) {
      _panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          // 第二张前移
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: false,
          }).start()
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: false,
          }).start()

          // 第三张占据第二张位置
          Animated.spring(thirdScale, {
            toValue: 0.9,
            useNativeDriver: false,
          }).start()
          Animated.spring(thirdTranslateY, {
            toValue: 44,
            useNativeDriver: false,
          }).start()
        },
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        }),
        onPanResponderRelease: () => {
          const positionY = pan.y.__getValue()

          if (positionY > 200) {
            // 卡片扔出
            Animated.timing(pan, {
              toValue: {
                x: 0,
                y: 1000,
              },
              useNativeDriver: false,
            }).start(() => {
              // 卡片扔出完成
              pan.setValue({
                x: 0,
                y: 0,
              })
              scale.setValue(0.9)
              translateY.setValue(44)
              thirdScale.setValue(0.8)
              thirdTranslateY.setValue(-50)
              setIndex(getNextIndex)
            })
          } else {
            // 复位第一张
            Animated.spring(pan, {
              toValue: {
                x: 0,
                y: 0,
              },
              useNativeDriver: false,
            }).start()

            // 复位第二张
            Animated.spring(scale, {
              toValue: 0.9,
              useNativeDriver: false,
            }).start()
            Animated.spring(translateY, {
              toValue: 44,
              useNativeDriver: false,
            }).start()

            // 复位第三张
            Animated.spring(thirdScale, {
              toValue: 0.8,
              useNativeDriver: false,
            }).start()
            Animated.spring(thirdTranslateY, {
              toValue: -50,
              useNativeDriver: false,
            }).start()
          }
        },
      })
      willMount.current = false
    }
  }

  initialPanResponder()

  return (
    <Container>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {..._panResponder.panHandlers}
      >
        <Project {...projects[index]} />
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          transform: [
            {
              scale: scale,
            },
            { translateY: translateY },
          ],
        }}
      >
        <Project {...projects[getNextIndex(index)]} />
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -3,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{ scale: thirdScale }, { translateY: thirdTranslateY }],
        }}
      >
        <Project {...projects[getNextIndex(index + 1)]} />
      </Animated.View>
    </Container>
  )
}

export default ProjectsScreen

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f0f3f5;
`

const projects = [
  {
    title: 'React Native',
    image: require('../assets/background5.jpg'),
    author: 'JAMES',
    text: 'React Native apps may target iOS 11.0 and Android 5.0 (API 21) or newer. You may use Windows, macOS, or Linux as your development operating system, ',
  },
  {
    title: 'Building First App',
    image: require('../assets/background6.jpg'),
    author: 'JAMES',
    text: 'Follow the Getting Started guide. The recommended way to install React Native depends on your project. ',
  },
  {
    title: 'Documentation',
    image: require('../assets/background7.jpg'),
    author: 'JAMES',
    text: 'The React Native documentation discusses components, APIs, and topics that are specific to React Native. ',
  },
]
