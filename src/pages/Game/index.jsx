import { useParams } from "react-router";
import useFetchSolution from "../../hooks/useFetchSolution";
import styles from "./Game.module.css";
import { useContext } from "react";
import SessionContext from "../../context/SessionContext";
import supabase from "../../supabase/client";
import { Toaster, toast } from "sonner";
import FavContext from "../../context/FavContext";
import Chat from "./components/Chat";

export default function Game() {
  const { session } = useContext(SessionContext);
  const { fav, setFav } = useContext(FavContext);

  const { id } = useParams();
  const initialUrl = `https://api.rawg.io/api/games/${id}?key=f5fa696e3b9146d7aa1e40a30e309f02&dates`;

  const { data: game, error } = useFetchSolution(initialUrl);

  const isFavorite = () => {
    if (game) {
      return fav.find((el) => +el.game_id === game.id);
    }
  };

  const addToFav = async (game) => {
    const { error } = await supabase
      .from("favourites")
      .insert([
        {
          profile_id: session.user.id,
          game_id: game.id,
          game_name: game.name,
          game_image: game.background_image,
        },
      ])
      .select();
    if (error) {
      toast.error("Errore di inserimento nei preferiti");
      readFav();
    } else {
      toast.success("Gioco inserito nei preferiti");
      readFav();
    }
  };

  const readFav = async () => {
    let { data: favourites, error } = await supabase
      .from("favourites")
      .select("*")
      .eq("profile_id", session.user.id);
    if (error) {
      toast.error("Gioco non trovato ");
    } else {
      setFav(favourites);
    }
  };

  const removeFav = async (game) => {
    const { error } = await supabase
      .from("favourites")
      .delete()
      .eq("game_id", game.id)
      .eq("profile_id", session.user.id);
    if (error) {
      toast.error("Non hai rimosso correttamente ");
      readFav();
    } else {
      toast.success("Gioco rimosso dai preferiti ");
      readFav();
    }
  };

  return (
    <div className="container">
      {error && <h1>{error}</h1>}
      <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
        <div
          className="col-12 col-md-8"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 15px",
          }}
        >
          <div className={styles.sectionGameImage} style={{ width: "100%" }}>
            <h2>{game && game.name}</h2>
            <img
              className="img-fluid mb-3 mt-2"
              alt={game && game.name}
              src={game && game.background_image}
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "5px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            />
            <div style={{ marginLeft: "20px", textAlign: "left" }}>
              <p>
                <strong>Data:</strong> {game && game.released}
              </p>
              <p>
                <strong>About:</strong>
              </p>
              <p>{game && game.description_raw}</p>
              {session && (
                <div>
                  {!isFavorite() ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => addToFav(game)}
                    >
                      Aggiungi ai preferiti
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary"
                      onClick={() => removeFav(game)}
                    >
                      Rimuovi dai preferiti
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className="col-12 col-md-4 text-center"
          style={{ marginTop: "10px" }}
        >
          {session && <Chat game={game} session={session} />}
        </div>
      </div>

      <Toaster position="bottom-center" />
    </div>
  );
}
