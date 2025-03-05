import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router";

export default function SetupGamePage() {
  const navigate = useNavigate();

  return (
    <>
      <h1>SetupGame</h1>
      <TextField
        fullWidth
        id="standard-basic"
        label="Name"
        variant="outlined"
      />
      <br></br>
      <br></br>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Колода</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          label="Age"
          // onChange={handleChange}
        >
          <MenuItem value={0}>Алиса</MenuItem>
          <MenuItem value={1}>NOT WORKING: Синдбад</MenuItem>
          <MenuItem value={2}>NOT WORKING: Медуза</MenuItem>
          <MenuItem value={3}>NOT WORKING: Вуконг</MenuItem>
        </Select>
      </FormControl>
      <br></br>
      <br></br>
      <Button
        onClick={() => {
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
