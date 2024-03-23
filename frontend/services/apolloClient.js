import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`GraphQL error ${message}`);
    });
  }
});

const link = from([errorLink, new HttpLink({ uri: "GRAPHQL_SERVER_URI" })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

export default client;
