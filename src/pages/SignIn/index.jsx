import { useNavigate } from "react-router";
import supabase from "../../supabase/client";
import { Toaster, toast } from "sonner";

export default function SignIn() {
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    const formRegister = event.currentTarget;
    const { email, password } = Object.fromEntries(new FormData(formRegister));

    let { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      formRegister.reset();
      toast.error("Errore durante l accesso");
    } else {
      formRegister.reset();
      toast.success("L accesso è avvenuto con successo");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/");
    }
  };

  return (
    <>
      <div
        className="container  d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="card shadow-lg"
          style={{
            width: "100%",
            maxWidth: "700px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="card-body">
            <h1 className="text-center mb-4">Accedi</h1>
            <form onSubmit={handleSignIn}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn w-100"
                style={{ backgroundColor: "#120a8f", color: "#fff" }}
              >
                Accedi
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </>
  );
}
