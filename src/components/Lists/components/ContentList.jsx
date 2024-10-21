import React, { useEffect, useState } from "react";
import axios from "axios";
import useSpotifyToken from "../../../hooks/useSpotifyToken";

const ContentList = () => {
  const [albums, setAlbums] = useState([]);
  const token = useSpotifyToken(); // Token'ı alın
  const dbUrl = "http://localhost:3000/albums";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setIsLoading(true);
        const cachedResponse = await axios.get(dbUrl);
        if (cachedResponse.data.length > 0) {
          console.log(cachedResponse.data);
          setAlbums(cachedResponse.data);
          setIsLoading(false);
          return; // Eğer ön bellek varsa, API'ye gitme
        }

        const response = await axios.get(
          "https://api.spotify.com/v1/browse/new-releases",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Türkiye pazarına ait albümleri filtrele
        const filteredAlbums = response.data.albums.items.filter((album) =>
          album.available_markets.includes("TR")
        );

        console.log(filteredAlbums);
        setAlbums(filteredAlbums);

        // Türkiye pazarına ait albümleri veritabanına kaydet
        if (filteredAlbums.length > 0) {
          await axios.post(
            dbUrl,
            filteredAlbums.map((album) => ({
              id: album.id,
              name: album.name,
              images: album.images, // Resim bilgilerini de saklayın
              available_markets: ["TR"], // Yalnızca TR olarak kaydedin
            }))
          );
        }

        setIsLoading(false); // Yükleme tamamlandı
      } catch (error) {
        console.error("Albüm verilerini alma hatası:", error);
      }
    };

    if (token) {
      fetchAlbums();
    }
  }, [token]);

  return (
    <div className="p-2 flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Popüler albümler</h1>
      <ul className="flex ">
        {albums.length > 0 ? (
          albums.slice(0 - 6).map((album, index) => (
            <li key={index} className="w-full   rounded-xl">
              <img
                src={album.images[0]?.url}
                alt={album.name}
                className="rounded"
              />
              {album.name}
            </li>
          ))
        ) : (
          <li>Sanatçılar yükleniyor veya bulunamadı.</li>
        )}
      </ul>
    </div>
  );
};

export default ContentList;
