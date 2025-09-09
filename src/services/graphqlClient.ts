import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

const BASE_API_URL = import.meta.env.VITE_BASE_API;

const httpLink = new HttpLink({
  uri: BASE_API_URL,
});

const authLink = new SetContextLink((prevContext) => ({
  headers: {
    ...prevContext.headers,
  },
}));

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
