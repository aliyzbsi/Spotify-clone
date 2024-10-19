import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import { useLocaleStorage } from "./hooks/useLocaleStorage";

function App() {
  const [loggedUser, setLoggedUser] = useLocaleStorage("user", "");
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home loggedUser={loggedUser} />} />
        <Route
          path="/login"
          element={
            <Login setLoggedUser={setLoggedUser} loggedUser={loggedUser} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
