import { useTeamsFxContext } from "../Context";
import { useData } from "@microsoft/teamsfx-react";
import { UserProfile } from "./graph";

export const Sample = () => {
  const teamsUserCredential = useTeamsFxContext();
  const { loading, data, error } = useData(async () => {
    const userInfo = await teamsUserCredential.getUserInfo();
    return userInfo;
  });

  return (
    <div>
      <h2>Hello World</h2>
      {loading && "loading"}
      {!loading && !!data && !error && "Congratulation " + data.displayName + "! Your app is running well."}
      {!loading && !!error && error.toString()}
      {UserProfile()}
    </div>
  );
};
