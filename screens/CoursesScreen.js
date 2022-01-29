import React from 'react'
import styled from 'styled-components'
import { Button } from 'react-native'

function CoursesScreen(props) {
  return (
    <Container>
      <Text>Courses Screen</Text>
      <Button title="Close" onPress={() => props.navigation.goBack()} />
    </Container>
  )
}

export default CoursesScreen

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Text = styled.Text``
