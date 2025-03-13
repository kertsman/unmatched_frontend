import { createSlice } from "@reduxjs/toolkit";
function getInitialsState(): GameBoardState {
  return {
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
  };
}
export const counterSlice = createSlice({
  name: "gameBoard",
  initialState: getInitialsState(),
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

      if (!player) {
        return;
      }

      state.player.deck = player.deck;
      state.player.discard = player.discard;
      state.player.hand = player.hand;

      const battleSpaceUser = room.battleSpace.find(
        (user) => user.name === localStorage.getItem("name")
      );
      const battleSpaceOpponent = room.battleSpace.find(
        (user) => user.name !== localStorage.getItem("name")
      );
      if (battleSpaceUser) {
        state.battleSpace.player = battleSpaceUser?.cards;
      }

      if (battleSpaceOpponent) {
        state.battleSpace.oponent = battleSpaceOpponent?.cards;
      }

      const oponent = room.players.find(
        (player) => player.name !== localStorage.getItem("name")
      );
      if (oponent) {
        state.oponent.deck = oponent?.deck;
        state.oponent.discard = oponent?.discard;
        state.oponent.hand = oponent?.hand;
      }
    },
    setOponentAndBattleSpace: (state, payload) => {
      const room: Room = payload.payload;
      const battleSpaceOpponent = room.battleSpace.find(
        (user) => user.name !== localStorage.getItem("name")
      );
      const battleSpaceUser = room.battleSpace.find(
        (user) => user.name === localStorage.getItem("name")
      );

      if (battleSpaceOpponent) {
        state.battleSpace.oponent = battleSpaceOpponent?.cards as any;
      }
      if (battleSpaceUser) {
        state.battleSpace.player = battleSpaceUser?.cards as any;
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
    setBattleSpace: (state, payload) => {
      const battleSpace: IBattleSpace = payload.payload;
      debugger;
      state.battleSpace.oponent = battleSpace?.oponent as any;
      state.battleSpace.player = battleSpace?.player as any;
    },
  },
});

export const actions = counterSlice.actions;

interface Room {
  roomId: string;
  players: Player[];
  battleSpace: {
    name: string;
    cards: CardBase[];
    isFaceDownForOponent: boolean;
  }[];
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

interface GameBoardState {
  player: {
    hand: CardBase[];
    discard: CardBase[];
    deck: CardBase[];
  };
  battleSpace: IBattleSpace;
  oponent: {
    hand: CardBase[];
    discard: CardBase[];
    deck: CardBase[];
  };
}

export interface IBattleSpace {
  player: BattleParticipant[];
  oponent: BattleParticipant[];
}

interface BattleParticipant {
  name: string;
  cards: CardBase[];
  isFaceDownForOponent: boolean;
}
