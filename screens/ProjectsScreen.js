import React from 'react'
import styled from 'styled-components'
import { Button } from 'react-native'

function ProjectsScreen(props) {
  return (
    <Container>
      <Text>Projects Screen</Text>
      <Button title="Close" onPress={() => props.navigation.goBack()} />
    </Container>
  )
}

export default ProjectsScreen

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Text = styled.Text``
