import { useSelector } from "react-redux";
import Card from "../card/Card";
import classes from "./BattleSpace.module.css";

export default function BattleSpace() {
  const battleSpace = useSelector((state) => state.gameBoard.battleSpace);
  return (
    <div className={classes.BattleSpace}>
      {/* <h1>Battle Space</h1> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "100%",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          {battleSpace?.oponent &&
            battleSpace?.oponent.map((opCard) => <Card show="cover" />)}
        </div>
        <div style={{ display: "flex" }}>
          {battleSpace?.player &&
            battleSpace?.player.map((playerCard) => <Card />)}
        </div>
      </div>
    </div>
  );
}
