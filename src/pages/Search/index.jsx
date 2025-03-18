import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useFetchSolution from "../../hooks/useFetchSolution";
import GameCard from "../../components/GameCard";
import styles from "../Home/Home.module.css";

export default function Search() {
  let [searchParams] = useSearchParams();
  const game = searchParams.get("query");

  const initialUrl = `https://api.rawg.io/api/games?key=f5fa696e3b9146d7aa1e40a30e309f02&search=${game}`;

  const { data, error, updateUrl } = useFetchSolution(initialUrl);

  useEffect(() => {
    updateUrl(initialUrl);
  }, []);

  return (
    <div className="container">
      <h1>{searchParams.get("query")} game</h1>
      {error && <h1>{error}</h1>}
      <div className={styles.games_wrapper}>
        {data &&
          data.results.map((game) => <GameCard key={game.id} game={game} />)}
      </div>
    </div>
  );
}
