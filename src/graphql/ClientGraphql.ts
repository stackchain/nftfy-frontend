import { ApolloClient, InMemoryCache } from '@apollo/client'

export const graphQlClient = new ApolloClient({
  uri: '',
  typeDefs: undefined,
  resolvers: undefined,
  cache: new InMemoryCache({})
})
