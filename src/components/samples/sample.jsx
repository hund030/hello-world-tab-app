import { app } from '@microsoft/teams-js';
import { useEffect, useState } from 'react';

export const Sample = () => {
  const [hostName, setHostName] = useState("");
  useEffect(() => {
    app.getContext().then((context) => {
      setHostName(context.app.host.name);
    })
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
      <p>Your app is running in {hostName}</p>
    </div>
  );
};
