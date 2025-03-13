import { Outlet } from "react-router";
import { socket } from "./main";
import { useDispatch } from "react-redux";
import { actions, counterSlice } from "./store/store";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: { gameBoard: counterSlice.reducer },
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

function App() {
  const dispatch = useDispatch();
  socket.on("game-state-changed", (data) => {
    console.log("game-state-changed");
    dispatch(actions.setGameState(data));
  });

  socket.on("opponent-or-battlespace-changed", (data) => {
    console.log("opponent-or-battlespace-changed");
    dispatch(actions.setOponentAndBattleSpace(data));
  });
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
