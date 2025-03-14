import { useEffect } from "react";
import BattleSpace from "../../components/battle-space/BattleSpace";
import OponentSpace from "../../components/oponent-space/OponentSpace";
import PlayerSpace from "../../components/player-space/PlayerSpace";
import classes from "./game-board.module.css";
import { socket } from "../../main";

export default function GameBoard() {
  useEffect(() => {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    function emit(socket: any, event: any, arg: any) {
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      socket.timeout(1000).emit(event, arg, (err: any) => {
        if (err) {
          emit(socket, event, arg);
        }
      });
    }

    emit(socket, "setup-connetction", localStorage.getItem("roomId"));
  }, []);
  return (
    <div className={classes.gameBoard}>
      {/* <h1>GameBoard</h1> */}
      <OponentSpace />
      <BattleSpace />
      <PlayerSpace />
    </div>
  );
}
