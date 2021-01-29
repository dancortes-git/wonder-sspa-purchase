import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Signin from "./components/Signin";
import Signup from "./components/Signup";

const generateClassName = createGenerateClassName({
  productionPrefix: "pur",
});

export default (props) => {
  const {
    getUser,
    onSignIn,
    addSignInEventListener,
    removeSignInEventListener,
    addSignOutEventListener,
    removeSignOutEventListener,
  } = props;
  const user = (getUser && getUser()) || null;
  const [isSignedIn, setIsSignedIn] = useState(!!user);

  const onEventSignInOrSignOutCallback = ({ detail: userLogged }) => {
    setIsSignedIn(!!userLogged);
  };

  // Add Sign In event listener
  useEffect(() => {
    addSignInEventListener &&
      addSignInEventListener(onEventSignInOrSignOutCallback);
    return () => {
      removeSignInEventListener &&
        removeSignInEventListener(onEventSignInOrSignOutCallback);
    };
  }, [addSignInEventListener, removeSignInEventListener]);

  // Add Sign Out event listener
  useEffect(() => {
    addSignOutEventListener &&
      addSignOutEventListener(onEventSignInOrSignOutCallback);
    return () => {
      removeSignOutEventListener &&
        removeSignOutEventListener(onEventSignInOrSignOutCallback);
    };
  }, [addSignOutEventListener, removeSignOutEventListener]);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router>
        <Switch>
          <Route path="/auth/signin">
            {isSignedIn && <Redirect to="/" />}
            <Signin onSignIn={onSignIn} />
          </Route>
          <Route path="/auth/signup">
            {isSignedIn && <Redirect to="/" />}
            <Signup onSignIn={onSignIn} />
          </Route>
        </Switch>
      </Router>
    </StylesProvider>
  );
};
