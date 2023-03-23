// https://fluentsite.z22.web.core.windows.net/quick-start
import { HashRouter as Router, Redirect, Route } from "react-router-dom";
import { app } from '@microsoft/teams-js';
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./Tab";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  app.initialize();
  return (
    <Router>
      <Route exact path="/">
        <Redirect to="/tab" />
      </Route>
      <Route exact path="/privacy" component={Privacy} />
      <Route exact path="/termsofuse" component={TermsOfUse} />
      <Route exact path="/tab" component={Tab} />
    </Router>
  );
}
