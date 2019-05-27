import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import fetch from 'node-fetch'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
const { createUploadLink } = require('apollo-upload-client')

// import { WebSocketLink } from 'apollo-link-ws'
// https://medium.com/quasar-framework/adding-apollo-client-to-quasar-5da265719dc8
// https://medium.com/apollo-stack/pagination-and-infinite-scrolling-in-apollo-client-59ff064aac61#.po8zzknao

// global.serverUrl = 'http://192.168.0.59:4000/graphql'
// global.imageUploadUrl = 'http://192.168.0.59:4000/upload'

// global.serverUrl = 'http://192.168.0.105:4000/graphql'
// global.imageUploadUrl = 'http://192.168.0.105:4000/upload'

// global.serverUrl = 'http://10.5.50.138:4000/graphql'
// global.imageUploadUrl = 'http://10.5.50.138:4000/upload'

// global.serverUrl = 'http://192.168.0.59:4000/graphql '
// global.imageUploadUrl = 'http://192.168.0.59:4000/upload'

// global.serverUrl = 'https://gluesocial.herokuapp.com/graphql '
// global.imageUploadUrl = 'https://gluesocial.herokuapp.com/upload'

// global.serverUrl = "https://stormy-plateau-95107.herokuapp.com/graphql"
// global.imageUploadUrl = "https://stormy-plateau-95107.herokuapp.com/upload"

global.serverUrl = 'http://192.168.0.59:4000/graphql'
global.imageUploadUrl = 'http://192.168.0.59:4000/upload'

const httpLink = createHttpLink({
  uri: global.serverUrl,
  fetch: fetch
})

// const wsLink = new WebSocketLink({
//   uri: 'ws://' + serverUrl + '/graphql',
//   options: {
//     reconnect: true
//   }
// })

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('x-token')
  console.log('------------------------')
  console.log('------------------------', token)
  return {
    headers: {
      headers,
      'x-token': token || ''
    }
  }
})
// Create the apollo client
// wsLink,
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink, createUploadLink()),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  errorHandler ({ graphQLErrors, networkError }) {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      })
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  }
})

export default ({ app, Vue }) => {
  Vue.use(VueApollo)
  app.apolloProvider = apolloProvider
}
