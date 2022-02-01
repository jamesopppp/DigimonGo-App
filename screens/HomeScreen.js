import { setStatusBarStyle } from 'expo-status-bar'
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
} from 'react-native'
import styled from 'styled-components'
import Card from '../components/Card'
import { Ionicons } from '@expo/vector-icons'
import Logo from '../components/Logo'
import Course from '../components/Course'
import Menu from '../components/Menu'
import { connect } from 'react-redux'
import { useRef, useEffect } from 'react'
import Avatar from '../components/Avatar'
import { useQuery, gql } from '@apollo/client'
import { useFocusEffect } from '@react-navigation/native'

const CardsQuery = gql`
  {
    cardsCollection {
      items {
        title
        subtitle
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        caption
        logo {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        content
      }
    }
  }
`

function mapStateToProps(state) {
  return {
    action: state.action,
    name: state.name,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: 'OPEN_MENU',
      }),
  }
}

function HomeScreen(props) {
  const scale = useRef(new Animated.Value(1)).current
  const opacity = useRef(new Animated.Value(1)).current
  const {
    loading: cardsLoading,
    error: cardsError,
    data: cardsData,
  } = useQuery(CardsQuery)

  useFocusEffect(() => {
    setStatusBarStyle('dark')
  })

  useEffect(() => {
    toggleMenu()
  })

  const toggleMenu = () => {
    if (props.action == 'openMenu') {
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in(),
        useNativeDriver: false,
      }).start()
      Animated.spring(opacity, {
        toValue: 0.5,
        useNativeDriver: false,
      }).start()

      setStatusBarStyle('light')
    }
    if (props.action == 'closeMenu') {
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(),
        useNativeDriver: false,
      }).start()
      Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: false,
      }).start()

      setStatusBarStyle('dark')
    }
  }

  return (
    <RootView>
      <Menu />
      <AnimatedContainer
        style={{ transform: [{ scale: scale }], opacity: opacity }}
      >
        <SafeAreaView>
          <ScrollView>
            <TitleBar>
              <TouchableOpacity
                onPress={props.openMenu}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 20,
                }}
              >
                <Avatar />
              </TouchableOpacity>
              <Title>Welcome back,</Title>
              <Name>{props.name}</Name>
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
                return <Logo key={index} {...logo} />
              })}
            </ScrollView>
            <Subtitle>Continue Learning</Subtitle>
            <ScrollView
              horizontal={true}
              style={{ paddingBottom: 30 }}
              showsHorizontalScrollIndicator={false}
            >
              {cardsLoading ? (
                <Message>Loading...</Message>
              ) : cardsError ? (
                <Message>Error...</Message>
              ) : (
                <CardContainer>
                  {cardsData.cardsCollection.items.map((card, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        props.navigation.navigate('Section', {
                          section: card,
                        })
                      }}
                    >
                      <Card {...card} />
                    </TouchableOpacity>
                  ))}
                </CardContainer>
              )}
            </ScrollView>
            <Subtitle>Popular Courses</Subtitle>
            <CoursesContainer>
              {courses.map((course, index) => (
                <Course key={index} {...course} />
              ))}
            </CoursesContainer>
          </ScrollView>
        </SafeAreaView>
      </AnimatedContainer>
    </RootView>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const CoursesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 10px;
  padding-bottom: 30px;
`

const Message = styled.Text`
  margin: 20px;
  color: #b8bece;
  font-size: 15px;
  font-weight: 500;
`

const CardContainer = styled.View`
  flex-direction: row;
  padding-left: 10px;
`

const RootView = styled.View`
  background: black;
  flex: 1;
`

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 10px;
  text-transform: uppercase;
`

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: ${Platform.OS == 'ios' ? 10 : 0}px;
  border-top-right-radius: ${Platform.OS == 'ios' ? 10 : 0}px;
