import React, { useEffect, useState } from "react";
import './App.css';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink
} from 'react-router-dom';
import MainPage from "./view/MainPage";
import axios from 'axios'
import Form from "./view/Form";



function App() {
  const [appState, setAppState] = useState(null);

  const [allBooks, setAllBooks] = useState(null);
  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = 'http://localhost:3001/api/book';
    axios.get(apiUrl).then((repos) => {
      const allData = repos.data.data;
      setAppState({ allData });
      setAllBooks({ allData });
    });
  }, [setAppState]);

  return (
    <div className="App">
    <HashRouter>
        <>
            <Route exact path="/">
              <MainPage
              allBooks={allBooks}
              appState={appState}
              />
            </Route>


            <Route path="/form">
              <Form
              allBooks={allBooks}
              />
            </Route>
        </>
    </HashRouter>
</div>
  );
}

export default App;
