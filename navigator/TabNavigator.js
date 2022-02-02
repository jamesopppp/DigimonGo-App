import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'
import HomeScreen from '../screens/HomeScreen'
import SectionScreen from '../screens/SectionScreen'
import CoursesScreen from '../screens/CoursesScreen'
import ProjectsScreen from '../screens/ProjectsScreen'

const activeColor = '#4775f2'
const inactiveColor = '#b8bece'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      presentation: 'modal',
      headerShown: false,
    }}
  >
    <Stack.Screen name="Index" component={HomeScreen} />
    <Stack.Screen name="Section" component={SectionScreen} />
  </Stack.Navigator>
)

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Projects"
      component={ProjectsScreen}
      options={{
        tabBarLabel: 'Projects',
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={'folder'}
            size={26}
            color={focused ? activeColor : inactiveColor}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={({ navigation }) => {
        // let tabBarVisible = true
        // const { index, routes } = navigation.getState()
        // const routeName = routes[index].name

        // if (routeName == 'Section') {
        // }

        return {
          // tabBarStyle: { display: 'none' },
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={'home'}
              size={26}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }
      }}
    />
    <Tab.Screen
      name="Courses"
      component={CoursesScreen}
      options={{
        tabBarLabel: 'Course',
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={'albums'}
            size={26}
            color={focused ? activeColor : inactiveColor}
          />
        ),
      }}
    />
  </Tab.Navigator>
)

export default TabNavigator
