import { useState } from "react";
import ContentList from "./components/ContentList";
import PopularArtist from "./components/PopularArtist";

function Main() {
  const [first, setFirst] = useState(0, 6);
  const [second, setSecond] = useState(7 - 13);
  return (
    <div className="h-screen overflow-y-auto">
      <PopularArtist />

      <ContentList first={first} />

      <ContentList second={second} />
      <PopularArtist />
      <PopularArtist />

      <div className="mt-60">Aliden selamlarla</div>
    </div>
  );
}

export default Main;
