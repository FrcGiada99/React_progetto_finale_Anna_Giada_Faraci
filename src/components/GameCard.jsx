/* eslint-disable react/prop-types */
import GameImage from "./GameImage";
import { useNavigate } from "react-router";

export default function GameCard({ game }) {
  const navigate = useNavigate();
  const genres = game.genres.map((genre) => genre.name).join(", ");

  return (
    <div
      className="card h-100 d-flex flex-column navigationEffect"
      onClick={() => navigate(`/games/${game.id}/${game.name}`)}
      style={{ cursor: "pointer" }}
    >
      <GameImage
        image={game.background_image}
        alt={game.name}
        className="card-img-top"
        style={{ height: "150px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <p className="text-muted small mb-1">{genres}</p>
        <h5 className="card-title" style={{ minHeight: "48px" }}>
          {game.name}
        </h5>
        <button
          className="btn mt-2"
          style={{
            backgroundColor: "#120a8f",
            color: "white",
            border: "1px solid transparent",
          }}
        >
          Read more
        </button>
      </div>
    </div>
  );
}
