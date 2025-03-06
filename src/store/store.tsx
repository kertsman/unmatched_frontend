import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "gameBoard",
  initialState: {
    player: {
      hand: [],
      discard: [],
      deck: [],
    },
    battleSpace: {
      player: [],
      oponent: [],
    },
    oponent: {
      hand: [],
      discard: [],
      deck: [],
    },
  },
  reducers: {
    setPlayersHand: (state, payload) => {
      state.player.hand = payload.payload;
    },
    setPlayersDiscard: (state, payload) => {
      state.player.discard = payload.payload;
    },
    setPlayersDeck: (state, payload) => {
      state.player.deck = payload.payload;
    },
    setGameState: (state, payload) => {
      const room: Room = payload.payload;
      const player = room.players.find(
        (player) => player.name === localStorage.getItem("name")
      );

      state.player.deck = player?.deck as any;
      state.player.discard = player?.discard as any;
      state.player.hand = player?.hand as any;

      const battleSpaceUser = room.battleSpace.find(
        (user) => user.name === localStorage.getItem("name")
      );
      const battleSpaceOpponent = room.battleSpace.find(
        (user) => user.name !== localStorage.getItem("name")
      );

      if (battleSpaceUser) {
        state.battleSpace.player = battleSpaceUser?.cards as any;
      }

      if (battleSpaceOpponent) {
        state.battleSpace.oponent = battleSpaceOpponent?.cards as any;
      }

      const oponent = room.players.find(
        (player) => player.name !== localStorage.getItem("name")
      );
      if (oponent) {
        state.oponent.deck = oponent?.deck as any;
        state.oponent.discard = oponent?.discard as any;
        state.oponent.hand = oponent?.hand as any;
      }
    },
    setOponentAndBattleSpace: (state, payload) => {
      const room: Room = payload.payload;

      const battleSpaceOpponent = room.battleSpace.find(
        (user) => user.name !== localStorage.getItem("name")
      );

      if (battleSpaceOpponent) {
        state.battleSpace.oponent = battleSpaceOpponent?.cards as any;
      }

      const oponent = room.players.find(
        (player) => player.name !== localStorage.getItem("name")
      );
      if (oponent) {
        state.oponent.deck = oponent?.deck as any;
        state.oponent.discard = oponent?.discard as any;
        state.oponent.hand = oponent?.hand as any;
      }
    },
  },
});

export const actions = counterSlice.actions;

interface Room {
  roomId: string;
  players: Player[];
  battleSpace: { name: string; cards: CardBase[] }[];
}

interface Player {
  name: string;
  hand: CardBase[];
  discard: CardBase[];
  deck: CardBase[];
}

export interface CardBase {
  id: string;
  name: string;
  image: string;
}
