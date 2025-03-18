import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GameCard from "../../components/GameCard";
import Sidebar from "../../components/Sidebar";

const Platform = () => {
  const { id } = useParams();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [platforms, setPlatforms] = useState([]);
  const [platformName, setPlatformName] = useState("");

  useEffect(() => {
    const fetchPlatforms = async () => {
      const response = await fetch(
        `https://api.rawg.io/api/platforms?key=f5fa696e3b9146d7aa1e40a30e309f02`
      );
      const data = await response.json();
      setPlatforms(data.results);
    };
    fetchPlatforms();
  }, []);

  useEffect(() => {
    const platform = platforms.find(
      (platform) => platform.id.toString() === id
    );
    if (platform) {
      setPlatformName(platform.name);
    }
  }, [id, platforms]);

  useEffect(() => {
    const fetchGamesForPlatform = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=f5fa696e3b9146d7aa1e40a30e309f02&platforms=${id}`
        );
        const data = await response.json();
        setGames(data.results);
      } catch (error) {
        console.error("Errore nel recupero dei giochi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGamesForPlatform();
  }, [id]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <h3> {platformName || "Loading..."}</h3>{" "}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="row">
              {games.map((game) => (
                <div key={game.id} className="col-md-4 mb-4">
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Platform;
