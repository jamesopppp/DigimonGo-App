import { StatusBar } from 'expo-status-bar'
import { ScrollView, SafeAreaView } from 'react-native'
import styled from 'styled-components'
import Card from './components/Card'
import { Ionicons } from '@expo/vector-icons'
import Data from './mock/index.json'
import Logo from './components/Logo'

export default function App() {
  return (
    <Container>
      <SafeAreaView>
        <ScrollView>
          <TitleBar>
            <Avatar
              source={{
                uri: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fc2%2F88%2F07%2Fc2880735e9b777937f8453e4bf1d91f9.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645604761&t=7870bc0e2ec0629952c68f8e2d36a352',
              }}
            />
            <Title>Welcome back,</Title>
            <Name>JAMES</Name>
            <Ionicons
              name="notifications"
              size={24}
              color="#4775f2"
              style={{ position: 'absolute', right: 20, top: 5 }}
            />
          </TitleBar>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{
              flexDirection: 'row',
              padding: 20,
              paddingLeft: 12,
              paddingTop: 30,
            }}
          >
            {logos.map((logo, index) => {
              return <Logo key={index} image={logo.image} text={logo.text} />
            })}
          </ScrollView>
          <Subtitle>Continue Learning</Subtitle>
          <ScrollView
            horizontal={true}
            style={{ paddingBottom: 30 }}
            showsHorizontalScrollIndicator={false}
          >
            {Data.card.map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </Container>
  )
}

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 10px;
  text-transform: uppercase;
`

const Avatar = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 22px;
  margin-left: 20px;
`

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
`

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`

const logos = [
  {
    text: 'Agumon',
    image: require('./assets/logo_01.png'),
  },
  {
    text: 'Gabumon',
    image: require('./assets/logo_02.png'),
  },
  {
    text: 'Piyomon',
    image: require('./assets/logo_03.png'),
  },
  {
    text: 'Tentomon',
    image: require('./assets/logo_04.png'),
  },
  {
    text: 'Palmon',
    image: require('./assets/logo_05.png'),
  },
  {
    text: 'Gomamon',
    image: require('./assets/logo_06.png'),
  },
  {
    text: 'Patamon',
    image: require('./assets/logo_07.png'),
  },
]
