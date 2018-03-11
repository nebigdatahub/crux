import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import { config } from './config'

const httpLink = new HttpLink({
  uri: config.ROOT_URI + config.GRAPHQL_URI,
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem(config.TOKEN_NAME)
  operation.setContext({
    headers: {
      authorization: token ? `JWT ${token}` : "",
    }
  });

  return forward(operation);
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
})

export default client