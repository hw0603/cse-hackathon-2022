import React, { useState, createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

import AuthProvider from "./components/context/AuthProvider";
import HttpHeadersProvider from "./components/context/HttpHeadersProvider";

import Header from "./components/app/Header";
import Main from "./components/app/Main";
import Nav from "./components/app/Nav";

export const Appcontext = createContext();

export default function App() {
  const [articleList, setArticleList] = useState([]);
  const [user, setUser] = useState(null);
  const [cities, setCities] = useState({
    main_city: "",
    sub_city: "",
  });
  const [category, setCategories] = useState("");
  const value = { articleList, setArticleList, cities, setCities, category, setCategories };

  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Appcontext.Provider value={value}>
          <AuthProvider>
            <HttpHeadersProvider>
            <Nav />
            <Main />
            </HttpHeadersProvider>

          </AuthProvider>
        </Appcontext.Provider>

      </BrowserRouter>
    </div>
  );
}
