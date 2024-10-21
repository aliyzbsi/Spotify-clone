const token = useSpotifyToken();
const [artists, setArtists] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);
const dbUrl = "http://localhost:3000/artists"; // JSON Server URL

useEffect(() => {
  const getFeaturedPlaylists = async () => {
    try {
      setIsLoading(true);

      // Önce db.json'dan veriyi kontrol et
      const cachedResponse = await axios.get(dbUrl);
      if (cachedResponse.data.length > 0) {
        console.log(cachedResponse.data);
        setArtists(cachedResponse.data);
        setIsLoading(false);
        return; // Eğer ön bellek varsa, API'ye gitme
      }

      const response = await axios.get(
        "https://api.spotify.com/v1/browse/featured-playlists",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const playlists = response.data.playlists.items;

      // En çok takipçili çalma listesini bulma
      const mostFollowedPlaylist = playlists.reduce((max, playlist) => {
        const followersCount = playlist.followers?.total || 0;
        return followersCount > max.followers?.total || 0 ? playlist : max;
      });

      // Çalma listesindeki şarkıları alma
      const tracksResponse = await axios.get(
        `https://api.spotify.com/v1/playlists/${mostFollowedPlaylist.id}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const trackItems = tracksResponse.data.items;

      // Sanatçıları alıyoruz
      const uniqueArtists = new Set();
      const artistIds = [];
      trackItems.forEach((item) => {
        item.track.artists.forEach((artist) => {
          uniqueArtists.add(artist.name);
          artistIds.push(artist.id);
        });
      });

      // Sanatçı detaylarını almak için API isteği
      const artistDetails = [];
      for (const id of artistIds) {
        try {
          const artistResponse = await axios.get(
            `https://api.spotify.com/v1/artists/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          artistDetails.push(artistResponse);
        } catch (error) {
          console.error("Sanatçı alma hatası:", error);
        }
      }

      // Sanatçı bilgilerini düzenleme
      const artistsData = artistDetails.map((response) => {
        const artist = response.data;
        return {
          id: artist.id,
          name: artist.name,
          imageUrl: artist.images[0]?.url,
        };
      });

      setArtists(artistsData);

      // Yeni verileri db.json'a kaydet
      await axios.post(dbUrl, artistsData);
    } catch (error) {
      console.error("Çalma listesi alma hatası:", error);
      setError("Çalma listesi alınamadı. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  if (token) {
    getFeaturedPlaylists();
  }
}, [token]);

if (isLoading) return <div>Yükleniyor...</div>;
if (error) return <div>{error}</div>;
