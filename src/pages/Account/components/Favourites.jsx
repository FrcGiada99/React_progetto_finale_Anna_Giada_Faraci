import { useContext } from "react";
import { Link } from "react-router";
import { ListGroup, ListGroupItem, Badge } from "react-bootstrap";
import FavContext from "../../../context/FavContext";
import { formatDate } from "../../../utils/formatDate";

export default function Favourites() {
  const { fav } = useContext(FavContext);

  return (
    <div>
      {fav.length === 0 && <p>Non ci sono giochi preferiti al momento.</p>}
      {fav && (
        <ListGroup>
          {fav.map((game) => (
            <ListGroupItem
              key={game.id}
              className="d-flex justify-content-between align-items-center"
            >
              <Link
                to={`/games/${game.game_id}/${game.game_name}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                {game.game_name}
              </Link>
              <Badge bg="secondary">
                Aggiunto il: {formatDate(game.created_at)}
              </Badge>
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
