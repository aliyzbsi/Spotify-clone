import React, { useState, useEffect } from "react";
import axios from "axios";

const SpotifySearch = ({ tracks, setTracks }) => {
  const client_id = "a5d29f9ee0704e698e1aa71ebde2eff5"; // Kendi Client ID'nizi buraya ekleyin
  const client_secret = "fb4b671a50b5445eb9d014e710eff5a5"; // Kendi Client Secret'ınızı buraya ekleyin
  const [token, setToken] = useState("");

  // Token almak için gerekli fonksiyon
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
  // Component mount olduğunda token alınıyor
  useEffect(() => {
    getToken();
  }, []);

  // Şarkı aramak için fonksiyon
  const searchTracks = async (query) => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${query}&type=track&limit=50`, // İlk 50 şarkı
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTracks(response.data.tracks.items); // Çekilen şarkılar state'e kaydediliyor
    } catch (error) {
      console.error("Şarkı arama hatası:", error);
    }
  };

  // Token geldiğinde şarkı araması yapılıyor
  useEffect(() => {
    if (token) {
      searchTracks("pop");
    }
  }, [token]);

  return (
    <div className="spotify-data mt-20">
      <h1>Spotify'dan Şarkı ve Sanatçı Verisi</h1>
      {tracks.length > 0 ? (
        <div>
          {tracks.map((track) => (
            <div key={track.id}>
              <p>
                <strong>Şarkı:</strong> {track.name}
              </p>
              <p>
                <strong>Sanatçı:</strong> {track.artists[0].name}
              </p>
              <img
                src={track.album.images[0]?.url}
                alt="Albüm kapağı"
                style={{ width: "100px" }}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>Yükleniyor...</p>
      )}
    </div>
  );
};

export default SpotifySearch;
