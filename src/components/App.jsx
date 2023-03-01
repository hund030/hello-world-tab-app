// https://fluentsite.z22.web.core.windows.net/quick-start
import { HashRouter as Router, Redirect, Route } from "react-router-dom";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./Tab";
import TabConfig from "./TabConfig";
import { TeamsFxContextProvider } from "./Context";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  return (
    <TeamsFxContextProvider>
      <Router>
        <Route exact path="/">
          <Redirect to="/tab" />
        </Route>
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/termsofuse" component={TermsOfUse} />
        <Route exact path="/tab" component={Tab} />
        <Route exact path="/config" component={TabConfig} />
      </Router>
    </TeamsFxContextProvider>
  );
}
