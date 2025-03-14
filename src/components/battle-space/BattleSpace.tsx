import { useDispatch } from "react-redux";
import Card from "../card/Card";
import classes from "./BattleSpace.module.css";
import { SwipeableDrawer, Button } from "@mui/material";
import { socket } from "../../main";
import { Dispatch, useState } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import { actions, CardBase, IBattleSpace } from "../../store/store";
import { useAppSelector } from "../../hooks/hooks";

function discardCards(
  dispatch: Dispatch<UnknownAction>,
  playersDiscard: CardBase[],
  playersBattleCards: CardBase[],
  battleSpace: IBattleSpace
) {
  const newPlayersDiscard = [...playersDiscard];
  newPlayersDiscard.push(...playersBattleCards);

  dispatch(actions.setPlayersDiscard(newPlayersDiscard));

  const newBattleSpace = structuredClone(battleSpace);
  newBattleSpace.player.cards.splice(0, battleSpace.player.cards.length);

  dispatch(actions.setBattleSpace(newBattleSpace));

  socket.emit(
    "discarded-all-cards-from-battle-space",
    localStorage.getItem("roomId"),
    localStorage.getItem("name")
  );
}

function changeVisibilityOfCardsToOpponent(visibility: boolean) {
  socket.emit(
    "change-visibility-of-cards-to-opponent",
    localStorage.getItem("roomId"),
    localStorage.getItem("name"),
    visibility
  );
}

export default function BattleSpace() {
  const dispatch = useDispatch();
  const battleSpace = useAppSelector((state) => state.gameBoard.battleSpace);
  console.dir(battleSpace);

  const discardedCards = useAppSelector(
    (state) => state.gameBoard.player.discard
  );
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  // const [cardIdToShowInDrawer, setCardIdToShowInDrawer] = useState(null);
  console.log(battleSpace);

  return (
    <>
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
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              overflowX: "scroll",
            }}
          >
            {battleSpace?.oponent &&
              battleSpace?.oponent[0]?.cards.map((opCard) => (
                <Card
                  image={import.meta.env.VITE_BACKEND_ENDPOINT + opCard.image}
                  show={
                    battleSpace?.oponent[0].isFaceDownForOponent
                      ? "cover"
                      : "image"
                  }
                />
              ))}
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              overflowX: "scroll",
            }}
          >
            {battleSpace?.player &&
              battleSpace?.player.cards.map((playerCard) => (
                <Card
                  image={
                    import.meta.env.VITE_BACKEND_ENDPOINT + playerCard.image
                  }
                  onClick={() => {
                    setDrawerIsOpen((prev) => !prev);
                  }}
                />
              ))}
          </div>
        </div>
      </div>

      <SwipeableDrawer
        anchor={"bottom"}
        open={drawerIsOpen}
        onClose={() => {
          // setCardIdToShowInDrawer(null);
          setDrawerIsOpen(false);
        }}
        onOpen={() => {}}
      >
        {/* <>
          {battleSpace.player.cards
            .filter((card) => card.id === cardIdToShowInDrawer)
            .map((card) => {
              return (
                <Card
                  image={"http://localhost:3000/" + card.image}
                  width="250px"
                  height="400px"
                />
              );
            })}
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Button
              onClick={() => {
                discardCards(
                  dispatch,
                  cardIdToShowInDrawer,
                  discardCards,
                  battleSpace.player.cards
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
        </> */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Button
            onClick={() => {
              discardCards(
                dispatch,
                discardedCards,
                battleSpace.player.cards,
                battleSpace
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
              changeVisibilityOfCardsToOpponent(
                !battleSpace.player.isFaceDownForOponent
              );
              setDrawerIsOpen(false);
            }}
            variant="outlined"
            color="success"
          >
            {battleSpace.player.isFaceDownForOponent
              ? "Показать карты опоненту"
              : "Скрыть карты от опонента"}
          </Button>
        </div>
      </SwipeableDrawer>
    </>
  );
}
