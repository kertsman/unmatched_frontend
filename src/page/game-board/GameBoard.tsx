import { useEffect, useState } from "react";
import BattleSpace from "../../components/battle-space/BattleSpace";
import OponentSpace from "../../components/oponent-space/OponentSpace";
import PlayerSpace from "../../components/player-space/PlayerSpace";
import classes from "./game-board.module.css";
import axios from "axios";
import { socket } from "../../main";

export default function GameBoard() {
  const [playersCard, setPlayersCard] = useState([]);

  useEffect(() => {
    function emit(socket, event, arg) {
      socket.timeout(1000).emit(event, arg, (err) => {
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
