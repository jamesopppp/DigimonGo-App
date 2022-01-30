import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import AppNavigator from './navigator/AppNavigator'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://graphql.contentful.com/content/v1/spaces/ltj3qpixhdar',
  cache: new InMemoryCache(),
  credentials: 'same-origin',
  headers: {
    Authorization: `Bearer jJHl8X5jG8UaZl9l0xkHxQzXaegTTyll_LK5iRgeAM0`,
  },
})

const initialState = {
  action: '',
  name: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLOSE_MENU':
      return {
        ...state,
        action: 'closeMenu',
      }
    case 'OPEN_MENU':
      return {
        ...state,
        action: 'openMenu',
      }
    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.name,
      }
    default:
      return state
  }
}

const store = createStore(reducer)

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  </ApolloProvider>
)

export default App
