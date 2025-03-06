import { Outlet } from "react-router";
import { socket } from "./main";
import { useDispatch } from "react-redux";
import { actions, counterSlice } from "./store/store";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: { gameBoard: counterSlice.reducer },
});
function App() {
  const dispatch = useDispatch();
  socket.on("game-state-changed", (data) => {
    console.log("game-state-changed");
    dispatch(actions.setGameState(data));
  });

  socket.on("oponent-performed-action", (data) => {
    console.log("oponent-performed-action");
    dispatch(actions.setOponentAndBattleSpace(data));
  });
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
