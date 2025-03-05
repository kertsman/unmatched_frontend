import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import WelcomePage from "./page/welcome-page/WelcomePage.tsx";
import SetupGamePage from "./page/setup-game/SetupGame.tsx";
import { io } from "socket.io-client";
import GameBoard from "./page/game-board/GameBoard.tsx";

const router = createBrowserRouter([
  {
    path: "",
    children: [
      { index: true, element: <WelcomePage /> },
      { path: "/setup", element: <SetupGamePage /> },
      { path: "/game", element: <GameBoard /> },
    ],
  },
]);

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("connected");
});

export default router;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
