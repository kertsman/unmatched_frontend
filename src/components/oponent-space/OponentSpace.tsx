import { useSelector } from "react-redux";
import classes from "./OponentSpace.module.css";

export default function OponentSpace() {
  const oponent = useSelector((state) => {
    console.log(state);
    return state.gameBoard.oponent;
  });
  return (
    <div className={classes.OponentSpace}>
      {!oponent && <h4>No Oponent</h4>}

      {oponent && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>Hand: {oponent.hand.length} cards</div>
          <div>discard: {oponent.discard.length} cards</div>
          <div>deck: {oponent.deck.length} cards</div>
        </div>
      )}
    </div>
  );
}
