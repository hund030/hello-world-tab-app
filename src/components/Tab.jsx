import { Sample } from "./samples/sample";
import { app } from '@microsoft/teams-js';
import { useEffect } from "react";

export default function Tab() {
  useEffect(() => {
    app.notifySuccess();
  }, []);

  return (
    <div>
      <Sample></Sample>
    </div>
  );
}
