import React, { useEffect, useState } from "react";
import axios from "axios";

const PopularArtist = () => {
  const [artists, setArtists] = useState([]);

  // API'den sanatçıları çekmek için fonksiyon
  const getApi = async () => {
    try {
      const response = await axios.get("http://localhost:3000/artists");

      setArtists(response.data);
    } catch (error) {
      console.error("Sanatçı verilerini alma hatası:", error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <div className="p-2 flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Popüler sanatçılar</h1>
      <ul className="flex ">
        {artists.length > 0 ? (
          artists.slice(0, 6).map((artist, index) => (
            <li
              key={`${artist.id}-${index}`}
              className="p-1  hover:bg-neutral-600"
            >
              <img
                src={artist.imageUrl}
                alt={artist.name}
                className="rounded-full border border-black w-full  "
              />
              <p className="font-barlow mt-2">{artist.name}</p>
              <p className="font-barlow">Sanatçı</p>
            </li>
          ))
        ) : (
          <li>Sanatçılar yükleniyor veya bulunamadı.</li>
        )}
      </ul>
    </div>
  );
};

export default PopularArtist;
