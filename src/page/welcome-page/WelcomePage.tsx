import { Button } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router";

export default function WelcomePage() {
  const navigate = useNavigate();

  const navigateToSetupPage = useCallback(
    (mode: "create" | "join") => {
      navigate(`/setup?mode=${mode}`);
    },
    [navigate]
  );

  return (
    <>
      <h1>Wellcome</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button onClick={() => navigateToSetupPage("create")} color="secondary">
          Создать комнату
        </Button>

        <Button onClick={() => navigateToSetupPage("join")} color="secondary">
          Присоединиться
        </Button>
      </div>
    </>
  );
}
