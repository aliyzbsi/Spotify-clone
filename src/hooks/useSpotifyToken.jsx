import axios from "axios";
import { useEffect, useState } from "react";

const client_id = "a5d29f9ee0704e698e1aa71ebde2eff5"; // Kendi Client ID'nizi buraya ekleyin
const client_secret = "fb4b671a50b5445eb9d014e710eff5a5";

const useSpotifyToken = () => {
  const [token, setToken] = useState("");

  const getToken = async () => {
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "client_credentials",
        }),
        {
          headers: {
            Authorization: "Basic " + btoa(client_id + ":" + client_secret),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setToken(response.data.access_token); // Token state'e kaydediliyor
    } catch (error) {
      console.error("Token alma hatası:", error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);
  return token;
};

export default useSpotifyToken;
