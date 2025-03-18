import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Sidebar from "../../components/Sidebar";
import GameCard from "../../components/GameCard";

export default function Genre() {
    const [games, setGames] = useState([]);
    const { genre } = useParams();

    useEffect(() => {
        const fetchGenre = async () => {
            const response = await fetch(`https://api.rawg.io/api/games?key=f5fa696e3b9146d7aa1e40a30e309f02&genres=${genre}&page=1`);
            const json = await response.json();
            setGames(json.results);
        };
        fetchGenre();
    }, [genre]); 

    return (
        <div className="d-flex">
            <div className="bg-light border-end p-3" style={{ width: "250px", height: "100vh", overflowY: "auto" }}>
                <Sidebar />
            </div>
    
            <div className="container-fluid ms-3 flex-grow-1">
                <h1>{genre} Games</h1>
                <div className="row">
                    {games.map((game) => (
                        <div key={game.id} className="col-md-3 mb-4">
                            <GameCard game={game} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}    
