import { ApolloProvider } from "@apollo/client/react";
import client from "./services/graphqlClient";
import Home from "./pages/Home/Home";
import "./styles/globals.css";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
};

export default App;
