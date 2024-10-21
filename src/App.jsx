import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import { useLocaleStorage } from "./hooks/useLocaleStorage";
import SpotifyAPI from "./components/SpotifyApi";
import { useState } from "react";

function App() {
  const [tracks, setTracks] = useState([]);
  const [loggedUser, setLoggedUser] = useLocaleStorage("user", "");
  return (
    <div>
      {/* Header sabit (fixed) olacak */}
      <div className="header">
        <Header
          setTracks={setTracks}
          loggedUser={loggedUser}
          setLoggedUser={setLoggedUser}
        />
      </div>
      <div className="pt-20 bg-black">
        <Routes>
          <Route path="/" element={<Home loggedUser={loggedUser} />} />
          <Route
            path="/login"
            element={
              <Login setLoggedUser={setLoggedUser} loggedUser={loggedUser} />
            }
          />

          <Route
            path="/spotify"
            element={<SpotifyAPI tracks={tracks} setTracks={setTracks} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
