import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'

function SectionScreen(props) {
  const { route } = props
  const { section } = route.params

  useEffect(() => {}, [])

  return (
    <Container>
      <StatusBar animated={true} style={'light'} />
      <Cover>
        <Image source={{ uri: section.image.url }} />
        <Wrapper>
          <Logo source={{ uri: section.logo.url }} />
          <Subtitle>{section.subtitle}</Subtitle>
        </Wrapper>
        <Title>{section.title}</Title>
        <Caption>{section.caption}</Caption>
      </Cover>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{ position: 'absolute', top: 20, right: 20 }}
      >
        <CloseView>
          <Ionicons
            name={'close'}
            size={28}
            color="#4775f2"
            style={{ marginTop: 2, marginLeft: 1 }}
          />
        </CloseView>
      </TouchableOpacity>
    </Container>
  )
}

export default SectionScreen

const Container = styled.View`
  flex: 1;
`

const Cover = styled.View`
  height: 375px;
`

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`

const Title = styled.Text`
  position: absolute;
  top: 78px;
  left: 20px;
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  width: 170px;
`

const Caption = styled.Text`
  position: absolute;
  color: #fff;
  font-size: 17px;
  left: 20px;
  bottom: 20px;
  width: 300px;
`

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`

const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
  align-items: center;
`

const Logo = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 12px;
`

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  text-transform: uppercase;
`
