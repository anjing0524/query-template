import React from "react";
import { HashRouter as Router, Link, Switch, Route } from "react-router-dom";
import Basic from "./Basic";
import Pagination from "./Pagination";

export default function router() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/basic">Basic</Link>
            </li>
            <li>
              <Link to="/page">Pageination</Link>
            </li>
            <li>
              <Link to="/infinte">InfinteScroll</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/infinte">
            <Basic />
          </Route>
          <Route path="/basic">
            <Basic />
          </Route>
          <Route path="/page">
            <Pagination />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
