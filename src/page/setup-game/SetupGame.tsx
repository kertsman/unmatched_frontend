import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router";
import { socket } from "../../main";
import { useState } from "react";

export default function SetupGamePage() {
  const [deckName, setDeckName] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");

  return (
    <>
      <h1>SetupGame</h1>
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        id="standard-basic"
        label="Name"
        variant="outlined"
      />
      {mode === "join" && (
        <TextField
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          fullWidth
          id="standard-basic"
          label="Room id"
          variant="outlined"
        />
      )}
      <br></br>
      <br></br>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Колода</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={deckName}
          label="deck"
          onChange={(e) => {
            setDeckName(e.target.value);
            localStorage.setItem("deckName", e.target.value);
          }}
        >
          <MenuItem value={"alice"}>Алиса</MenuItem>
          <MenuItem value={1}>NOT WORKING: Синдбад</MenuItem>
          <MenuItem value={2}>NOT WORKING: Медуза</MenuItem>
          <MenuItem value={3}>NOT WORKING: Вуконг</MenuItem>
        </Select>
      </FormControl>
      <br></br>
      <br></br>
      <Button
        onClick={() => {
          if (mode === "create") {
            const roomId = searchParams.get("id") || "";
            localStorage.setItem("roomId", roomId);
            localStorage.setItem("name", name);
            socket.emit("create-room", {
              roomId,
              name,
              deck: localStorage.getItem("deckName"),
            });

            navigate("/game");
            return;
          }

          socket.emit("join-room", {
            roomId,
            name,
            deck: localStorage.getItem("deckName"),
          });
          localStorage.setItem("name", name);
          localStorage.setItem("roomId", roomId);
          navigate("/game");
        }}
        variant="contained"
        fullWidth
      >
        Старт
      </Button>
    </>
  );
}