`

const AnimatedContainer = Animated.createAnimatedComponent(Container)

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
    image: require('../assets/logo_01.png'),
  },
  {
    text: 'Gabumon',
    image: require('../assets/logo_02.png'),
  },
  {
    text: 'Piyomon',
    image: require('../assets/logo_03.png'),
  },
  {
    text: 'Tentomon',
    image: require('../assets/logo_04.png'),
  },
  {
    text: 'Palmon',
    image: require('../assets/logo_05.png'),
  },
  {
    text: 'Gomamon',
    image: require('../assets/logo_06.png'),
  },
  {
    text: 'Patamon',
    image: require('../assets/logo_07.png'),
  },
]

const cards = [
  {
    title: 'React Native for Designers',
    image:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F4a%2F8c%2Fca%2F4a8cca78ca797f4dd85e454adedb3157.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645611695&t=c316acf9c0689cd00c38d4d3ca4d05c2',
    subtitle: 'React Native',
    caption: '1 of 12 sections',
    logo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fzyiz.net%2Fupload%2F202005%2F07%2F202005071426386611.png&refer=http%3A%2F%2Fzyiz.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645615744&t=f9718470e94f0f861728ce5027cf4d2e',
  },
  {
    title: 'Styled Components',
    image:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F4a%2F8c%2Fca%2F4a8cca78ca797f4dd85e454adedb3157.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645611695&t=c316acf9c0689cd00c38d4d3ca4d05c2',
    subtitle: 'React Native',
    caption: '2 of 12 sections',
    logo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fzyiz.net%2Fupload%2F202005%2F07%2F202005071426386611.png&refer=http%3A%2F%2Fzyiz.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645615744&t=f9718470e94f0f861728ce5027cf4d2e',
  },
  {
    title: 'Props and Icons',
    image:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F4a%2F8c%2Fca%2F4a8cca78ca797f4dd85e454adedb3157.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645611695&t=c316acf9c0689cd00c38d4d3ca4d05c2',
    subtitle: 'React Native',
    caption: '3 of 12 sections',
    logo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fzyiz.net%2Fupload%2F202005%2F07%2F202005071426386611.png&refer=http%3A%2F%2Fzyiz.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645615744&t=f9718470e94f0f861728ce5027cf4d2e',
  },
  {
    title: 'Static Data and Loop',
    image:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F4a%2F8c%2Fca%2F4a8cca78ca797f4dd85e454adedb3157.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645611695&t=c316acf9c0689cd00c38d4d3ca4d05c2',
    subtitle: 'React Native',
    caption: '4 of 12 sections',
    logo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fzyiz.net%2Fupload%2F202005%2F07%2F202005071426386611.png&refer=http%3A%2F%2Fzyiz.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645615744&t=f9718470e94f0f861728ce5027cf4d2e',
  },
]

const courses = [
  {
    title: 'Prototype in InVision Studio',
    subtitle: '10 sections',
    image:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F4a%2F8c%2Fca%2F4a8cca78ca797f4dd85e454adedb3157.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645611695&t=c316acf9c0689cd00c38d4d3ca4d05c2',
    logo: require('../assets/logo_08.png'),
    author: 'JAMES',
    avatar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fc2%2F88%2F07%2Fc2880735e9b777937f8453e4bf1d91f9.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645604761&t=7870bc0e2ec0629952c68f8e2d36a352',
    caption: 'Design and interactive prototype',
  },
  {
    title: 'Prototype in InVision Studio',
    subtitle: '10 sections',
    image:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F4a%2F8c%2Fca%2F4a8cca78ca797f4dd85e454adedb3157.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645611695&t=c316acf9c0689cd00c38d4d3ca4d05c2',
    logo: require('../assets/logo_08.png'),
    author: 'JAMES',
    avatar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fc2%2F88%2F07%2Fc2880735e9b777937f8453e4bf1d91f9.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645604761&t=7870bc0e2ec0629952c68f8e2d36a352',
    caption: 'Design and interactive prototype',
  },
  {
    title: 'Prototype in InVision Studio',
    subtitle: '10 sections',
    image:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F4a%2F8c%2Fca%2F4a8cca78ca797f4dd85e454adedb3157.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645611695&t=c316acf9c0689cd00c38d4d3ca4d05c2',
    logo: require('../assets/logo_08.png'),
    author: 'JAMES',
    avatar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fc2%2F88%2F07%2Fc2880735e9b777937f8453e4bf1d91f9.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645604761&t=7870bc0e2ec0629952c68f8e2d36a352',
    caption: 'Design and interactive prototype',
  },
  {
    title: 'Prototype in InVision Studio',
    subtitle: '10 sections',
    image:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F4a%2F8c%2Fca%2F4a8cca78ca797f4dd85e454adedb3157.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645611695&t=c316acf9c0689cd00c38d4d3ca4d05c2',
    logo: require('../assets/logo_08.png'),
    author: 'JAMES',
    avatar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fc2%2F88%2F07%2Fc2880735e9b777937f8453e4bf1d91f9.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645604761&t=7870bc0e2ec0629952c68f8e2d36a352',
    caption: 'Design and interactive prototype',
  },
  {
    title: 'Prototype in InVision Studio',
    subtitle: '10 sections',
    image:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F4a%2F8c%2Fca%2F4a8cca78ca797f4dd85e454adedb3157.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645611695&t=c316acf9c0689cd00c38d4d3ca4d05c2',
    logo: require('../assets/logo_08.png'),
    author: 'JAMES',
    avatar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fc2%2F88%2F07%2Fc2880735e9b777937f8453e4bf1d91f9.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645604761&t=7870bc0e2ec0629952c68f8e2d36a352',
    caption: 'Design and interactive prototype',
  },
]
