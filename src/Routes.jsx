import React from "react";
import { Router } from "@reach/router";
import Main from "pages/Main";

const Routes = () => (
  <Router>
    <Main path="/" default />
  </Router>
);

export default Routes;
