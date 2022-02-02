import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { PanResponder, Animated } from 'react-native'
import Project from '../components/Project'

function ProjectsScreen(props) {
  const pan = useRef(new Animated.ValueXY()).current
  let _panResponder
  const willMount = useRef(true)

  const initialPanResponder = () => {
    // if (willMount.current) {
    _panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: false,
        }).start()
      },
    })
    //   willMount.current = false
    // }
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
        <Project
          title="Price Tag"
          image="https://p78.f0.n0.cdn.getcloudapp.com/items/4guZrBZR/ac70e89c-77c7-46a9-851c-09340d3075ff.jpg?source=viewer&v=8c28e2b9c458ad9de782e3ab82df80bd"
          author="JAMES"
          text="React Native brings React's declarative UI framework to iOS and Android. With React Native, you use native UI controls and have full access to the native platform."
        />
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
