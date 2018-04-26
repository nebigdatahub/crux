import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import { onError } from "apollo-link-error"
import { ApolloLink } from "apollo-link"
import { createUploadLink } from "./providers"

import { config } from "./config"

const request = async operation => {
  const token = await localStorage.getItem("token")
  operation.setContext({
    headers: {
      authorization: token ? `JWT ${token}` : "",
    },
  })
}

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) handle.unsubscribe
      }
    })
)

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) console.log()
  // graphQLErrors.map(({ message, locations, path }) =>
  //   // console.error(
  //   //   `[GraphQL Error]: Message: ${message}, Location: ${locations}, Path: ${path}`
  //   // )
  // )
  if (networkError) console.error("[Network Error]: ${networkError}")
})

const httpLink = new HttpLink({
  uri: config.ROOT_URI + config.GRAPHQL_URI,
  credentials: "same-origin",
})

const uploadLink = createUploadLink({
  uri: config.ROOT_URI + config.GRAPHQL_URI,
})

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, requestLink, uploadLink]),
  connectToDevTools:
    process.env.NODE_ENV == "development" || process.env.NODE_ENV == "staging",
  cache: new InMemoryCache(),
})

export default client
