import React from 'react'
import styled from 'styled-components'

const Card = (props) => (
  <Container>
    <Cover>
      <Image
        source={{
          uri: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F4a%2F8c%2Fca%2F4a8cca78ca797f4dd85e454adedb3157.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645611695&t=c316acf9c0689cd00c38d4d3ca4d05c2',
        }}
      />
      <Title>Styled Components</Title>
    </Cover>
  </Container>
)

export default Card

const Container = styled.View`
  background-color: white;
  width: 315px;
  height: 280px;
  border-radius: 14px;
  margin-left: 20px;
  margin-top: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`

const Cover = styled.View`
  width: 100%;
  height: 200px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`

const Image = styled.Image`
  width: 100%;
  height: 100%;
`

const Title = styled.Text``
