import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router";
import supabase from "../supabase/client";
import SessionContext from "../context/SessionContext";
import { Toaster, toast } from "sonner";

export default function Navbar() {
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);
  const [username, setUsername] = useState(null);
  const [search, setSearch] = useState("");
  const [avatar_url, setAvatarUrl] = useState(null);

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out!");
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate("/");
  };

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      if (session) {
        const { user } = session;

        const { data, error } = await supabase
          .from("profiles")
          .select("username, avatar_url")
          .eq("id", user.id)
          .single();

        if (!ignore) {
          if (error) {
            console.warn(error);
          } else if (data) {
            setUsername(data.username);
            setAvatarUrl(data.avatar_url);
          }
        }
      }
    }

    getProfile();
    return () => {
      ignore = true;
    };
  }, [session]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${search.trim()}`);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top shadow"
      style={{ backgroundColor: "#120a8f" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">
          GameVerse
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>
          </ul>
          <form
            className="d-flex mx-auto"
            style={{ width: "50%" }}
            role="search"
            onSubmit={handleSearchSubmit}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              Cerca
            </button>
          </form>

          {session && username ? (
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-light d-flex align-items-center"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {avatar_url ? (
                    <img
                      src={`https://fesxqpwcgaosjamhwhcf.supabase.co/storage/v1/object/public/avatars/${avatar_url}`}
                      alt="Avatar"
                      className="rounded-circle me-2"
                      width="30"
                      height="30"
                    />
                  ) : null}
                  {session.user?.user_metadata?.username || username}
                </a>
                <ul
                  className="dropdown-menu"
                  style={{ backgroundColor: "#180f57" }}
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <Link
                      className="dropdown-item text-white"
                      to="/account"
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#2a1f80")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#180f57")
                      }
                    >
                      Account
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item btn text-white"
                      style={{ backgroundColor: "#180f57" }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#2a1f80")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#180f57")
                      }
                      onClick={signOut}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light me-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-light">
                Register
              </Link>
            </>
          )}
        </div>
        <Toaster position="bottom-center" />
      </div>
    </nav>
  );
}
