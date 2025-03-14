import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import WelcomePage from "./page/welcome-page/WelcomePage.tsx";
import SetupGamePage from "./page/setup-game/SetupGame.tsx";
import { io } from "socket.io-client";
import GameBoard from "./page/game-board/GameBoard.tsx";
import App, { store } from "./App.tsx";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { index: true, element: <WelcomePage /> },
      { path: "/setup", element: <SetupGamePage /> },
      { path: "/game", element: <GameBoard /> },
    ],
  },
]);

export const socket = io(import.meta.env.VITE_BACKEND_ENDPOINT);

socket.on("connect", () => {
  console.log("connected");
});

export default router;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
