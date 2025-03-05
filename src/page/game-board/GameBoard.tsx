import BattleSpace from "../../components/battle-space/BattleSpace";
import OponentSpace from "../../components/oponent-space/OponentSpace";
import PlayerSpace from "../../components/player-space/PlayerSpace";
import classes from "./game-board.module.css";

export default function GameBoard() {
  return (
    <div className={classes.gameBoard}>
      {/* <h1>GameBoard</h1> */}
      <OponentSpace />
      <BattleSpace />
      <PlayerSpace />
    </div>
  );
}
