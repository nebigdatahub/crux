import ApolloClient from "apollo-boost"
import { config } from "./config"

const client = new ApolloClient({
  uri: config.ROOT_URI + config.GRAPHQL_URI,
  fetchOptions: {
    credentials: "include",
  },
  request: async operation => {
    const token = await localStorage.getItem("token")
    operation.setContext({
      headers: {
        authorization: token ? `JWT ${token}` : "",
      },
    })
  },
  onError: () => {},
  clientState: {},
  cacheRedirects: {},
})

export default client
