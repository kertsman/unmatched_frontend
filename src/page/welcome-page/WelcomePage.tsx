import { Button } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router";

export default function WelcomePage() {
  const navigate = useNavigate();

  const navigateToSetupPage = useCallback(
    (searchParams: string) => {
      navigate(`/setup?${searchParams}`);
    },
    [navigate]
  );

  return (
    <>
      <h1>Wellcome</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button
          onClick={() => {
            const id = Math.floor(Math.random() * (10000 - 1) + 1);
            navigateToSetupPage(`mode=create&id=${id}`);
          }}
          color="secondary"
        >
          Создать комнату
        </Button>

        <Button
          onClick={() => {
            navigateToSetupPage("mode=join");
          }}
          color="secondary"
        >
          Присоединиться
        </Button>
      </div>
    </>
  );
}
