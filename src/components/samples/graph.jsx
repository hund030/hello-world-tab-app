import { useTeamsFxContext } from "../Context";
import { useGraphWithCredential } from "@microsoft/teamsfx-react";

export const UserProfile = () => {
  const teamsUserCredential = useTeamsFxContext();
  const { loading, error, data, reload } = useGraphWithCredential(
    async (graph, teamsUserCredential, scope) => {
      const profile = await graph.api("/me").get();
      return profile;
    },
    { scope: ["User.Read"], credential: teamsUserCredential }
  );
  return (
    <div>
      <button disabled={loading} onClick={reload}>
        Authorize
      </button>
      {!loading && !!data && !error && (
        <pre className="fixed">{JSON.stringify(data, null, 2)}</pre>
      )}
      {!loading && !!error && (
        <div className="error fixed">{error.toString()}</div>
      )}
    </div>
  );
};
