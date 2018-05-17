import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { ApolloLink } from "apollo-link"
import { onError } from "apollo-link-error"
import { HttpLink } from "apollo-link-http"
import { GRAPHQL_URI, ROOT_URI, TOKEN_NAME } from "./config"
import { createUploadLink } from "./providers"

const request = async operation => {
  const token = await localStorage.getItem(TOKEN_NAME)
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
  if (networkError) console.error(`[Network Error]: ${networkError}`)
})

const httpLink = new HttpLink({
  uri: ROOT_URI + GRAPHQL_URI,
  credentials: "same-origin",
})

const uploadLink = createUploadLink({
  uri: ROOT_URI + GRAPHQL_URI,
})

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, requestLink, uploadLink]),
  connectToDevTools:
    process.env.NODE_ENV == "development" || process.env.NODE_ENV == "staging",
  cache: new InMemoryCache(),
})

export default client
