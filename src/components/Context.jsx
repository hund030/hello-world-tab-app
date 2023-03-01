import { createContext, useContext } from "react";
import { TeamsUserCredential } from "@microsoft/teamsfx";

const authConfig = {
  clientId: process.env.REACT_APP_CLIENT_ID,
  initiateLoginEndpoint: process.env.REACT_APP_START_LOGIN_PAGE_URL,
};

const TeamsFxContext = createContext({
  teamsUserCredential: undefined,
});

export const TeamsFxContextProvider = ({ children }) => {
  const credential = new TeamsUserCredential(authConfig);
  return (
    <TeamsFxContext.Provider value={credential}>
      {children}
    </TeamsFxContext.Provider>
  );
};

export const useTeamsFxContext = () => {
  const credential = useContext(TeamsFxContext);
  if (!credential) {
    throw new Error("useTeamsFxContext was used outside of its Provider");
  }
  return credential;
}
