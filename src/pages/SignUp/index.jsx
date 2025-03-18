import { Link, useNavigate } from "react-router";
import supabase from "../../supabase/client";
import { Toaster, toast } from "sonner";

export default function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    const formRegister = event.currentTarget;
    const { first_name, last_name, username, email, password } =
      Object.fromEntries(new FormData(formRegister));

    let { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
          username,
        },
      },
    });

    if (error) {
      formRegister.reset();
      toast.error("Ti sei registrato male");
    } else {
      formRegister.reset();
      toast.success("La registrazione è avvenuta con successo");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/");
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h1 className="text-center mb-4">Registrazione</h1>
        <div className="d-flex justify-content-center">
          <form
            className="p-4 shadow-lg rounded"
            style={{
              width: "100%",
              maxWidth: "700px",
              backgroundColor: "#fff",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
            }}
            onSubmit={handleSignUp}
          >
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input
                type="text"
                name="first_name"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cognome</label>
              <input
                type="text"
                name="last_name"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                required
              />
            </div>
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
              className="btn btn-primary w-100"
              style={{ backgroundColor: "#120a8f", color: "#fff" }}
            >
              Registrati
            </button>
          </form>
        </div>
        <Toaster position="bottom-center" />
        <p className="text-center mt-3">
          Sei già registrato? <Link to="/SignIn">Login</Link>
        </p>
      </div>
    </>
  );
}
