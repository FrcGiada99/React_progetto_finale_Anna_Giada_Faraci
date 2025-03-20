import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GameCard from "../../components/GameCard";
import Sidebar from "../../components/Sidebar";

const Platform = () => {
  const { id } = useParams();
  const [games, setGames] = useState([]);
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
      const response = await fetch(
        `https://api.rawg.io/api/games?key=f5fa696e3b9146d7aa1e40a30e309f02&platforms=${id}`
      );
      const data = await response.json();
      setGames(data.results);
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
          <h3>{platformName}</h3>
          <div className="row">
            {games.map((game) => (
              <div key={game.id} className="col-md-4 mb-4">
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Platform;
