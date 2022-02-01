import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, Linking, ScrollView } from 'react-native'
import { setStatusBarStyle } from 'expo-status-bar'
import { WebView } from 'react-native-webview'
import Markdown from 'react-native-showdown'

function SectionScreen(props) {
  const { route } = props
  const { section } = route.params
  const webview = useRef()

  useEffect(() => {
    setStatusBarStyle('light')
  }, [])

  return (
    <ScrollView>
      <Container>
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
        <Content>
          {/* <WebView
          source={{ html: section.content + htmlStyles }}
          scalesPageToFit={false}
          scrollEnabled={false}
          ref={webview}
          style={{ backgroundColor: 'transparent' }}
          onNavigationStateChange={(event) => {
            // 非空白页再跳转
            if (event.url != 'about:blank') {
              // 阻止webview默认跳转行为
              webview.current.stopLoading()
              Linking.openURL(event.url)
            }
          }}
        /> */}
          <Markdown
            style={{ backgroundColor: 'transparent' }}
            onNavigationStateChange={(event) => {
              // 非空白页再跳转
              if (event.url != 'about:blank') {
                // 阻止webview默认跳转行为
                Linking.openURL(event.url)
              }
            }}
            body={section.content}
            pureCSS={htmlStyles}
            scalesPageToFit={false}
            scrollEnabled={false}
          />
        </Content>
      </Container>
    </ScrollView>
  )
}

export default SectionScreen

const htmlContent = `
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <h2>This is a title</h2>
  <p>This <strong>is</strong> a <a href="https://superjames.top">link</a></p>
  <img src="https://p78.f0.n0.cdn.getcloudapp.com/items/4guZrBZR/ac70e89c-77c7-46a9-851c-09340d3075ff.jpg?v=8c28e2b9c458ad9de782e3ab82df80bd"/>
`

const htmlStyles = `
    * {
      font-family: -apple-system, Roboto;
      margin: 0;
      padding: 0;
      font-size: 17px;
      font-weight: normal;
      color: #3c4560;
      line-height: 24px;
    }

    h2 {
      font-size: 20px;
      text-transform: uppercase;
      color: #b8bece;
      font-weight: 600;
      margin-top: 50px;
    }

    p {
      margin-top: 20x;
    }

    a {
      color: #4775f2;
      font-weight: 600;
      text-decoration: none;
    }

    strong {
      font-weight: 700;
    }

    img {
      width: 100%;
      border-radius: 10px;
      margin-top: 20px;
    }
`

const Content = styled.View`
  height: 1000px;
  padding: 20px;
`

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
