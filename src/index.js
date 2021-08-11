import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

import { QueryClientProvider, QueryClient } from "react-query";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Basic from "./features/table/Basic";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/redux">
            <App />
          </Route>
          <Route path="/query">
            <QueryClientProvider client={queryClient}>
              <Basic />
            </QueryClientProvider>
          </Route>
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
