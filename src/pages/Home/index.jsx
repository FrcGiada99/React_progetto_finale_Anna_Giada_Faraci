import { useState, useEffect } from "react";
import GameCard from "../../components/GameCard";
import Sidebar from "../../components/Sidebar";
import { useInView } from "react-intersection-observer";
import useFetchSolution from "../../hooks/useFetchSolution";

const api_key = `f5fa696e3b9146d7aa1e40a30e309f02`;

export default function Home() {
  const initialUrl = `https://api.rawg.io/api/games?key=${api_key}&dates=2024-01-01,2024-12-31&page=1`;

  const [games, setGames] = useState([]);
  const { data, isLoading, updateUrl } = useFetchSolution(initialUrl);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (data?.results && Array.isArray(data.results)) {
      setGames((prevGames) => [...prevGames, ...data.results]);
    }
  }, [data]);

  useEffect(() => {
    if (inView && !isLoading) {
      const nextPage = Math.floor(games.length / 20) + 1;
      updateUrl(
        `https://api.rawg.io/api/games?key=${api_key}&dates=2024-01-01,2024-12-31&page=${nextPage}`
      );
    }
  }, [inView, games, isLoading, updateUrl]);

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row m-0">
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>
        <div className="col-md-9 p-0">
          <h1>New and trending</h1>
          <p>Based on player counts and release date</p>
          <div className="row">
            {games.map((game) => (
              <div key={game.id} className="col-md-4 mb-4">
                <GameCard game={game} />
              </div>
            ))}
          </div>
          <article aria-busy="true">
            <div ref={ref}></div>
          </article>
        </div>
      </div>
    </div>
  );
}
