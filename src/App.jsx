import { Route, Navigate, Outlet, BrowserRouter, Routes } from "react-router";
import Markup from "./layout/";
import Home from "./pages/Home";
import Genre from "./pages/Genre";
import Game from "./pages/Game";
import Platform from "./pages/Platform/Platform";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Account from "./pages/Account";
import { useContext } from "react";
import SessionContext from "./context/SessionContext";
import SessionContextProvider from "./context/SessionContextProvider";
import FavContextProvider from "./context/FavContextProvider";
import Search from "./pages/Search/index";

export function ProtectedRoute() {
  const { session } = useContext(SessionContext);
  if (!session) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Markup />}>
          <Route path="/" element={<Home />} />
          <Route path="/games/:genre" element={<Genre />} />
          <Route path="/games/platform/:platform" element={<Platform />} />
          <Route path="/games/:id/:game" element={<Game />} />
          <Route path="/platform/:id" element={<Platform />} />
          <Route path="/search" element={<Search />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Root() {
  return (
    <SessionContextProvider>
      <FavContextProvider>
        <App />
      </FavContextProvider>
    </SessionContextProvider>
  );
}

export default Root;
