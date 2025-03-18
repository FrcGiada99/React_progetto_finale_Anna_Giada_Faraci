import { useState, useEffect, useContext } from "react";
import supabase from "../../../supabase/client";
import SessionContext from "../../../context/SessionContext";
import { Toaster, toast } from "sonner";

export default function ProfileAccount() {
  const { session } = useContext(SessionContext);

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from("profiles")
        .select("username, first_name, last_name")
        .eq("id", user.id)
        .single();

      if (error) {
        toast.error("Errore nel recupero del profilo: " + error.message);
        console.warn(error);
      } else if (data) {
        setUsername(data.username);
        setFirstName(data.first_name);
        setLastName(data.last_name);
      }

      setLoading(false);
    };

    getProfile();
  }, [session]);

  async function updateProfile(event) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      first_name,
      last_name,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      toast.error("Errore durante l'aggiornamento: ");
    } else {
      toast.success("Profilo aggiornato con successo!");
    }

    setLoading(false);
  }

  if (!session || !session.user) {
    return <div>Nessun utente autenticato.</div>;
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow"
        style={{ width: "100%", maxWidth: "800px", padding: "20px" }}
      >
        <h3 className="text-center mb-4">Modifica Profilo</h3>
        <form onSubmit={updateProfile}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="form-control"
              value={session.user.email}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="form-control"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="first_name" className="form-label">
              First name
            </label>
            <input
              id="first_name"
              type="text"
              className="form-control"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last_name" className="form-label">
              Last name
            </label>
            <input
              id="last_name"
              type="text"
              className="form-control"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <button
              className="btn btn-primary w-100"
              style={{ backgroundColor: "#120a8f" }}
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading ..." : "Modifica"}
            </button>
          </div>

          <div className="mb-3">
            <button
              className="btn btn-secondary w-100"
              type="button"
              onClick={() => {
                supabase.auth.signOut();
              }}
            >
              Logout
            </button>
          </div>
        </form>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}
