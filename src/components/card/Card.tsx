import classes from "./Card.module.css";

export default function Card({
  width,
  height,
  image = "http://localhost:3000/alice/Feint.png",
  cover = "http://localhost:3000/alice/cover.png",
  show = "image",
  onClick = () => {},
}: {
  width?: string;
  height?: string;
  image?: string;
  cover?: string;
  show?: "image" | "cover";
  onClick?: () => void;
}) {
  return (
    <img
      style={{ width: width, height: height }}
      src={show === "image" ? image : cover}
      className={classes.card}
      onClick={() => onClick()}
    />
  );
}
