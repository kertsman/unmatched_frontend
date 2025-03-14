import { Button, SwipeableDrawer } from "@mui/material";
import Card from "../card/Card";
import classes from "./PlayerSpace.module.css";
import { Dispatch, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../../main";
import { actions, CardBase } from "../../store/store";
import { UnknownAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../../hooks/hooks";

function discardCard(
  dispatch: Dispatch<UnknownAction>,
  discardedCardId: string,
  playersDiscard: CardBase[],
  playersHand: CardBase[]
) {
  const discardedCard = playersHand.find((card) => card.id === discardedCardId);
  if (!discardedCard) {
    alert(" NO discardedCard!");
    return;
  }
  const newPlayersDiscard = [...playersDiscard];
  newPlayersDiscard.push(discardedCard);

  dispatch(actions.setPlayersDiscard(newPlayersDiscard));
  dispatch(
    actions.setPlayersHand(
      playersHand.filter((card) => card.id !== discardedCardId)
    )
  );
  // setPlayersDiscard(playersDiscard.push(discardedCard));
  // setPlayersHand(playersHand.filter((card) => card.id !== card.id));
  socket.emit(
    "player-discarded-card",
    localStorage.getItem("roomId") || "",
    localStorage.getItem("name"),
    discardedCard
  );
}

function playCard(
  playedCardId: string,
  playersHand: CardBase[],
  dispatch: Dispatch<UnknownAction>
) {
  const playedCard = playersHand.find((card) => card.id === playedCardId);
  const newPlayersHand = playersHand.filter((card) => card.id !== playedCardId);

  dispatch(actions.setPlayersHand(newPlayersHand));

  socket.emit(
    "player-played-card",
    localStorage.getItem("roomId") || "",
    localStorage.getItem("name"),
    playedCard
  );
}

export default function PlayerSpace() {
  const player = useAppSelector((state) => state.gameBoard.player);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [cardIdToShowInDrawer, setCardIdToShowInDrawer] = useState<string>("");
  const [whatToShowInDrower, setWhatToShowInDrower] = useState<
    "cardInHand" | "deckControlls" | null
  >(null);

  const [discardCards] = useState([]);
  const [deckCards, setDeckCards] = useState<CardBase[]>([]);
  const [handCards, setHandCards] = useState<CardBase[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setDeckCards(player.deck);
    setHandCards(player.hand);
  }, [player]);

  return (
    <div className={classes.PlayerSpace}>
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
          {handCards.map((card) => {
            return (
              <Card
                onClick={() => {
                  setDrawerIsOpen(true);
                  setWhatToShowInDrower("cardInHand");
                  setCardIdToShowInDrawer(card.id);
                }}
                image={import.meta.env.VITE_BACKEND_ENDPOINT + card.image}
              />
            );
          })}
        </div>
        <div
          onClick={() => {
            setDrawerIsOpen(true);
            setWhatToShowInDrower("deckControlls");
          }}
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
        onClose={() => {
          setCardIdToShowInDrawer("");
          setDrawerIsOpen(false);
        }}
        onOpen={() => {}}
      >
        {whatToShowInDrower === "cardInHand" && (
          <>
            {" "}
            {handCards
              .filter((card) => card.id === cardIdToShowInDrawer)
              .map((card) => {
                return (
                  <Card
                    image={import.meta.env.VITE_BACKEND_ENDPOINT + card.image}
                    width="250px"
                    height="400px"
                  />
                );
              })}
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Button
                onClick={() => {
                  discardCard(
                    dispatch,
                    cardIdToShowInDrawer,
                    discardCards,
                    handCards
                  );
                  setDrawerIsOpen(false);
                }}
                variant="outlined"
                color="error"
              >
                Сбросить
              </Button>
              <Button
                onClick={() => {
                  playCard(cardIdToShowInDrawer, handCards, dispatch);
                  setDrawerIsOpen(false);
                }}
                variant="outlined"
                color="success"
              >
                Сыграть
              </Button>
            </div>
          </>
        )}

        {whatToShowInDrower === "deckControlls" && (
          <>
            <div>Add card in hand?</div>
            <div style={{ display: "flex" }}>
              <Button
                onClick={() => {
                  if (!deckCards.length) {
                    alert("deck is empty");
                    return;
                  }

                  const newDeck = [...deckCards];
                  const newHandCard = newDeck.pop();
                  if (!newHandCard) {
                    alert("no newHandCard");
                    return;
                  }

                  setHandCards((prev) => [...prev, newHandCard]);
                  setDeckCards(newDeck);
                  setDrawerIsOpen(false);
                  socket.emit(
                    "player-took-card-in-hand",
                    localStorage.getItem("roomId") || "",
                    localStorage.getItem("name"),
                    newHandCard
                  );
                }}
                variant="outlined"
                color="success"
              >
                Yes
              </Button>
              <Button
                onClick={() => {
                  setDrawerIsOpen(false);
                }}
                variant="outlined"
                color="error"
              >
                No
              </Button>
            </div>
          </>
        )}
      </SwipeableDrawer>
    </div>
  );
}
