import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import AddJobForm from "./pages/AddJob";
import CompletedDrives from "./pages/CompletedDrives";
// import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/completed_drives" element={<CompletedDrives />} />
<<<<<<< HEAD
              {/* <Route path="/profile" element={<Profile />}> */}
=======
              <Route path="/profile">
                <Route path=":username" element={<Profile />} />
                <Route path="" element={<Profile />} />
              </Route>
>>>>>>> 677ce5e8 (continuing rebase)
              <Route path="/add" element={<AddJobForm />} />
              <Route path="*" element={<NoMatch />} /> */
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
