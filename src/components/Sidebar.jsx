import { useEffect, useState } from "react";
import { Link } from "react-router";

const Url = `https://api.rawg.io/api/genres?key=f5fa696e3b9146d7aa1e40a30e309f02`;

const platformsUrl = `https://api.rawg.io/api/platforms?key=f5fa696e3b9146d7aa1e40a30e309f02`;

export default function Sidebar() {
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(Url);
      const json = await response.json();
      setGenres(json.results);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchPlatforms = async () => {
      const response = await fetch(platformsUrl);
      const json = await response.json();
      setPlatforms(json.results);
    };
    fetchPlatforms();
  }, []);

  return (
    <div
      className="bg-light rounded-3 p-0 m-0 sidebar"
      style={{
        width: "250px",
        height: "100vh",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "auto",
      }}
    >
      <h5 className="mb-3 mt-4 text-center">Generi</h5>
      <ul className="nav flex-column">
        {genres.map((genre) => (
          <li key={genre.id} className="nav-item text-center">
            <Link
              to={`/games/${genre.slug}`}
              className="nav-link text-dark rounded-3 py-2 mb-2 hover-bg"
              style={{ textAlign: "center" }}
            >
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>

      <h5 className="mb-3 mt-4 text-center">Piattaforme</h5>
      <ul className="nav flex-column">
        {platforms.map((platform) => (
          <li key={platform.id} className="nav-item text-center">
            <Link
              to={`/platform/${platform.id}`}
              className="nav-link text-dark rounded-3 py-2 mb-2 hover-bg"
              style={{ textAlign: "center" }}
            >
              {platform.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
