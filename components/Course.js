import React from 'react'
import styled from 'styled-components'

const Course = (props) => (
  <Container>
    <Cover>
      <Image source={{ uri: props.image }} />
      <Logo source={props.logo} resizeMode="contain" />
      <Subtitle>{props.subtitle}</Subtitle>
      <Title>{props.title}</Title>
    </Cover>
    <Content>
      <Avatar source={{ uri: props.avatar }} />
      <Caption>{props.caption}</Caption>
      <Name>Taught by {props.author}</Name>
    </Content>
  </Container>
)

export default Course

const Container = styled.View`
  width: 315px;
  height: 335px;
  background-color: #fff;
  margin: 10px 20px;
  border-radius: 14px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`

const Cover = styled.View`
  height: 260px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
  justify-content: flex-end;
`

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`

const Logo = styled.Image`
  position: absolute;
  width: 48px;
  height: 48px;
  top: 90px;
  left: 50%;
  margin-left: -24px;
`

const Title = styled.Text`
  font-size: 24px;
  color: #fff;
  font-weight: 600;
  margin-top: 4px;
  margin-bottom: 20px;
  margin-left: 20px;
  width: 170px;
`

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  margin-left: 20px;
`

const Content = styled.View`
  height: 75px;
  padding-left: 62px;
  justify-content: center;
`

const Avatar = styled.Image`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 32px;
  height: 32px;
  border-radius: 16px;
`

const Caption = styled.Text`
  font-size: 14px;
  color: #3c4560;
  font-weight: 500;
`

const Name = styled.Text`
  font-size: 13px;
  color: #b8bece;
  font-weight: 500;
  margin-top: 4px;
`
