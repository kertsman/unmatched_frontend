import { SwipeableDrawer } from "@mui/material";
import Card from "../card/Card";
import classes from "./PlayerSpace.module.css";
import { useState } from "react";

export default function PlayerSpace() {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  return (
    <div
      onClick={() => {
        setDrawerIsOpen((prev) => !prev);
      }}
      className={classes.PlayerSpace}
    >
      {/* <h1>Player Space</h1> */}
      <div style={{ display: "flex", width: "100%" }}>
        <div
          style={{
            backgroundColor: "#DD4124",
            display: "flex",
            flexDirection: "column",
            width: "10%",
            justifyContent: "center",
          }}
        >
          <p className={classes.discardText}>discard</p>
        </div>
        <div
          style={{
            marginTop: "8px",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center",
            width: "80%",
            overflowY: "scroll",
            height: "38vh",
          }}
        >
          <Card />
          <Card />
          <Card />

          <Card />
          <Card />
          <Card />

          <Card />
          <Card />
          <Card />
        </div>
        <div
          style={{
            backgroundColor: "#007FFF",
            display: "flex",
            flexDirection: "column",
            width: "10%",
            justifyContent: "center",
          }}
        >
          <p className={classes.deckText}>deck</p>
        </div>
      </div>

      <SwipeableDrawer
        anchor={"bottom"}
        open={drawerIsOpen}
        onClose={() => {}}
        onOpen={() => {}}
      >
        KU__+
      </SwipeableDrawer>
    </div>
  );
}
